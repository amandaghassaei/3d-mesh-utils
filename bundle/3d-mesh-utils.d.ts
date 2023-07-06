export type BoundingBox = {
    min: [number, number, number];
    max: [number, number, number];
};
/**
 * Returns the bounding box of the mesh.
 */
export declare function calcBoundingBox(mesh: {
    vertices: Float32Array | number[];
}): BoundingBox;
/**
 * Returns the edges in the stl data (without duplicates).
 * Assumes mesh contains indexed faces.
 * Assumes triangle faces.
 */
export declare function calcEdgesFromIndexedFaces(mesh: {
    faceIndices: Uint32Array | number[];
}): number[];
/**
 * Returns the edges in the stl data (without duplicates).
 * Assumes mesh vertices are groups in sets of three to a face (triangle mesh).
 */
export declare function calcEdgesFromNonIndexedFaces(mesh: {
    vertices: Float32Array | number[];
}): Uint32Array;
/**
 * Scales vertex positions (in place, unless target provided) to unit bounding box and centers around origin.
 * Assumes all vertex positions are used in mesh.
 */
export declare function scaleVerticesToUnitBoundingBox(mesh: {
    vertices: Float32Array | number[];
    boundingBox: BoundingBox;
}, target?: Float32Array | number[]): void;
/**
 * Merge coincident vertices and index faces.
 */
export declare function mergeVertices(mesh: {
    vertices: Float32Array | number[];
}): {
    verticesMerged: number[];
    facesIndexed: Uint32Array;
};
