type BoundingBox = {
    min: [number, number, number];
    max: [number, number, number];
};
type FloatArray = Float32Array | Float64Array | number[];

/**
 * Make hash key for edge.
 * @param index1 - Index of first vertex.
 * @param index2 - Index of second vertex.
 * @returns - Hash key for edge.
 */
declare function makeEdgeHash(index1: number, index2: number): string;
/**
 * Make hash key for triangle face.
 * @param index1 - Index of first vertex.
 * @param index2 - Index of second vertex.
 * @param index3 - Index of third vertex.
 * @returns - Hash key for triangle face.
 */
declare function makeTriangleFaceHash(index1: number, index2: number, index3: number): string;
/**
 * Make hash key for face with any number of vertices.
 * @param facesIndices - Array of vertex indices.
 * @returns - Hash key for face.
 */
declare function makeFaceHash(facesIndices: number[]): string;

/**
 * Returns the bounding box of the mesh.
 */
declare function calcBoundingBox(mesh: {
    vertices: FloatArray;
}): BoundingBox;
/**
 * Returns the edges in the mesh data (without duplicates).
 * Assumes mesh contains indexed faces.
 * Vertices are grouped into faces of any size: [[f01, f0b, f0c], [f1a, f1b, f1c, f1d], ...]
 */
declare function calcEdgesIndicesFromNestedIndexedFaces(mesh: {
    facesIndices: number[][];
}): number[];
/**
 * Returns the edges in the mesh data (without duplicates).
 * Assumes mesh contains indexed faces.
 * Assumes flat list of triangle faces: [f0a, f0b, f0c, f1a, f1b, f1c, ...]
 */
declare function calcEdgesIndicesFromIndexedFaces(mesh: {
    facesIndices: Uint32Array | number[];
}): number[];
/**
 * Returns the edges in the mesh data (without duplicates).
 * Assumes mesh vertices are groups in sets of three to a face (triangle mesh).
 */
declare function calcEdgesIndicesFromNonIndexedFaces(mesh: {
    vertices: FloatArray;
}): Uint32Array;
/**
 * Scales vertex positions (in place, unless target provided) to unit bounding box and centers around origin.
 * Assumes all vertex positions are used in mesh.
 */
declare function scaleVerticesToUnitBoundingBox(mesh: {
    vertices: FloatArray;
    boundingBox: BoundingBox;
}, target?: FloatArray): void;
/**
 * Merge coincident vertices and index faces.
 */
declare function mergeVertices(mesh: {
    vertices: FloatArray;
    uvs?: FloatArray;
    vertexNormals?: FloatArray;
    vertexColors?: FloatArray;
}): {
    verticesMerged: Float32Array;
    uvsMerged: FloatArray | undefined;
    vertexNormalsMerged: FloatArray | undefined;
    vertexColorsMerged: FloatArray | undefined;
    facesIndexed: Uint32Array;
};

export { BoundingBox, FloatArray, calcBoundingBox, calcEdgesIndicesFromIndexedFaces, calcEdgesIndicesFromNestedIndexedFaces, calcEdgesIndicesFromNonIndexedFaces, makeEdgeHash, makeFaceHash, makeTriangleFaceHash, mergeVertices, scaleVerticesToUnitBoundingBox };
