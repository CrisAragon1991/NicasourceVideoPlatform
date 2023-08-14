# Nica Source Video Platform

To execute this api you can do it with docker use the command: 

    docker compose up -d

alternatively you can use run the project with node following the next steps

- create a bd in postgres with the same name as the .env file
- npm ci (install packages)
- npm run dev (initicialize the server on development)

Both methods trigger the migration and seeder methods

Note: To execute this program you will need a .env file in the root folder to load configuration for the api, please ask one copy to the repository owner.