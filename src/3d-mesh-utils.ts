export type BoundingBox = {
	min: [number, number, number];
	max: [number, number, number];
}

/**
 * Returns the bounding box of the mesh.
 */
export function calcBoundingBox(mesh: {
	vertices: Float32Array | number[];
}): BoundingBox {
	const { vertices } = mesh;
	const numVertices = vertices.length / 3;
	const min: [number, number, number] = [Infinity, Infinity, Infinity];
	const max: [number, number, number] = [-Infinity, -Infinity, -Infinity];
	for (let i = 0; i < numVertices; i++) {
		min[0] = Math.min(min[0], vertices[3 * i]);
		min[1] = Math.min(min[1], vertices[3 * i + 1]);
		min[2] = Math.min(min[2], vertices[3 * i + 2]);
		max[0] = Math.max(max[0], vertices[3 * i]);
		max[1] = Math.max(max[1], vertices[3 * i + 1]);
		max[2] = Math.max(max[2], vertices[3 * i + 2]);
	}
	return { min, max };
}

/**
 * Returns the edges in the stl data (without duplicates).
 * Assumes mesh contains indexed faces.
 * Assumes triangle faces.
 */
export function calcEdgesFromIndexedFaces(mesh: {
	faceIndices: Uint32Array | number[];
}) {
	const { faceIndices } = mesh;
	// Handle edges on indexed faces.
	const numFaces = faceIndices.length / 3;
	// Use hash to calc edges.
	const edgesHash : { [key: string]: boolean } = {};
	const edges: number[] = [];
	for (let i = 0; i < numFaces; i++) {
		for (let j = 0; j < 3; j++) {
			const index1 = faceIndices[3 * i + j];
			const index2 = faceIndices[3 * i + (j + 1) % 3];
			const key = `${Math.min(index1, index2)},${Math.max(index1, index2)}`;
			// Only add each edge once.
			if (edgesHash[key] === undefined) {
				edgesHash[key] = true;
				edges.push(index1, index2);
			}
		}
	}
	return edges;
}

/**
 * Returns the edges in the stl data (without duplicates).
 * Assumes mesh vertices are groups in sets of three to a face (triangle mesh).
 */
export function calcEdgesFromNonIndexedFaces(mesh: {
	vertices: Float32Array | number[];
}) {
	const { vertices } = mesh;
	const numVertices = vertices.length / 3;
	// Vertices are grouped in sets of three to a face.
	const numFaces = numVertices / 3;
	const edges = new Uint32Array(6 * numFaces);
	for (let i = 0; i < numFaces; i ++) {
		const faceIndex = 3 * i;
		for (let j = 0; j < 3; j++) {
			const edgeIndex = 6 * i + 2 * j;
			edges[edgeIndex] = faceIndex + j;
			edges[edgeIndex + 1] = faceIndex + (j + 1) % 3;
		}
	}
	return edges;
}

/**
 * Scales vertex positions (in place, unless target provided) to unit bounding box and centers around origin.
 * Assumes all vertex positions are used in mesh.
 */
export function scaleVerticesToUnitBoundingBox(mesh: {
	vertices: Float32Array | number[];
	boundingBox: BoundingBox;
}, target: Float32Array | number[] = mesh.vertices) {
	const { vertices, boundingBox } = mesh;
	const { min, max } = boundingBox;
	const diff = [max[0] - min[0], max[1] - min[1], max[2] - min[2]];
	const center = [(max[0] + min[0]) / 2, (max[1] + min[1]) / 2, (max[2] + min[2]) / 2];
	const scale = Math.max(diff[0], diff[1], diff[2]);
	const numNodes = vertices.length / 3;
	for (let i = 0; i < numNodes; i++) {
		for (let j = 0; j < 3; j++) {
			// Uniform scale.
			target[3 * i + j] = (vertices[3 * i + j] - center[j]) / scale;
		}
	}
}

/**
 * Merge coincident vertices and index faces.
 */
export function mergeVertices(mesh: {
	vertices: Float32Array | number[];
}) {
	const { vertices } = mesh;
	const numFaces = vertices.length / 9;
	const verticesMerged: number[] = [];
	const facesIndexed = new Uint32Array(numFaces * 3);
	// Use hash to merge vertices.
	const vertexHash: { [key: string]: number } = {};
	for (let i = 0; i < numFaces; i++) {
		for (let j = 0; j < 3; j++) {
			const vertexIndex = 9 * i + 3 * j;
			const faceIndex = 3 * i;
			const positionX = vertices[vertexIndex];
			const positionY = vertices[vertexIndex + 1];
			const positionZ = vertices[vertexIndex + 2];
			const key = `${positionX},${positionY},${positionZ}`;
			let mergedVertexIndex = vertexHash[key];
			if (mergedVertexIndex !== undefined) {
				facesIndexed[faceIndex + j] = mergedVertexIndex;
			} else {
				// Add new vertex.
				mergedVertexIndex = verticesMerged.length / 3;
				facesIndexed[faceIndex + j] = mergedVertexIndex;
				vertexHash[key] = mergedVertexIndex;
				verticesMerged.push(positionX, positionY, positionZ);
			}
		}
	}
	return {
		verticesMerged,
		facesIndexed,
	};
}