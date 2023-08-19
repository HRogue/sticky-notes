This repository was the test task for employment. 
Please check the task.txt file.

## Run

To run this application you need nodejs installed on your machine.

To run this app use following command:

```
npm ci && npm start
```

## Architecture
Some "custom" terminology:
- resuable components - react-components  that **don't** depend on application-specific things. All reusable components locates in directories called "components". They have no idea what their callback should do or which state managment library you are using. It is possible to use them as part of some ui-kit.

- containers - react-components that **depend** on application-specific things, such as useStore hook or other containers. You can't simply reuse them in other application. All containers locates in directories called "containers". *P.S. I stole naming from Dan Abramov, but it is not the same.*

Benefit of component approach is to make some reusable and incapsulated ui-bricks, and i achieved this that way in this case. Components is my bricks, and containers it is some way to bind application state with view.

As no additional libraries is allowed the simplest way to do state managment is to use UseReducer hook to implement redux-like approach.


# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

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

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
