# WPZ-Frontend

###First:

- Clone the repository

```
git clone https://github.com/bkstud/WPZ-Frontend.git
```

- Install dependencies

```
npm install
```

- Run project

```
npm start
```

### To run Prettier

```
npx prettier --write .
```

### Project is running on:

http://localhost:3000/

### To start project as container:

From project root run:

```
docker run --network host -it -v $(pwd):/app bkstud/wpzfrontend:latest
```
If you want to develop code with instant changes run:
```
docker run -p 3002:3002 -it -v $(pwd):/home/project -v $(pwd):/app bkstud/wpzfrontend:latest
```
Following example shows environmental variables to change backend service address, port or frontent aplication running 
port (`PORT` variable):
```
docker run --network host -it -v $(pwd):/app --env BACKEND_ADDRESS=127.0.0.1 --env BACKEND_PORT=3003 --env PORT=80 bkstud/wpzfrontend:latest
```