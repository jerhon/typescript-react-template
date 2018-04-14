# Overview

This is a minimalist template for a web application with a collapsable left sidebar.  It is supposed to be non-opinionated and only include the bear essentials to get started.  Additional features will be demonstarted as diferrent branches within the GIT repository.

# Architecture

The application is set up as 3 tier project with a frontend (webui), backend (webui-apis), and mongo database.

webui connects to webui-apis to retrieve and store information to be utilized at the frontend.

# webui

The 'webui' folder is the UI portion of the application.  It is built to be a single page application utilizing react along with typescript.

# webui-apis

The webui-apis folder is the APIs for the application.  The backend APIs are written in typscript on Node.js with Express.js as the server.  The APIs are to be documented with a swagger file.

# dependencies

In both the component directories just run install to get stated.
```
npm install
```

To start the backend and front for development run
```
npm start
```
in both directories.