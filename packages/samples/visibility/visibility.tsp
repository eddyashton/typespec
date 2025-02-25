import "@typespec/http";
import "@typespec/rest";

using TypeSpec.Http;
using TypeSpec.Rest;

@service({
  title: "Visibility sample",
})
namespace VisibilitySample;

model Person {
  @visibility("read") id: string;
  @visibility("create") secret: string;
  name: string;

  @visibility("read", "create")
  test: string;

  @visibility("other", "read", "update")
  other: string;

  @visibility("read", "create", "update")
  relatives: PersonRelative[];
}

model PersonRelative {
  person: Person;
  relationship: string;
}

@withVisibility("read")
model Readable<T> {
  ...T;
}

@withVisibility("create")
model Writable<T> {
  ...T;
}

model ReadablePerson {
  ...Readable<Person>;
}

model WritablePerson {
  ...Writable<Person>;
}

model OptionalPerson {
  ...OptionalProperties<Person>;
}

model WriteableOptionalPerson {
  ...OptionalProperties<WritablePerson>;
}

model ListResult<T> {
  items: T[];
}

@route("/hello")
namespace Hello {
  @get op read(
    @path id: string,

    @query({
      format: "multi",
    })
    fieldMask: string[]
  ): ReadablePerson;
  @post op create(@body person: WritablePerson): ReadablePerson;
  @put op update(@body person: WriteableOptionalPerson): ReadablePerson;

  @TypeSpec.Rest.listsResource(Person)
  op list(): ListResult<Person>;

  @TypeSpec.Rest.updatesResource(Person)
  op updateRest(@body person: Person): ReadablePerson;
}
