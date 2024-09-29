# Set up
- Create `.env` file in folder root
- `yarn dev` to start the server

# Database
To generate db from schema:
`npx prisma generate`

Tip: `npx prisma studio` gives a nice gui for db

# Fix Typescript error relating to `prisma.ts`

run `yarn add -D @prisma/client`

# Dev commands

- `yarn dev` to start the server
- `yarn build` to check for build errors (should be done before pushing)
- `npx prisma show` to show the database schema in a GUI
- `npx prisma migrate dev --name <name>` to create a new migration

# Folder Structure

- `/api` vs `/lib/server`: `/api` is for server-side routes, handlers, serverless functions while `/lib/server` is for server-side libraries and utilities

# Figma

- https://www.figma.com/file/3KomEN0Jj7gv1t0gOxLgee/JCP-Design-System?type=design&node-id=0-1

# Guidelines

- Follow [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/#summary)
- Files in the /pages folder generally should focus on the structure and layout of the page, try to avoid doing all of the logic in that single file. If it gets too messy or hard to read, create your corresponding folder in the /components folder and split up your components there. The more atomic the better.
- Magic strings and values should either be declared in the file as a constant, or in the /utils folder if it shared throughout. Examples of these are route strings, eg: const HOME_URL = "/home";
- Custom hooks should be in the /hooks folder directory.
- Pull requests should follow `pull-request-template.md` and tag the relevant GitHub issue under Development.
