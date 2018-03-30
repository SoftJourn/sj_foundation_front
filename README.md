# SJ Foundation Front


### Install dependencies 
```
npm install
```

### Run Locally
```
npm run start-dev
```
Front is now running on: `http://localhost:3001`

### Build
```
npm run build
```

### Under the hood
 
 - React
 - Redux
 - SASS
 - Bootstrap 4
 
### Project Structure
Main project files and folders:

```
sj_foundation_front [project root]
├── src
│   ├── actions [redux actions]
│   ├── components [apps componenets]
│   │   ├── _old_components [old components, that were used for the previous app;
│   │   │                    possible to use for new components]
│   │   ├── <Component> [component folder: if component is complex (consist of 2 or more components),
│   │   │                    group it into folder]
│   │   ├── ... 
│   │   ├── <component>.js [component file (simple component)]
│   │   └── ...
│   ├── images [images folder]
│   ├── pages  [components, that present pages]
│   ├── redux  [Redux logic]
│   │   ├── _old_reducers [old reducers, that were used for the previous app;
│   │   │                    possible to use for new reducers]
│   │   ├── middleware [Redux middlewares]
│   │   ├── reducers [Redux reducers]
│   │   └── store [Redux store configurations]
│   ├── styles [styles folder]
│   ├── utils [additional utils]
│   ├── ActionTypes.js [list of actions]
│   └── index.js [entry application point]
├── server.js [entry point for serving]
├── webpack.config.js [Webpack configuration]
└── webpack.dev.config.js [Webpack configuration (for development)]
```