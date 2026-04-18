# TypeScript to JavaScript Migration Plan

This plan details the process of completely stripping all TypeScript from the monorepo, generating equivalent `.js` and `.jsx` files, and removing all typing configuration to turn the project into pure JavaScript.

## User Review Required
> [!CAUTION]
> This is a massively destructive structural change. Removing TypeScript means destroying all strict typing, `tsconfig.json` structures, and explicit runtime safety guards that rely on the TS compiler across your APIs, Database, and Frontend artifacts.
> Review this plan carefully before approving!

## Proposed Changes

### 1. Transpilation & File Replacement
I will execute the `detype` compiler via `npx` across the `artifacts`, `lib`, and `scripts` directories. This process parses all `.ts` and `.tsx` files, strips out the static types, and outputs beautifully formatted standard `.js` and `.jsx` source files next to the originals. 

After verifying successful transpilation, all original `.ts` and `.tsx` files across the workspace will be aggressively deleted.

### 2. Configuration Eradication
#### [DELETE] [tsconfig.json](file:///c:/Users/akvhe/OneDrive/Documents/Cine-Discover-React-App/tsconfig.json) 
#### [DELETE] [tsconfig.base.json](file:///c:/Users/akvhe/OneDrive/Documents/Cine-Discover-React-App/tsconfig.base.json)
(And removing all nested `tsconfig.json` files within `artifacts/`, `lib/`, and `scripts/`).

### 3. Build Tooling Modifications
#### [MODIFY] [artifacts/api-server/build.mjs](file:///c:/Users/akvhe/OneDrive/Documents/Cine-Discover-React-App/artifacts/api-server/build.mjs)
- Update `esbuild` to target the new `src/index.js` entry point instead of `src/index.ts`.

#### [MODIFY] [*/package.json](file:///c:/Users/akvhe/OneDrive/Documents/Cine-Discover-React-App/package.json)
Across the root and *all sub-packages*:
- Strip the `"typecheck"` scripts and `tsc --build` commands.
- Remove all `@types/*` and `typescript` from `devDependencies`.

#### [RENAME] `vite.config.ts` to `vite.config.js`
In the React artifacts (`movie-discovery` and `mockup-sandbox`), adjust `package.json` scripts if they explicitly call `vite.config.ts`.

## Verification Plan

### Automated Tests
1. Run `pnpm install` across the workspace to prune out the TypeScript compiler and schema types.
2. Run a workspace-wide search for any `.ts` extensions.
3. Validate that the local development servers (`pnpm --filter @workspace/api-server run dev` and `pnpm --filter @workspace/movie-discovery run dev`) continue to build and serve correctly using raw JavaScript.
