import { ChildProcess, spawn, SpawnOptions } from "child_process";
import * as fs from "fs/promises";

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
  return runCommand(
    "node",
    [
      findClosestSchematicsBinary(),
      `@nestjs/schematics:library --name="${name}" --prefix="" --root-dir=packages`,
    ],
    "There was an error generating the NestJS lib with code: "
  );
}

async function runInstallCommand(name: string) {
  return runCommand(
    "yarn",
    [`--cwd packages/${name}`],
    "There was an error installing the NestJS lib dependencies with code: "
  );
}

function runCommand(
  binary: "node" | "yarn",
  args: readonly string[],
  errorMessage: string
) {
  const options: SpawnOptions = {
    cwd: process.cwd(),
    stdio: "inherit",
    shell: true,
  };
  return new Promise<null | string>((resolve, reject) => {
    const child: ChildProcess = spawn(binary, args, options);
    child.on("close", (code) => {
      if (code === 0) {
        resolve(null);
      } else {
        reject(new Error(`${errorMessage} ${code}`));
      }
    });
  });
}

function exitWithError(error: string) {
  console.error(error);
  process.exit(1);
}

async function addPackageJson(name: string) {
  try {
    const libPackageJson = JSON.parse(
      await fs.readFile("./package.lib.json", "utf-8")
    );
    const finalLibPackageJson = {
      ...libPackageJson,
      name,
    };
    await fs.writeFile(
      `packages/${name}/package.json`,
      JSON.stringify(finalLibPackageJson, null, 2),
      "utf-8"
    );
  } catch (error) {
    throw new Error(
      `There was an error creating the package.json file to the new lib: ${JSON.stringify(
        error
      )}`
    );
  }
}

async function addLibPathAliasToJestConfigs(name: string) {
  const apps = ["nest-app", "nest-app-2"];
  for (const app of apps) {
    try {
      const packageJson = JSON.parse(
        await fs.readFile(`./apps/${app}/package.json`, "utf-8")
      );
      const modifiedPackageJson = {
        ...packageJson,
        jest: {
          ...packageJson.jest,
          moduleNameMapper: {
            ...packageJson.jest.moduleNameMapper,
            [`^@app/${name}(|/.*)$`]: `<rootDir>/../../packages/${name}/src/$1`,
          },
        },
      };
      await fs.writeFile(
        `./apps/${app}/package.json`,
        JSON.stringify(modifiedPackageJson, null, 2),
        "utf-8"
      );
    } catch (error) {
      throw new Error(
        `There was an error modifying the package.json file for ${app}: ${JSON.stringify(
          error
        )}`
      );
    }
  }
}

async function main() {
  const [name] = process.argv.slice(2);

  if (name === undefined || name === null) {
    exitWithError("The library name is required");
  }

  const formattedName = formatName(name);

  try {
    await runGenerateLibCommand(formattedName);
    await addPackageJson(formattedName);
    await addLibPathAliasToJestConfigs(formattedName);
    await runInstallCommand(formattedName);
  } catch (e) {
    const error = e as Error;
    exitWithError(error.message);
  }
}

main().catch((err) => {
  exitWithError(err);
});
