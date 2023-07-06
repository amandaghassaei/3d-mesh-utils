@amandaghassaei/3d-mesh-utils

# @amandaghassaei/3d-mesh-utils

## Table of contents

### Type Aliases

- [BoundingBox](README.md#boundingbox)

### Functions

- [calcBoundingBox](README.md#calcboundingbox)
- [calcEdgesFromNestedIndexedFaces](README.md#calcedgesfromnestedindexedfaces)
- [calcEdgesFromIndexedFaces](README.md#calcedgesfromindexedfaces)
- [calcEdgesFromNonIndexedFaces](README.md#calcedgesfromnonindexedfaces)
- [scaleVerticesToUnitBoundingBox](README.md#scaleverticestounitboundingbox)
- [mergeVertices](README.md#mergevertices)

## Type Aliases

### BoundingBox

Ƭ **BoundingBox**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `min` | [`number`, `number`, `number`] |
| `max` | [`number`, `number`, `number`] |

## Functions

### calcBoundingBox

▸ **calcBoundingBox**(`mesh`): [`BoundingBox`](README.md#boundingbox)

Returns the bounding box of the mesh.

#### Parameters

| Name | Type |
| :------ | :------ |
| `mesh` | `Object` |
| `mesh.vertices` | `number`[] \| `Float32Array` \| `Float64Array` |

#### Returns

[`BoundingBox`](README.md#boundingbox)

___

### calcEdgesFromNestedIndexedFaces

▸ **calcEdgesFromNestedIndexedFaces**(`mesh`): `number`[]

Returns the edges in the mesh data (without duplicates).
Assumes mesh contains indexed faces.
Vertices are grouped into faces of any size: [[f01, f0b, f0c], [f1a, f1b, f1c, f1d], ...]

#### Parameters

| Name | Type |
| :------ | :------ |
| `mesh` | `Object` |
| `mesh.faces` | `number`[][] |

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
| `mesh.faces` | `number`[] \| `Uint32Array` |

#### Returns

`number`[]

___

### calcEdgesFromNonIndexedFaces

▸ **calcEdgesFromNonIndexedFaces**(`mesh`): `Uint32Array`

Returns the edges in the mesh data (without duplicates).
Assumes mesh vertices are groups in sets of three to a face (triangle mesh).

#### Parameters

| Name | Type |
| :------ | :------ |
| `mesh` | `Object` |
| `mesh.vertices` | `number`[] \| `Float32Array` \| `Float64Array` |

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
| `mesh.vertices` | `number`[] \| `Float32Array` \| `Float64Array` | `undefined` |
| `mesh.boundingBox` | [`BoundingBox`](README.md#boundingbox) | `undefined` |
| `target` | `number`[] \| `Float32Array` \| `Float64Array` | `mesh.vertices` |

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
| `mesh.vertices` | `number`[] \| `Float32Array` \| `Float64Array` |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `verticesMerged` | `number`[] |
| `facesIndexed` | `Uint32Array` |
