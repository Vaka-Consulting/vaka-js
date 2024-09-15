# VakaJs
JavaScript (Typescript) &amp; packages to help build applications that can interact with the Cardano Blockchain.

## Our Mindset
Do not reinvent the wheel - If there are open source packages available that have good community support, we prefer using that and simply build layers how we see fit for our own projects.
- [YAGNI Principle](https://www.geeksforgeeks.org/what-is-yagni-principle-you-arent-gonna-need-it/) (You Aint Gonna Need It)
- Modular & Reusable Code

## Demo
[React Component Library](https://main--66c0876a279301bd450e1225.chromatic.com)

----------------

## How to start
This project is a monorepo managed by [Yarn Workspaces](https://classic.yarnpkg.com/en/docs/workspaces/).

### Installation
- Make sure you got (the latest version) of yarn `npm i -g yarn`.
- Run `yarn` to install all dependencies and packages.

### Run

#### React development w/ Storybook
In the root of the project, run ```yarn dev``` OR navigate to the `packages/react` directory and run ```yarn dev```. 

This will start a local Storybook environment where you can develop and test new components and provide them with documentation.


## Technology

### Core
- Typescript
- Development Configs
- Services & Providers
- React (optional) / Next.js (optional)

### Tools
- [Yarn Workspaces](https://classic.yarnpkg.com/lang/en/docs/workspaces/) - Link and manage workspaces and dependencies together.
- [ReactJS](https://reactjs.org/) - A JavaScript library for building interfaces.
- [Jest](https://jestjs.io/) - A Testing Framework with a focus on simplicity.
- [Material UI](https://mui.com/) - A React Component Library based on Google's Material Design (v2)
- [Testing Library](https://testing-library.com/) - Simple and complete testing utilities that encourage good testing practices.
- [Storybook](https://storybook.js.org/) - A JS-powered, component based styling framework - develop and view components.
- [Chromatic](https://chromatic.com/) - Ship UIs faster with automated workflows for Storybook - deploy, review and place comments.


### Packages
- [Common](./packages/common) - Constants, Typescript Types & Utils
- [Config](./packages/config) - Babel, ESLint, Commitlint, Prettier, Jest, Stylelint and more...
- [React](./packages/react) - Hooks, Components, Contexts & Providers & HOCs.
- [Web3Auth](./packages/web3-auth) - For authenticating users with Web3 wallets or email addresses (depends on API Endpoint & Database).

----

## Docs
[So much more documentation...](./docs/index.md)
