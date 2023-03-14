This is a repo which purpose is to demo different approaches to integrate a Nest.js monorepo with Turborepo.

Currently, this repo showcases two approaches:

1. Nest.js monorepo within Turborepo: This approach assumes that all Nest.js apps and libraries' dependencies will live in the repo's root `package.json`. This approach lives in the `main` branch.

2. Turborepo with Nest.js projects: This approach assumes that all Nest.js apps and libraries have their own `package.json`, with their own scripts and node_modules. This approach lives in the `nest-turbo-separate-pkgs` branch.

Dependencies:

- You need to have installed the [nest-cli](https://docs.nestjs.com/cli/overview) and [yarn classic](https://classic.yarnpkg.com/en/docs/install#mac-stable) in your system.
- Run `yarn` at the root of the repo to install all deps in each branch

To build and run the main project (`nest-app`) these are the following steps:

- For `main` :
  - build: `nest build nest-app`
  - start: `nest start nest-app`
- For `nest-turbo-separate-pkgs`:
  - build: `yarn --cwd apps/nest-app build`
  - start: `yarn --cwd apps/nest-app start`
