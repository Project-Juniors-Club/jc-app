# Set up

1. Setup Prettier on VScode
2. Install Yarn
3. Create `.env` file with `DATABASE_URL`
4. `yarn`
5. `yarn dev`

# Database

Online Heroku Postgresql server

After modifying the database, run:

`npx prisma generate`

# Fix Typescript error relating to `prisma.ts`

run `yarn add -D @prisma/client`

# Guidelines

- Follow [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/#summary)
- Files in the /pages folder generally should focus on the structure and layout of the page, try to avoid doing all of the logic in that single file. If it gets too messy or hard to read, create your corresponding folder in the /components folder and split up your components there. The more atomic the better.
- Magic strings and values should either be declared in the file as a constant, or in the /utils folder if it shared throughout. Examples of these are route strings, eg: const HOME_URL = "/home";
- Custom hooks should be in the /hooks folder directory.
