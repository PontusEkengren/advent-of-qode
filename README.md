### `Prerequisite`

**Create an .env file** in this folder and enter your google api-client id<br>
To read more see [google documentation](https://developers.google.com/identity/sign-in/web/sign-in).<br>

```
REACT_APP_CLIENT_ID=********.apps.googleusercontent.com
```

Default value for server-side is

```
REACT_APP_ADVENT_OF_QODE_SERVER=https://localhost:3001
```

### `npm install`

To install dependencies

### `npm start`

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `advent of code`

This project is inspired by [Advent of code](https://adventofcode.com/)

Deploy with: https://docs.microsoft.com/en-us/azure/container-registry/container-registry-get-started-docker-cli?tabs=azure-cli

az login
docker login adventofqode.azurecr.io
docker build . -t adventofqode.azurecr.io/advent-of-qode
docker push adventofqode.azurecr.io/advent-of-qode
