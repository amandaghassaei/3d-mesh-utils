import { expect } from 'chai';
import { readFileSync } from 'fs';
import { parseSTL } from '@amandaghassaei/stl-parser';
import { parseMsh } from 'msh-parser';
import {
	calcBoundingBox,
	calcEdgesFromIndexedFaces,
	calcEdgesFromNonIndexedFaces,
	mergeVertices,
	scaleVerticesToUnitBoundingBox,
	calcEdgesFromNestedIndexedFaces,
} from '../src/geometry-utils';

const cubeAscii = readFileSync('./test/stl/cubeAscii.stl');
const cubeBinary = readFileSync('./test/stl/cubeBinary.stl');
const bunnyMsh = readFileSync('./test/msh/stanford_bunny.msh');

describe('geometry-utils', () => {
	it('mergeVertices() - merges vertices and indexed faces', async () => {
		const mesh = parseSTL(cubeAscii);
		expect(mesh.vertices.length).to.equal(6 * 6 * 3);
		const { verticesMerged, facesIndexed} = mergeVertices(mesh);
		expect(verticesMerged.length).to.equal(8 * 3);
		expect(facesIndexed).to.deep.equal(new Uint32Array([
			0, 1, 2, 2, 1, 3, 4, 0, 5,
			5, 0, 2, 6, 4, 7, 7, 4, 5,
			1, 6, 3, 3, 6, 7, 3, 7, 2,
			2, 7, 5, 1, 0, 6, 6, 0, 4
		]));			
	});
	it('calcEdgesFromNonIndexedFaces(), calcEdgesFromIndexedFaces(), calcEdgesFromNestedIndexedFaces() - calculates edges', () => {
		{
			const mesh = parseSTL(cubeAscii);
			const edgesNonIndexed = calcEdgesFromNonIndexedFaces(mesh);
			expect(edgesNonIndexed).to.deep.equal(new Uint32Array([
				0,  1,  1,  2,  2,  0,  3,  4,  4,  5,  5,  3,
				6,  7,  7,  8,  8,  6,  9, 10, 10, 11, 11,  9,
				12, 13, 13, 14, 14, 12, 15, 16, 16, 17, 17, 15,
				18, 19, 19, 20, 20, 18, 21, 22, 22, 23, 23, 21,
				24, 25, 25, 26, 26, 24, 27, 28, 28, 29, 29, 27,
				30, 31, 31, 32, 32, 30, 33, 34, 34, 35, 35, 33
			]));
			expect(edgesNonIndexed.length).to.equal(mesh.vertices.length / 3 * 2);
			mesh.mergeVertices();
			const edgesIndexed = calcEdgesFromIndexedFaces(mesh);
			expect(edgesIndexed).to.deep.equal([
				0, 1, 1, 2, 2, 0, 1, 3, 3,
				2, 4, 0, 0, 5, 5, 4, 2, 5,
				6, 4, 4, 7, 7, 6, 5, 7, 1,
				6, 6, 3, 7, 3, 7, 2, 0, 6
			]);
			expect(edgesIndexed.length).to.equal(mesh.faceIndices.length);
		}
		{
			const mesh = parseSTL(cubeBinary);
			const edgesNonIndexed = calcEdgesFromNonIndexedFaces(mesh);
			expect(edgesNonIndexed).to.deep.equal(new Uint32Array([
				0,  1,  1,  2,  2,  0,  3,  4,  4,  5,  5,  3,
				6,  7,  7,  8,  8,  6,  9, 10, 10, 11, 11,  9,
				12, 13, 13, 14, 14, 12, 15, 16, 16, 17, 17, 15,
				18, 19, 19, 20, 20, 18, 21, 22, 22, 23, 23, 21,
				24, 25, 25, 26, 26, 24, 27, 28, 28, 29, 29, 27,
				30, 31, 31, 32, 32, 30, 33, 34, 34, 35, 35, 33
			]));
			expect(edgesNonIndexed.length).to.equal(mesh.vertices.length / 3 * 2);
			mesh.mergeVertices();
			const edgesIndexed = calcEdgesFromIndexedFaces(mesh);
			expect(edgesIndexed).to.deep.equal([
				0, 1, 1, 2, 2, 0, 1, 3, 3,
				2, 4, 0, 0, 5, 5, 4, 2, 5,
				6, 4, 4, 7, 7, 6, 5, 7, 1,
				6, 6, 3, 7, 3, 7, 2, 0, 6
			]);
			expect(edgesIndexed.length).to.equal(mesh.faceIndices.length);
		}
		{
			const mesh = parseMsh(bunnyMsh);
			const edges = calcEdgesFromNestedIndexedFaces({ faceIndices: mesh.exteriorFaces });
			expect(edges.slice(0, 100)).to.deep.equal([
				2, 6, 6, 3, 3, 2, 0, 3, 3, 9, 9, 0, 9, 14, 14, 0, 1, 4, 4, 2, 2, 1, 1, 13, 13, 4, 0, 1, 2, 0, 4, 5, 5, 2, 5, 6, 4, 8, 8, 5, 6, 12, 12, 3, 12, 9, 4, 19, 19, 8, 5, 11, 11, 6, 11, 12, 12, 17, 17, 9, 9, 18, 18, 14, 17, 18, 1, 15, 15, 16, 16, 1, 12, 6341, 6341, 17, 7, 22, 22, 13, 13, 7, 18, 23, 23, 14, 15, 21, 21, 45, 45, 15, 18, 98, 98, 23, 12, 53, 53, 6341
			]);
			expect(edges.length).to.equal(42072);
		}
	});
	it('calcBoundingBox() - calculates bounding box', () => {
		{
			const mesh = parseSTL(cubeAscii);
			const { min, max } = calcBoundingBox(mesh);
			expect(min).to.deep.equal([0, 0, -10]);
			expect(max).to.deep.equal([10, 10, 0]);
		}
		{
			const mesh = parseSTL(cubeBinary);
			const { min, max } = calcBoundingBox(mesh);
			expect(min).to.deep.equal([0, 0, -10]);
			expect(max).to.deep.equal([10, 10, 0]);
		}
	});
	it('scaleVerticesToUnitBoundingBox() - scales the vertex positions to unit bounding box', () => {
		{
			const mesh = parseSTL(cubeAscii);
			{
				const { min, max } = calcBoundingBox(mesh);
				expect(min).to.deep.equal([0, 0, -10]);
				expect(max).to.deep.equal([10, 10, 0]);
			}
			{
				const target = new Float32Array(mesh.vertices.length);
				scaleVerticesToUnitBoundingBox({
					vertices: mesh.vertices,
					boundingBox: calcBoundingBox(mesh),
				}, target);
				const { min, max } = calcBoundingBox({ vertices: target });
				expect(min).to.deep.equal([-0.5, -0.5, -0.5]);
				expect(max).to.deep.equal([0.5, 0.5, 0.5]);
			}
			{
				const { min, max } = calcBoundingBox(mesh);
				expect(min).to.deep.equal([0, 0, -10]);
				expect(max).to.deep.equal([10, 10, 0]);
			}
			{
				scaleVerticesToUnitBoundingBox({
					vertices: mesh.vertices,
					boundingBox: calcBoundingBox(mesh),
				});
				const { min, max } = calcBoundingBox(mesh);
				expect(min).to.deep.equal([-0.5, -0.5, -0.5]);
				expect(max).to.deep.equal([0.5, 0.5, 0.5]);
			}
		}
		{
			const mesh = parseSTL(cubeBinary);
			scaleVerticesToUnitBoundingBox({
				vertices: mesh.vertices,
				boundingBox: calcBoundingBox(mesh),
			});
			const { min, max } = calcBoundingBox(mesh);
			expect(min).to.deep.equal([-0.5, -0.5, -0.5]);
			expect(max).to.deep.equal([0.5, 0.5, 0.5]);
		}
	});
});