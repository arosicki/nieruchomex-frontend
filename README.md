# Projekt Grupowy Backend

## Running the application

### Prerequisites
- Node.js 20 installed on your syste *Node.js 18 should work as well, but it is not recommended*
- (Backend app)[https://github.com/ar-ms-pz/projekt-grupowy] running and accesible via network
- (Mapbox)[https://www.mapbox.com/] api token
- Internet connection

### Configure the app
Copy `example.env` file into `.env` and enter application configuration
`cp example.env .env`

Update `VITE_MAPBOX_ACCESS_TOKEN` with your mapbox api token

### Install dependencies
`npm install`

### Run the app
a) Run in dev mode with hot reload
`npm run dev`

b) Run production build
`npm run build`

### Done ✨
*App is accessible on `http://localhost:5173/`*
