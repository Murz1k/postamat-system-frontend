# CellsWebApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.2.2.

## Install

1. Install [Git](https://git-scm.com/downloads)

2. Clone this repository from GitHub:
`$ git clone https://github.com/Autokometa/Yacheiki-WebApp.git`

3. Install [NodeJS](https://nodejs.org/en/)

4. Install Angular CLI:
`$ npm i -g @angular/cli`

5. Install node modules:
```bash
# go to folder with CellsWebApp
$ npm install
```

## Development server

Run `npm run dev` for a dev server. Navigate to `http://localhost:8898/`. The app will automatically reload if you change any of the source files. Browser would be opened automatically.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Deployment

`# NodeJS And Angukar CLI needed`

1) Change IP Address API if it needed. IP Address in `src/environments/environment.prod.ts`
2) Run `ng build` to make a bundle (this script must be started in root directory of application)
3) Add this bundle to server. Move all files from folder `dist/CellsWebApp` to `server/src`.
4) Set up the environment (process.env.PORT) or change port in `server/index.js`
5) Start server with `$ npm run start` from server folder

## Author

Cvetkov Ivan
