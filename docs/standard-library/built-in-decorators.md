---
title: "Built-in Decorators"
toc_min_heading_level: 2
toc_max_heading_level: 3
---
# Built-in Decorators
## TypeSpec

### `@deprecated` {#@deprecated}

Mark this type as deprecated

```typespec
@deprecated(message: string)
```

#### Target

`(intrinsic) unknown`

#### Parameters
| Name | Type | Description |
|------|------|-------------|
| message | `scalar string` | Deprecation message. |

#### Examples

```typespec
@deprecated("Use ActionV2")
op Action<T>(): T;
```


### `@discriminator` {#@discriminator}

Specify the property to be used to discriminate this type.

```typespec
@discriminator(propertyName: string)
```

#### Target

`union Model | Union`

#### Parameters
| Name | Type | Description |
|------|------|-------------|
| propertyName | `scalar string` | The property name to use for discrimination |

#### Examples

```typespec
@discriminator("kind")
union Pet{ cat: Cat, dog: Dog }

model Cat {kind: "cat", meow: boolean}
model Dog {kind: "dog", bark: boolean}
```

```typespec
@discriminator("kind")
model Pet{ kind: string }

model Cat extends Pet {kind: "cat", meow: boolean}
model Dog extends Pet  {kind: "dog", bark: boolean}
```


### `@doc` {#@doc}

Attach a documentation string.

```typespec
@doc(doc: string, formatArgs?: object)
```

#### Target

`(intrinsic) unknown`

#### Parameters
| Name | Type | Description |
|------|------|-------------|
| doc | `scalar string` | Documentation string |
| formatArgs | `model object` | Record with key value pair that can be interpolated in the doc. |

#### Examples

```typespec
@doc("Represent a Pet available in the PetStore")
model Pet {}
```


### `@encode` {#@encode}

Specify how to encode the target type.

```typespec
@encode(encoding: string | EnumMember, encodedAs?: Scalar)
```

#### Target

`union Scalar | ModelProperty`

#### Parameters
| Name | Type | Description |
|------|------|-------------|
| encoding | `union string \| EnumMember` | Known name of an encoding. |
| encodedAs | `Scalar` | What target type is this being encoded as. Default to string. |

#### Examples
##### offsetDateTime encoded with rfc7231


```tsp
@encode("rfc7231")
scalar myDateTime extends offsetDateTime;
```

##### utcDateTime encoded with unixTimestamp


```tsp
@encode("unixTimestamp", int32)
scalar myDateTime extends unixTimestamp;
```


### `@error` {#@error}

Specify that this model is an error type. Operations return error types when the operation has failed.

```typespec
@error
```

#### Target

`Model`

#### Parameters
None

#### Examples

```typespec
@error
model PetStoreError {
code: string;
message: string;
}
```


### `@format` {#@format}

Specify a known data format hint for this string type. For example `uuid`, `uri`, etc.
This differs from the `@pattern` decorator which is meant to specify a regular expression while `@format` accepts a known format name.
The format names are open ended and are left to emitter to interpret.

```typespec
@format(format: string)
```

#### Target

`union string | bytes | ModelProperty`

#### Parameters
| Name | Type | Description |
|------|------|-------------|
| format | `scalar string` | format name. |

#### Examples

```typespec
@format("uuid")
scalar uuid extends string;
```


### `@friendlyName` {#@friendlyName}

Specifies how a templated type should name their instances.

```typespec
@friendlyName(name: string, formatArgs?: unknown)
```

#### Target

`(intrinsic) unknown`

#### Parameters
| Name | Type | Description |
|------|------|-------------|
| name | `scalar string` | name the template instance should take |
| formatArgs | `(intrinsic) unknown` | Model with key value used to interpolate the name |

#### Examples

```typespec
@friendlyName("{name}List", T)
model List<T> {
value: T[];
nextLink: string;
}
```


### `@inspectType` {#@inspectType}

A debugging decorator used to inspect a type.

```typespec
@inspectType(text: string)
```

#### Target

`(intrinsic) unknown`

#### Parameters
| Name | Type | Description |
|------|------|-------------|
| text | `scalar string` | Custom text to log |


### `@inspectTypeName` {#@inspectTypeName}

A debugging decorator used to inspect a type name.

```typespec
@inspectTypeName(text: string)
```

#### Target

`(intrinsic) unknown`

#### Parameters
| Name | Type | Description |
|------|------|-------------|
| text | `scalar string` | Custom text to log |


### `@key` {#@key}

Mark a model property as the key to identify instances of that type

```typespec
@key(altName?: string)
```

#### Target

`ModelProperty`

#### Parameters
| Name | Type | Description |
|------|------|-------------|
| altName | `scalar string` | Name of the property. If not specified, the decorated property name is used. |

#### Examples

```typespec
model Pet {
@key id: string;
}
```


### `@knownValues` {#@knownValues}

Provide a set of known values to a string type.

```typespec
@knownValues(values: Enum)
```

#### Target

`union string | numeric | ModelProperty`

#### Parameters
| Name | Type | Description |
|------|------|-------------|
| values | `Enum` | Known values enum. |

#### Examples

```typespec
@knownValues(KnownErrorCode)
scalar ErrorCode extends string;

enum KnownErrorCode {
NotFound,
Invalid,
}
```


### `@maxItems` {#@maxItems}

Specify the maximum number of items this array should have.

```typespec
@maxItems(value: integer)
```

#### Target

`union unknown[] | ModelProperty`

#### Parameters
| Name | Type | Description |
|------|------|-------------|
| value | `scalar integer` | Maximum number |

#### Examples

```typespec
@maxItems(5)
model Endpoints is string[];
```


### `@maxLength` {#@maxLength}

Specify the maximum length this string type should be.

```typespec
@maxLength(value: integer)
```

#### Target

`union string | ModelProperty`

#### Parameters
| Name | Type | Description |
|------|------|-------------|
| value | `scalar integer` | Maximum length |

#### Examples

```typespec
@maxLength(20)
scalar Username extends string;
```


### `@maxValue` {#@maxValue}

Specify the maximum value this numeric type should be.

```typespec
@maxValue(value: numeric)
```

#### Target

`union numeric | ModelProperty`

#### Parameters
| Name | Type | Description |
|------|------|-------------|
| value | `scalar numeric` | Maximum value |

#### Examples

```typespec
@maxValue(200)
scalar Age is int32;
```


### `@maxValueExclusive` {#@maxValueExclusive}

Specify the maximum value this numeric type should be, exclusive of the given
value.

```typespec
@maxValueExclusive(value: numeric)
```

#### Target

`union numeric | ModelProperty`

#### Parameters
| Name | Type | Description |
|------|------|-------------|
| value | `scalar numeric` | Maximum value |

#### Examples

```typespec
@maxValueExclusive(50)
scalar distance is float64;
```


### `@minItems` {#@minItems}

Specify the minimum number of items this array should have.

```typespec
@minItems(value: integer)
```

#### Target

`union unknown[] | ModelProperty`

#### Parameters
| Name | Type | Description |
|------|------|-------------|
| value | `scalar integer` | Minimum number |

#### Examples

```typespec
@minItems(1)
model Endpoints is string[];
```


### `@minLength` {#@minLength}

Specify the minimum length this string type should be.

```typespec
@minLength(value: integer)
```

#### Target

`union string | ModelProperty`

#### Parameters
| Name | Type | Description |
|------|------|-------------|
| value | `scalar integer` | Minimum length |

#### Examples

```typespec
@minLength(2)
scalar Username extends string;
```


### `@minValue` {#@minValue}

Specify the minimum value this numeric type should be.

```typespec
@minValue(value: numeric)
```

#### Target

`union numeric | ModelProperty`

#### Parameters
| Name | Type | Description |
|------|------|-------------|
| value | `scalar numeric` | Minimum value |

#### Examples

```typespec
@minValue(18)
scalar Age is int32;
```


### `@minValueExclusive` {#@minValueExclusive}

Specify the minimum value this numeric type should be, exclusive of the given
value.

```typespec
@minValueExclusive(value: numeric)
```

#### Target

`union numeric | ModelProperty`

#### Parameters
| Name | Type | Description |
|------|------|-------------|
| value | `scalar numeric` | Minimum value |

#### Examples

```typespec
@minValueExclusive(0)
scalar distance is float64;
```


### `@overload` {#@overload}

Specify this operation is an overload of the given operation.

```typespec
@overload(overloadbase: Operation)
```

#### Target

`Operation`

#### Parameters
| Name | Type | Description |
|------|------|-------------|
| overloadbase | `Operation` | Base operation that should be a union of all overloads |

#### Examples

```typespec
op upload(data: string | bytes, @header contentType: "text/plain" | "application/octet-stream"): void;
@overload(upload)
op uploadString(data: string, @header contentType: "text/plain" ): void;
@overload(upload)
op uploadBytes(data: bytes, @header contentType: "application/octet-stream"): void;
```


### `@pattern` {#@pattern}

Specify the the pattern this string should respect using simple regular expression syntax.
The following syntax is allowed: alternations (`|`), quantifiers (`?`, `*`, `+`, and `{ }`), wildcard (`.`), and grouping parentheses.
Advanced features like look-around, capture groups, and references are not supported.

```typespec
@pattern(pattern: string)
```

#### Target

`union string | bytes | ModelProperty`

#### Parameters
| Name | Type | Description |
|------|------|-------------|
| pattern | `scalar string` | Regular expression. |

#### Examples

```typespec
@pattern("[a-z]+")
scalar LowerAlpha extends string;
```


### `@projectedName` {#@projectedName}

Provide an alternative name for this type.

```typespec
@projectedName(targetName: string, projectedName: string)
```

#### Target

`(intrinsic) unknown`

#### Parameters
| Name | Type | Description |
|------|------|-------------|
| targetName | `scalar string` | Projection target |
| projectedName | `scalar string` | Alternative name |

#### Examples

```typespec
model Certificate {
@projectedName("json", "exp")
expireAt: int32;
}
```


### `@secret` {#@secret}

Mark this string as a secret value that should be treated carefully to avoid exposure

```typespec
@secret
```

#### Target

`union string | ModelProperty`

#### Parameters
None

#### Examples

```typespec
@secret
scalar Password is string;
```


### `@service` {#@service}

Mark this namespace as describing a service and configure service properties.

```typespec
@service(options?: ServiceOptions)
```

#### Target

`Namespace`

#### Parameters
| Name | Type | Description |
|------|------|-------------|
| options | `model ServiceOptions` | Optional configuration for the service. |

#### Examples

```typespec
@service
namespace PetStore;
```

##### Setting service title

```typespec
@service({title: "Pet store"})
namespace PetStore;
```

##### Setting service version

```typespec
@service({version: "1.0"})
namespace PetStore;
```


### `@summary` {#@summary}

Typically a short, single-line description.

```typespec
@summary(summary: string)
```

#### Target

`(intrinsic) unknown`

#### Parameters
| Name | Type | Description |
|------|------|-------------|
| summary | `scalar string` | Summary string. |

#### Examples

```typespec
@summary("This is a pet")
model Pet {}
```


### `@tag` {#@tag}

Attaches a tag to an operation, interface, or namespace. Multiple `@tag` decorators can be specified to attach multiple tags to a TypeSpec element.

```typespec
@tag(tag: string)
```

#### Target

`union Namespace | Interface | Operation`

#### Parameters
| Name | Type | Description |
|------|------|-------------|
| tag | `scalar string` | Tag value |


### `@visibility` {#@visibility}

Indicates that a property is only considered to be present or applicable ("visible") with
the in the given named contexts ("visibilities"). When a property has no visibilities applied
to it, it is implicitly visible always.

As far as the TypeSpec core library is concerned, visibilities are open-ended and can be arbitrary
strings, but  the following visibilities are well-known to standard libraries and should be used
with standard emitters that interpret them as follows:

- "read": output of any operation.
- "create": input to operations that create an entity..
- "query": input to operations that read data.
- "update": input to operations that update data.
- "delete": input to operations that delete data.

See also: [Automatic visibility](https://microsoft.github.io/typespec/standard-library/http/operations#automatic-visibility)

```typespec
@visibility(...visibilities: string[])
```

#### Target

`ModelProperty`

#### Parameters
| Name | Type | Description |
|------|------|-------------|
| visibilities | `model string[]` | List of visibilities which apply to this property. |

#### Examples

```typespec
model Dog {
// the service will generate an ID, so you don't need to send it.
@visibility("read") id: int32;
// the service will store this secret name, but won't ever return it
@visibility("create", "update") secretName: string;
// the regular name is always present
name: string;
}
```


### `@withDefaultKeyVisibility` {#@withDefaultKeyVisibility}

Set the visibility of key properties in a model if not already set.

```typespec
@withDefaultKeyVisibility(visibility: unknown)
```

#### Target

`Model`

#### Parameters
| Name | Type | Description |
|------|------|-------------|
| visibility | `(intrinsic) unknown` | The desired default visibility value. If a key property already has a `visibility` decorator then the default visibility is not applied. |


### `@withoutDefaultValues` {#@withoutDefaultValues}

Returns the model with any default values removed.

```typespec
@withoutDefaultValues
```

#### Target

`Model`

#### Parameters
None


### `@withoutOmittedProperties` {#@withoutOmittedProperties}

Returns the model with the given properties omitted.

```typespec
@withoutOmittedProperties(omit: string | Union)
```

#### Target

`Model`

#### Parameters
| Name | Type | Description |
|------|------|-------------|
| omit | `union string \| Union` | List of properties to omit |


### `@withUpdateableProperties` {#@withUpdateableProperties}

Returns the model with non-updateable properties removed.

```typespec
@withUpdateableProperties
```

#### Target

`Model`

#### Parameters
None


### `@withVisibility` {#@withVisibility}

Removes properties that are not considered to be present or applicable
("visible") in the given named contexts ("visibilities"). Can be used
together with spread to effectively spread only visible properties into
a new model.

See also: [Automatic visibility](https://microsoft.github.io/typespec/standard-library/http/operations#automatic-visibility)

When using an emitter that applies visibility automatically, it is generally
not necessary to use this decorator.

```typespec
@withVisibility(...visibilities: string[])
```

#### Target

`Model`

#### Parameters
| Name | Type | Description |
|------|------|-------------|
| visibilities | `model string[]` | List of visibilities which apply to this property. |

#### Examples

```typespec
model Dog {
@visibility("read") id: int32;
@visibility("create", "update") secretName: string;
name: string;
}

// The spread operator will copy all the properties of Dog into DogRead,
// and @withVisibility will then remove those that are not visible with
// create or update visibility.
//
// In this case, the id property is removed, and the name and secretName
// properties are kept.
@withVisibility("create", "update")
model DogCreateOrUpdate {
...Dog;
}

// In this case the id and name properties are kept and the secretName property
// is removed.
@withVisibility("read")
model DogRead {
...Dog;
}
```


