// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  apiEndpoint: 'http://rs-api:8080/api',
  apiVersion: 'v1',
  socket: {
    endpoint: 'http://rs-api:8080',
    inbound: 'updates',
    outbound: 'app'
  },
  settings: {
    reservationsUpdateInterval: 900000 //15min
  }
};
