# Launch Darkly test project with NodeJS

This project generates a simple webserver which uses LaunchDarkly feature flags to create a simple website. The website is created by building an html string. While I absolutely don't recommend creating websites likes this, it makes for an extremely simple and lean showcase which should be compatible with any device. 

The website contains a table with information and, based on the value of feature flags, displays a header with a warning, or a button in the table (for admin user).

## Installing the application locally

1. Download the files (index.js, package.json) to a local directory
2. Open a terminal of your choice with npm installed in the directory and run the command:
```
npm i
```
3. In `index.js`, insert your sdk key in line 2 (`const ld_sdk_key = ""`)
4. Run the following command to start the application:
```
node index.js
```

The application will create a local webserver running by default on port `3456`. If this port is already in use you may change the variable `const port = 3456` to a free port of your choice.

## Using the application

The application uses two feature flags and two users. The feature flags are called `beta-header`, which is a simple on-off toggle, and `admin-options`, which uses Individual targeting (true for user `Carl Dolling`, false for user `Bob Loblaw`). The users are specified in the code of the application and will be created automatically once you navigate to `localhost:3456` and `localhost:3456?user=admin`. 

1. Navigate to `localhost:3456`
2. Toggle `beta-header` feature flag in LaunchDarkly
3. Refresh local website by hitting F5
4. Navigate to `localhost:3456?user=admin`

