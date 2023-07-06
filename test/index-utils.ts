import { expect } from 'chai';
import {
	makeEdgeHash,
	makeFaceHash,
	makeTriangleFaceHash,
} from '../src/index-utils';

describe('index-utils', () => {
	it('makeEdgeHash()', () => {
		expect(makeEdgeHash(0, 1)).to.equal('0,1');
		expect(makeEdgeHash(1, 0)).to.equal('0,1');
		expect(makeEdgeHash(11, 2)).to.equal('2,11');
	});
	it('makeTriangleFaceHash()', () => {
		expect(makeTriangleFaceHash(0, 1, 2)).to.equal('0,1,2');
		expect(makeTriangleFaceHash(1, 0, 2)).to.equal('0,1,2');
		expect(makeTriangleFaceHash(2, 1, 0)).to.equal('0,1,2');
		expect(makeTriangleFaceHash(2, 0, 11)).to.equal('0,2,11');
	});
	it('makeFaceHash', () => {
		expect(makeFaceHash([0, 1, 2])).to.equal('0,1,2');
		expect(makeFaceHash([1, 0, 2])).to.equal('0,1,2');
		expect(makeFaceHash([2, 1, 0])).to.equal('0,1,2');
		expect(makeFaceHash([2, 0, 11])).to.equal('0,2,11');
		expect(makeFaceHash([2, 0, 11, 3])).to.equal('0,2,3,11');
		expect(makeFaceHash([2, 0, 11, 3, 4])).to.equal('0,2,3,4,11');
		expect(makeFaceHash([2, 0, 11, 3, 4, 5])).to.equal('0,2,3,4,5,11');
	});
});