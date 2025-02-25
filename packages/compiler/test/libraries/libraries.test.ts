import { fileURLToPath, URL } from "url";
import { MANIFEST } from "../../core/manifest.js";
import { NodeHost } from "../../core/node-host.js";
import { compile } from "../../core/program.js";
import { createTestHost, expectDiagnosticEmpty, expectDiagnostics } from "../../testing/index.js";

const libs = [
  "simple", // Load a library in `node_modules`
  "library-dev/samples", // Load library defined in parent folder.
];

describe("compiler: libraries", () => {
  for (const lib of libs) {
    describe(lib, () => {
      it("compiles without error", async () => {
        const mainFile = fileURLToPath(
          new URL(`../../../test/libraries/${lib}/main.tsp`, import.meta.url)
        );
        const program = await compile(NodeHost, mainFile, { noEmit: true });
        expectDiagnosticEmpty(program.diagnostics);
      });
    });
  }

  it("detects compiler version mismatches", async () => {
    const testHost = await createTestHost();
    testHost.addTypeSpecFile("main.tsp", "");
    testHost.addTypeSpecFile(
      "./node_modules/@typespec/compiler/package.json",
      JSON.stringify({
        name: "@typespec/compiler",
        main: "index.js",
        version: "0.1.0-notthesame.1",
      })
    );
    testHost.addJsFile("./node_modules/@typespec/compiler/index.js", {});
    const diagnostics = await testHost.diagnose("main.tsp");
    expectDiagnostics(diagnostics, {
      code: "compiler-version-mismatch",
      severity: "warning",
      message: /Current TypeSpec compiler conflicts with local version/,
    });
  });

  it("allows compiler install to mismatch if the version are the same", async () => {
    const testHost = await createTestHost();
    testHost.addTypeSpecFile("main.tsp", "");
    testHost.addTypeSpecFile(
      "./node_modules/@typespec/compiler/package.json",
      JSON.stringify({ name: "@typespec/compiler", main: "index.js", version: MANIFEST.version })
    );
    testHost.addJsFile("./node_modules/@typespec/compiler/index.js", {});
    const diagnostics = await testHost.diagnose("main.tsp");
    expectDiagnosticEmpty(diagnostics);
  });

  it("report errors in js files", async () => {
    const testHost = await createTestHost();
    testHost.addJsFile("lib1.js", { $myDec: () => null });
    testHost.addJsFile("lib2.js", { $myDec: () => null });
    testHost.addTypeSpecFile(
      "main.tsp",
      `
    import "./lib1.js";
    import "./lib2.js";
    `
    );
    const diagnostics = await testHost.diagnose("main.tsp");
    expectDiagnostics(diagnostics, [
      {
        code: "duplicate-symbol",
        message: `Duplicate name: "@myDec"`,
        file: "lib1.js",
      },
      {
        code: "duplicate-symbol",
        message: `Duplicate name: "@myDec"`,
        file: "lib2.js",
      },
    ]);
  });
});
