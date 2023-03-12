import { ChildProcess, spawn, SpawnOptions } from "child_process";

function findClosestSchematicsBinary(): string {
  try {
    return require.resolve("@angular-devkit/schematics-cli/bin/schematics.js", {
      paths: module.paths,
    });
  } catch {
    throw new Error("'schematics' binary path could not be found!");
  }
}

export function normalizeToKebabOrSnakeCase(str: string) {
  const STRING_DASHERIZE_REGEXP = /\s/g;
  const STRING_DECAMELIZE_REGEXP = /([a-z\d])([A-Z])/g;
  return str
    .replace(STRING_DECAMELIZE_REGEXP, "$1-$2")
    .toLowerCase()
    .replace(STRING_DASHERIZE_REGEXP, "-");
}

function formatName(name: string) {
  return normalizeToKebabOrSnakeCase(name)
    .split("")
    .reduce((content, char) => {
      if (char === "(" || char === ")" || char === "[" || char === "]") {
        return `${content}\\${char}`;
      }
      return `${content}${char}`;
    }, "");
}

async function runGenerateLibCommand(name: string): Promise<null | string> {
  const options: SpawnOptions = {
    cwd: process.cwd(),
    stdio: "inherit",
    shell: true,
  };
  return new Promise<null | string>((resolve, reject) => {
    const child: ChildProcess = spawn(
      `node`,
      [
        findClosestSchematicsBinary(),
        `@nestjs/schematics:library --name="${formatName(
          name
        )}" --prefix="" --root-dir=packages`,
      ],
      options
    );
    child.on("close", (code) => {
      if (code === 0) {
        resolve(null);
      } else {
        console.error("there was an error");
        reject();
      }
    });
  });
}

function exitWithError(error: string) {
  console.error(error);
  process.exit(1);
}

async function main() {
  const [name] = process.argv.slice(2);

  if (name === undefined || name === null) {
    exitWithError("The library name is required");
  }

  await runGenerateLibCommand(name);
  //2. add package json

  //3. modify tsconfig
  //4. install deps
}

main().catch((err) => {
  exitWithError(err);
});
