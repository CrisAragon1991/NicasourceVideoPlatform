# Nica Source Video Platform

To execute this api you can do it with docker using the command: 

    docker compose up -d

alternatively, you can use run the project with node following the next steps

- create a bd in Postgres with the same name as the .env file
- npm ci (install packages)
- npm run dev (initicialize the server on development)

Both methods trigger the migration and seeder methods

<h2>Guide resource and request in postman collection</h2>

| Resources | Request Path |
| -------- | ------- |
| Sign Up User | * NicaSourceCollection/Users/Sign up Teacher *NicaSourceCollection/Users/Sign up Student |
| Sign In | NicaSourceCollection/Users/loggin |
| Creator Profile | NicaSourceCollection/Users/Profile |
|Create Video | NicaSourceCollection/Video/CreateVideo|
|Publish / Unpublish Video | NicaSourceCollection/Video/Publish/Unpublish Video |
|List Videos | NicaSourceCollection/Video/Publish/List Videos |
|Like Videos | NicaSourceCollection/Reactions/ Like, DisLike, It is funny, Im Angry, I love it |
|Video Details | NicaSourceCollection/Video/Video Details |
|Edit Video | NicaSourceCollection/Video/Edit Video |
|Follow Unfollow Creator | NicaSourceCollection/Follower/Follow / NicaSourceCollection/Follower/Unfollow |
|Initial Bootstrap App | This is triggered automatically when you start the service |


Note: To execute this program you will need a .env file in the root folder to load the configuration for the API, please ask for one copy from the repository owner.

Note 2: I had not had time enough to implement swagger or TDD but I left an example of TDD in the project you can execute the test with the command:
        
    npm run test