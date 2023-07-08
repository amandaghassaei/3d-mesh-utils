@amandaghassaei/3d-mesh-utils

# @amandaghassaei/3d-mesh-utils

## Table of contents

### Type Aliases

- [BoundingBox](README.md#boundingbox)
- [FloatArray](README.md#floatarray)

### Functions

- [calcBoundingBox](README.md#calcboundingbox)
- [calcEdgeIndicesFromNestedIndexedFaces](README.md#calcedgeindicesfromnestedindexedfaces)
- [calcEdgesFromIndexedFaces](README.md#calcedgesfromindexedfaces)
- [calcEdgeIndicesFromNonIndexedFaces](README.md#calcedgeindicesfromnonindexedfaces)
- [scaleVerticesToUnitBoundingBox](README.md#scaleverticestounitboundingbox)
- [mergeVertices](README.md#mergevertices)
- [makeEdgeHash](README.md#makeedgehash)
- [makeTriangleFaceHash](README.md#maketrianglefacehash)
- [makeFaceHash](README.md#makefacehash)

## Type Aliases

### BoundingBox

Ƭ **BoundingBox**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `min` | [`number`, `number`, `number`] |
| `max` | [`number`, `number`, `number`] |

___

### FloatArray

Ƭ **FloatArray**: `Float32Array` \| `Float64Array` \| `number`[]

## Functions

### calcBoundingBox

▸ **calcBoundingBox**(`mesh`): [`BoundingBox`](README.md#boundingbox)

Returns the bounding box of the mesh.

#### Parameters

| Name | Type |
| :------ | :------ |
| `mesh` | `Object` |
| `mesh.vertices` | [`FloatArray`](README.md#floatarray) |

#### Returns

[`BoundingBox`](README.md#boundingbox)

___

### calcEdgeIndicesFromNestedIndexedFaces

▸ **calcEdgeIndicesFromNestedIndexedFaces**(`mesh`): `number`[]

Returns the edges in the mesh data (without duplicates).
Assumes mesh contains indexed faces.
Vertices are grouped into faces of any size: [[f01, f0b, f0c], [f1a, f1b, f1c, f1d], ...]

#### Parameters

| Name | Type |
| :------ | :------ |
| `mesh` | `Object` |
| `mesh.faceIndices` | `number`[][] |

#### Returns

`number`[]

___

### calcEdgesFromIndexedFaces

▸ **calcEdgesFromIndexedFaces**(`mesh`): `number`[]

Returns the edges in the mesh data (without duplicates).
Assumes mesh contains indexed faces.
Assumes flat list of triangle faces: [f0a, f0b, f0c, f1a, f1b, f1c, ...]

#### Parameters

| Name | Type |
| :------ | :------ |
| `mesh` | `Object` |
| `mesh.faceIndices` | `number`[] \| `Uint32Array` |

#### Returns

`number`[]

___

### calcEdgeIndicesFromNonIndexedFaces

▸ **calcEdgeIndicesFromNonIndexedFaces**(`mesh`): `Uint32Array`

Returns the edges in the mesh data (without duplicates).
Assumes mesh vertices are groups in sets of three to a face (triangle mesh).

#### Parameters

| Name | Type |
| :------ | :------ |
| `mesh` | `Object` |
| `mesh.vertices` | [`FloatArray`](README.md#floatarray) |

#### Returns

`Uint32Array`

___

### scaleVerticesToUnitBoundingBox

▸ **scaleVerticesToUnitBoundingBox**(`mesh`, `target?`): `void`

Scales vertex positions (in place, unless target provided) to unit bounding box and centers around origin.
Assumes all vertex positions are used in mesh.

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `mesh` | `Object` | `undefined` |
| `mesh.vertices` | [`FloatArray`](README.md#floatarray) | `undefined` |
| `mesh.boundingBox` | [`BoundingBox`](README.md#boundingbox) | `undefined` |
| `target` | [`FloatArray`](README.md#floatarray) | `mesh.vertices` |

#### Returns

`void`

___

### mergeVertices

▸ **mergeVertices**(`mesh`): `Object`

Merge coincident vertices and index faces.

#### Parameters

| Name | Type |
| :------ | :------ |
| `mesh` | `Object` |
| `mesh.vertices` | [`FloatArray`](README.md#floatarray) |
| `mesh.uvs?` | [`FloatArray`](README.md#floatarray) |
| `mesh.vertexNormals?` | [`FloatArray`](README.md#floatarray) |
| `mesh.vertexColors?` | [`FloatArray`](README.md#floatarray) |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `verticesMerged` | `Float32Array` |
| `uvsMerged` | `undefined` \| [`FloatArray`](README.md#floatarray) |
| `vertexNormalsMerged` | `undefined` \| [`FloatArray`](README.md#floatarray) |
| `vertexColorsMerged` | `undefined` \| [`FloatArray`](README.md#floatarray) |
| `facesIndexed` | `Uint32Array` |

___

### makeEdgeHash

▸ **makeEdgeHash**(`index1`, `index2`): `string`

Make hash key for edge.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `index1` | `number` | Index of first vertex. |
| `index2` | `number` | Index of second vertex. |

#### Returns

`string`

- Hash key for edge.

___

### makeTriangleFaceHash

▸ **makeTriangleFaceHash**(`index1`, `index2`, `index3`): `string`

Make hash key for triangle face.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `index1` | `number` | Index of first vertex. |
| `index2` | `number` | Index of second vertex. |
| `index3` | `number` | Index of third vertex. |

#### Returns

`string`

- Hash key for triangle face.

___

### makeFaceHash

▸ **makeFaceHash**(`faceIndices`): `string`

Make hash key for face with any number of vertices.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `faceIndices` | `number`[] | Array of vertex indices. |

#### Returns

`string`

- Hash key for face.
