import { ok, strictEqual } from "assert";
import { Node, SyntaxKind, TypeSpecScriptNode, parse } from "../../core/index.js";
import { getCompletionNodeAtPosition } from "../../server/serverlib.js";
import { extractCursor } from "../../testing/test-server-host.js";
import { dumpAST } from "../parser.test.js";

describe("compiler: server: misc", () => {
  describe("getCompletionNodeAtPosition", () => {
    async function getNodeAtCursor(
      sourceWithCursor: string
    ): Promise<{ root: TypeSpecScriptNode; node: Node | undefined }> {
      const { source, pos } = extractCursor(sourceWithCursor);
      const root = parse(source);
      dumpAST(root);
      return { node: getCompletionNodeAtPosition(root, pos), root };
    }

    it("return identifier for property return type", async () => {
      const { node } = await getNodeAtCursor(`
        model Foo {
          prop: stri┆ng
        }
      `);
      ok(node);
      strictEqual(node.kind, SyntaxKind.Identifier as const);
      strictEqual(node.sv, "string");
    });

    it("return missing identifier node when at the position for model property type", async () => {
      const { node } = await getNodeAtCursor(`
        model Foo {
          prop: ┆
        }
      `);
      ok(node);
      strictEqual(node.kind, SyntaxKind.Identifier as const);
      strictEqual(node.sv, "<missing identifier>1");
    });

    it("return string literal when in non completed string", async () => {
      const { node } = await getNodeAtCursor(`
        import "┆
      `);
      ok(node);
      strictEqual(node.kind, SyntaxKind.StringLiteral);
    });

    it("return string literal when in non completed multi line string", async () => {
      const { node } = await getNodeAtCursor(`
        model Foo {
          prop: """┆
        }
      `);
      ok(node);
      strictEqual(node.kind, SyntaxKind.StringLiteral);
    });

    it("return missing identifier between dot and close paren", async () => {
      const { node } = await getNodeAtCursor(`
        @myDecN.┆)
      `);
      ok(node);
      strictEqual(node.kind, SyntaxKind.Identifier as const);
      strictEqual(node.sv, "<missing identifier>1");
    });

    describe("resolve real node when no potential identifier", () => {
      it("return namespace when in namespace body", async () => {
        const { node } = await getNodeAtCursor(`
        namespace Foo {
          ┆
        }
      `);
        ok(node);
        strictEqual(node.kind, SyntaxKind.NamespaceStatement as const);
        strictEqual(node.id.sv, "Foo");
      });
    });
  });
});
