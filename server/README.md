# run on cloud

```
[https://skyline-robotics-task.herokuapp.com](https://employees-birthday-board.onrender.com/)
  ```

# run on docker

To build docker image run the command below in the terminal:
```
docker build --tag employees-birthday-board .
  ```

To run docker container, run the command: 
```
docker run -p 8000:5000 --name employees-birthday-board -d employees-birthday-board
  ```

Server is up on:
```
http://localhost:5000/
  ```

# run locally

First, You need to install all the dependencies, to do that run the command below in the terminal:
```
yarn install
  ```

To run the server,
open the terminal in the skyline-robotics-task file directory and run the command: 
```
yarn dev
  ```
  
The server will run on: 
```
http://localhost:5000/
  ```
