function addHeaders (host, config) {
  return {
    target: 'http://' + host,
    secure: false,
    logLevel: 'debug',
    headers: {host: host},
    ...(config || {})
  }
}

const devHosts = {
  'api': 'localhost:3000',
};

const PROXY_CONFIG = (hosts) => {
  return {
    '/api/*': addHeaders(
      hosts.api,
      {pathRewrite: {'^/api': '/'}}
    ),

  };
}

// use 'devHosts' or 'preprodHosts' to switch between environments
module.exports = PROXY_CONFIG(devHosts);
