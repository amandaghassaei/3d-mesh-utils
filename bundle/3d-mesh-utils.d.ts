type BoundingBox = {
    min: [number, number, number];
    max: [number, number, number];
};
type VertexArray = Float32Array | Float64Array | number[];

/**
 * Returns the bounding box of the mesh.
 */
declare function calcBoundingBox(mesh: {
    vertices: VertexArray;
}): BoundingBox;
/**
 * Returns the edges in the mesh data (without duplicates).
 * Assumes mesh contains indexed faces.
 * Vertices are grouped into faces of any size: [[f01, f0b, f0c], [f1a, f1b, f1c, f1d], ...]
 */
declare function calcEdgesFromNestedIndexedFaces(mesh: {
    faceIndices: number[][];
}): number[];
/**
 * Returns the edges in the mesh data (without duplicates).
 * Assumes mesh contains indexed faces.
 * Assumes flat list of triangle faces: [f0a, f0b, f0c, f1a, f1b, f1c, ...]
 */
declare function calcEdgesFromIndexedFaces(mesh: {
    faceIndices: Uint32Array | number[];
}): number[];
/**
 * Returns the edges in the mesh data (without duplicates).
 * Assumes mesh vertices are groups in sets of three to a face (triangle mesh).
 */
declare function calcEdgesFromNonIndexedFaces(mesh: {
    vertices: VertexArray;
}): Uint32Array;
/**
 * Scales vertex positions (in place, unless target provided) to unit bounding box and centers around origin.
 * Assumes all vertex positions are used in mesh.
 */
declare function scaleVerticesToUnitBoundingBox(mesh: {
    vertices: VertexArray;
    boundingBox: BoundingBox;
}, target?: VertexArray): void;
/**
 * Merge coincident vertices and index faces.
 */
declare function mergeVertices(mesh: {
    vertices: VertexArray;
}): {
    verticesMerged: number[];
    facesIndexed: Uint32Array;
};

export { BoundingBox, VertexArray, calcBoundingBox, calcEdgesFromIndexedFaces, calcEdgesFromNestedIndexedFaces, calcEdgesFromNonIndexedFaces, mergeVertices, scaleVerticesToUnitBoundingBox };
