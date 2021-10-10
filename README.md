# Instagram Clone

This project is a simplified a full stack clone of Instagram.

## Tech Stack

- Postgresql
- React
- Node
- Express
- For CSS - Materialize, Bootstrap.

## To Run App in local machine

1. Clone Repository

```sh
git clone https://github.com/Dharmendra-1/Instagram_clone.git
```

2. Setup Database on local

   -Install postgres

    ```sh
    sudo apt-get -y install postgresql
    ```

    -Start postgres server

    ```sh
    sudo su postgres
    ```


3. Find the working directory in the local storage.

4. Install node modules

   -For Backend

   ```sh
    cd backend
    npm install
   ```

   -For Frontend

   ```sh
    cd frontend
    npm install
   ```

5. Start server
   -For Backend

   ```sh
    cd backend
    npm run start
   ```

   -For Frontend

   ```sh
    cd frontend
    npm start
   ```

## API Listing

#### BASE URL - http://127.0.0.1:4000/user

#### Authentication API

- `post user/signup`
- `post user/login`

#### Users API

- `get /user`

