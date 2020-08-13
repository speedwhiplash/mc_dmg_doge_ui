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
for (let i = 0, l = 8; i < l; i++) {
  devHosts['multiapi' + i] = 'localhost:300' + i;
}

const PROXY_CONFIG = (hosts) => {
  let config = {
    '/api/*': addHeaders(
      hosts.api,
      {pathRewrite: {'^/api/': '/'}}
    ),
  };

  for (let i = 0, l = 8; i < l; i++) {
    let pathRewrite = {};
    pathRewrite['^/multiapi' + i + '/'] = '/';
    config['/multiapi' + i + '/*'] = addHeaders(hosts['multiapi' + i], {pathRewrite});
  }

  return config;
}

// use 'devHosts' or 'preprodHosts' to switch between environments
module.exports = PROXY_CONFIG(devHosts);
