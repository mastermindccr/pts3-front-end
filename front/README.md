# This React Server is composed of two pages: backStage(for admin) and FrontStage(for visitors)
## BackStage
    -place for submitting pictures(one for each time)
    -place for choosing to render or delete the submitted picture
    -place for handling displaying fan page URLs
### Variables
    -imgStatus: [{
        uuid: <int>, (a unique string id generated by uuid-by-string(<img name>))
        name: <name>, (a unique image name)
        start: <start>, (local time in json format)
        end: <end>, (local time in json format)
        show: <show> (0 for neither one is checked, 1 for rendering is checked, 2 for delete is checked)
    }, ...]
    -fanPages: [<URL1>, <URL2>, <URL3>]
### Components
    -submitImg: place for submitting images, only support jpg, jpeg and png.
    -imgChoices: place for either rendering or deleting existing images, each image has its own starting and finishing time as well as order of displaying, if more than 8 images are checked and in the time range, only display the first 8 images depends on the given order.
    -fanPages: place for handling displaying fan page URLs, which will render plugin on the front stage.
## FrontStage
    -insert Javascript SDK to load in Facebook plugin
    -use swipeable view to create banner

# Issues
### Facebook fan pages on front stage may cause some problems, possible causing reasons:
    -browser caches old version even if sdk version updates
    -other plugins(AD Blocks etc.)stop facebook sdk from loading
    -safari may have privacy policy to hinder facebook sdk from loading

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

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

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)