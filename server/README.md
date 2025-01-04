# Employees Birthday Board Server

## Running server on Cloud

```
https://employees-birthday-board.onrender.com
```

## Run server on Docker

### Build Docker Image

Run the command below in the terminal:

```
docker build --tag employees-birthday-board .
```

### Run Docker Container

Run the command below to start the container:

```
docker run -p 8000:5000 --name employees-birthday-board -d employees-birthday-board
```

The server will be available at:

```
http://localhost:5000/
```

## Run code locally

### Install Dependencies

You can install the dependencies using either `yarn` or `npm`:

#### Using Yarn

```
yarn install
```

#### Using npm

```
npm install
```

### Start the Server

Open the terminal in the this directory and run the following command:

#### Using Yarn:

```
yarn dev
```

#### Using npm:

```
npm run dev
```

The server will run on:

```
http://localhost:5000/
```
