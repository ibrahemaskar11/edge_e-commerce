# Edge e-commerce

Edge is a MERN stack e-commerce website 

## Technologies used:

- MongoDb for database

- Node.js/Express for back-end development 

- json web tokens for authentication 

- React for building the front-end 

- redux for managing the application context along with the context API for handling auth context 

- TailwindCSS for styling the website 

## Starting the project

- Project is divided into two sub folders Server and App 

## Getting started with the Server 

### 1.install server node modules using the command `npm install`

### 2.Install the environment variables

- Server contain the backend to get started you will need to build a config.env file that contains the following variables 
- PORT: The port on which the server should start
- MONGO_URI: URI for your mongodb 
- JWT_SECRET: Secret key with which the jwt tokens are created
- JWT_REFRESH_SECRET: Secret key with which the jwt refresh tokens are created
- JWT_EXPIRE: The time for which the jwt token is valid
- JWT_REFRESH_EXPIRE: The time for which the jwt refresh token is valid
- EMAIL_SERVICE: Email service which is given to you by sendgrid to use their stmp service
- EMAIL_USERNAME: Username which is given to you by sendgrid
- EMAIL_PASSWORD: API key which is give to you by sendgrid
- EMAIL_FROM: The Email from which the emails would be sent
- EMAIL_HOST: The host given to you by sendgrid
- EMAIL_PORT: The email port given to you by sendgrid

### 3.Run the server using the command `npm start` or use nodemon with the command `npm run server`

## Getting started with the front-end

### Install the front-end node modules using the command `npm install`

### Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

