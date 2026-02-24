# Nieruchomex frontend

## Running the application

### Prerequisites

- Node.js >=20 installed on your system
- [Backend app](https://github.com/ar-ms-pz/projekt-grupowy) running and accessible via network
- [Mapbox](https://www.mapbox.com/) api token
- Internet connection

### Configure the app

Copy `example.env` file into `.env` and enter application configuration

```
cp example.env .env
```

Update `VITE_MAPBOX_ACCESS_TOKEN` with your mapbox api token
Update `VITE_API_URL` with backend URL
Update any othe config variables from `src/config.ts` if needed

### Install dependencies

`npm install`

### Run the app

Run in dev mode with hot reload
`npm run dev`

Run production build
`npm run build`

### Done ✨

_App is accessible on `http://localhost:5173/`_
