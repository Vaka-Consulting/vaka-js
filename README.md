# VakaJS Monorepo

VakaJS is a monorepo containing packages and applications to help build solutions that interact with the Cardano Blockchain.

## Project Structure

- `api/` - Node.js backend API (TypeScript, MikroORM, GraphQL)
- `ui/` - Frontend applications and packages (Next.js, React, etc.)

## Prerequisites

- Node.js >= 20.x.x
- npm (for API)
- yarn (for UI)

## Getting Started



### 2. Run the API

In a terminal, start the API server:

```bash
cd api
npm i
npm run dev
```

The API will start on its configured port (see `api/README.md` or `api/src/server.ts`).

### 3. Run the UI

In a separate terminal, start the UI (for example, the web3-auth-demo app):

```bash
cd ui/applications/web3-auth-demo
yarn install
yarn dev
```

Or for the climafi-impact-assets app:

```bash
cd ui/applications/climafi-impact-assets
yarn install
yarn dev
```

The UI will be available at [http://localhost:3000](http://localhost:3000) by default.

## Development

- Edit backend code in `api/`
- Edit frontend code in `ui/applications/<app-name>/`

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [MikroORM Documentation](https://mikro-orm.io/docs)
- [GraphQL Documentation](https://graphql.org/learn/)

## License

See [LICENSE](./LICENSE) for details.
