---
title: "Decorators"
toc_min_heading_level: 2
toc_max_heading_level: 3
---

# Decorators

## TypeSpec.Rest

### `@action` {#@TypeSpec.Rest.action}

Specify this operation is an action. (Scoped to a resource item /pets/{petId}/my-action)

```typespec
@TypeSpec.Rest.action(name?: string)
```

#### Target

`Operation`

#### Parameters

| Name | Type            | Description                                                                   |
| ---- | --------------- | ----------------------------------------------------------------------------- |
| name | `scalar string` | Name of the action. If not specified, the name of the operation will be used. |

### `@actionSeparator` {#@TypeSpec.Rest.actionSeparator}

Defines the separator string that is inserted before the action name in auto-generated routes for actions.

```typespec
@TypeSpec.Rest.actionSeparator(seperator: / | : | /:)
```

#### Target

`union Model | ModelProperty | Operation`

#### Parameters

| Name      | Type                 | Description                                                      |
| --------- | -------------------- | ---------------------------------------------------------------- |
| seperator | `union / \| : \| /:` | Seperator seperating the action segment from the rest of the url |

### `@autoRoute` {#@TypeSpec.Rest.autoRoute}

This interface or operation should resolve its route automatically. To be used with resource types where the route segments area defined on the models.

```typespec
@TypeSpec.Rest.autoRoute
```

#### Target

`union Interface | Operation`

#### Parameters

None

#### Examples

```typespec
@autoRoute
interface Pets {
get(@segment("pets") @path id: string): void; //-> route: /pets/{id}
}
```

### `@collectionAction` {#@TypeSpec.Rest.collectionAction}

Specify this operation is a collection action. (Scopped to a resource, /pets/my-action)

```typespec
@TypeSpec.Rest.collectionAction(resourceType: Model, name?: string)
```

#### Target

`Operation`

#### Parameters

| Name         | Type            | Description                                                                   |
| ------------ | --------------- | ----------------------------------------------------------------------------- |
| resourceType | `Model`         | Resource marked with                                                          |
| name         | `scalar string` | Name of the action. If not specified, the name of the operation will be used. |

### `@createsOrReplacesResource` {#@TypeSpec.Rest.createsOrReplacesResource}

Specify that this is a CreateOrReplace operation for a given resource.

```typespec
@TypeSpec.Rest.createsOrReplacesResource(resourceType: Model)
```

#### Target

`Operation`

#### Parameters

| Name         | Type    | Description          |
| ------------ | ------- | -------------------- |
| resourceType | `Model` | Resource marked with |

### `@createsOrUpdatesResource` {#@TypeSpec.Rest.createsOrUpdatesResource}

Specify that this is a CreatesOrUpdate operation for a given resource.

```typespec
@TypeSpec.Rest.createsOrUpdatesResource(resourceType: Model)
```

#### Target

`Operation`

#### Parameters

| Name         | Type    | Description          |
| ------------ | ------- | -------------------- |
| resourceType | `Model` | Resource marked with |

### `@createsResource` {#@TypeSpec.Rest.createsResource}

Specify that this is a Create operation for a given resource.

```typespec
@TypeSpec.Rest.createsResource(resourceType: Model)
```

#### Target

`Operation`

#### Parameters

| Name         | Type    | Description          |
| ------------ | ------- | -------------------- |
| resourceType | `Model` | Resource marked with |

### `@deletesResource` {#@TypeSpec.Rest.deletesResource}

Specify that this is a Delete operation for a given resource.

```typespec
@TypeSpec.Rest.deletesResource(resourceType: Model)
```

#### Target

`Operation`

#### Parameters

| Name         | Type    | Description          |
| ------------ | ------- | -------------------- |
| resourceType | `Model` | Resource marked with |

### `@listsResource` {#@TypeSpec.Rest.listsResource}

Specify that this is a List operation for a given resource.

```typespec
@TypeSpec.Rest.listsResource(resourceType: Model)
```

#### Target

`Operation`

#### Parameters

| Name         | Type    | Description          |
| ------------ | ------- | -------------------- |
| resourceType | `Model` | Resource marked with |

### `@readsResource` {#@TypeSpec.Rest.readsResource}

Specify that this is a Read operation for a given resource.

```typespec
@TypeSpec.Rest.readsResource(resourceType: Model)
```

#### Target

`Operation`

#### Parameters

| Name         | Type    | Description          |
| ------------ | ------- | -------------------- |
| resourceType | `Model` | Resource marked with |

### `@resource` {#@TypeSpec.Rest.resource}

Mark this model as a resource type with a name.

```typespec
@TypeSpec.Rest.resource(collectionName: string)
```

#### Target

`Model`

#### Parameters

| Name           | Type            | Description            |
| -------------- | --------------- | ---------------------- |
| collectionName | `scalar string` | type's collection name |

### `@segment` {#@TypeSpec.Rest.segment}

Defines the preceding path segment for a

```typespec
@TypeSpec.Rest.segment(name: string)
```

#### Target

`union Model | ModelProperty | Operation`

#### Parameters

| Name | Type            | Description                                                                                    |
| ---- | --------------- | ---------------------------------------------------------------------------------------------- |
| name | `scalar string` | Segment that will be inserted into the operation route before the path parameter's name field. |

#### Examples

### `@segmentOf` {#@TypeSpec.Rest.segmentOf}

Returns the URL segment of a given model if it has `@segment` and `@key` decorator.

```typespec
@TypeSpec.Rest.segmentOf(type: Model)
```

#### Target

`Operation`

#### Parameters

| Name | Type    | Description  |
| ---- | ------- | ------------ |
| type | `Model` | Target model |

### `@updatesResource` {#@TypeSpec.Rest.updatesResource}

Specify that this is a Update operation for a given resource.

```typespec
@TypeSpec.Rest.updatesResource(resourceType: Model)
```

#### Target

`Operation`

#### Parameters

| Name         | Type    | Description          |
| ------------ | ------- | -------------------- |
| resourceType | `Model` | Resource marked with |
