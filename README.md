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