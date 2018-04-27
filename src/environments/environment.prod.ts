export const environment = {
  production: true,
  apiEndpoint: 'http://167.99.245.240:8080/api',
  apiVersion: 'v1',
  socket: {
    endpoint: 'http://167.99.245.240:8080',
    inbound: 'updates',
    outbound: 'app'
  },
  settings: {
    reservationsUpdateInterval: 900000 //15min
  }
};
