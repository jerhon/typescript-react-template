# Overview

This is a minimalist template for a web application with a collapsable left sidebar.  It is supposed to be non-opinionated and only include the bear essentials to get started.  Additional features will be demonstarted as diferrent branches within the GIT repository.

# Architecture

The application is set up as 3 tier project with a frontend (webui), backend (webui-apis), and mongo database.

webui connects to webui-apis to retrieve and store information to be utilized at the frontend.

## webui

The 'webui' folder is the UI portion of the application.  It is built to be a single page application utilizing react along with typescript.

The UI is split into 3 parts.  

* The model - This handles basic API integration with the backend.
* The state - This handles basic state management for the UI.  The state relies exclusively on the model to execute APIs and serves them in an object and action model that is easy to consume for the UI. 
* The UI - This contains all the components to display on the front end.  This deals primarily with the state component to retrieve information and perform actions which modify the state of the application. 

The model is a simple wrapper around fetch to make calls to APIs.  The goal is that any access to the backend is abstracted away from the actual technology that needs to use it.

## webui-apis

The webui-apis folder is the APIs for the application.  The backend APIs are written in typescript on Node.js with Express.js as the server.  The APIs are  documented with a swagger file.

The APIs right now are just mocked data.  In the future, the APIs will be hooked up to a mongodb backend which can be used to serve data.

# Running the Application

In both the component directories run install to get stated. 

```
npm install
```

To start the webui backend and front for development run the following command, this will start up the dev server on the webui and it will start nodemon on the backend to 
```
npm start:dev
```
in both directories.

# Bundling the Application

TODO: The application is bundled into docker containers for easy distribution to any system that can run linux containers.