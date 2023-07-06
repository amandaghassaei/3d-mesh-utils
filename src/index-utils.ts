/**
 * Make hash key for edge.
 * @param index1 - Index of first vertex.
 * @param index2 - Index of second vertex.
 * @returns - Hash key for edge.
 */
export function makeEdgeHash(index1: number, index2: number) {
	return `${Math.min(index1, index2)},${Math.max(index1, index2)}`;
}

/**
 * Make hash key for triangle face.
 * @param index1 - Index of first vertex.
 * @param index2 - Index of second vertex.
 * @param index3 - Index of third vertex.
 * @returns - Hash key for triangle face.
 */
export function makeTriangleFaceHash(index1: number, index2: number, index3: number) {
	const min = Math.min(index1, index2, index3);
	const max = Math.max(index1, index2, index3);
	const sum = index1 + index2 + index3;
	return `${min},${sum - min - max},${max}`;
}

let tempArray: number[] = [];
/**
 * Make hash key for face with any number of vertices.
 * @param faceIndices - Array of vertex indices.
 * @returns - Hash key for face.
 */
export function makeFaceHash(faceIndices: number[]) {
	const length = faceIndices.length;
	tempArray.length = length;
	for (let i = 0; i < length; i++) {
		tempArray[i] = faceIndices[i];
	}
	tempArray.sort((a, b) => (a - b));
	return tempArray.join(',');
}