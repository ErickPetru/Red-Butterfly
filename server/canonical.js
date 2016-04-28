if (process.env.ROOT_URL) {
  if (typeof WebApp !== 'undefined')
    var httpServer = WebApp.httpServer;
  else
    var httpServer = __meteor_bootstrap__.httpServer;

  var oldHttpServerListeners = httpServer.listeners('request').slice(0);

  httpServer.removeAllListeners('request');
  httpServer.addListener('request', function (req, res) {
    var remoteAddress = req.connection.remoteAddress || req.socket.remoteAddress;

    var isLocal = ((
      remoteAddress === "127.0.0.1" &&
      (!req.headers['x-forwarded-for'] ||
        _.all(req.headers['x-forwarded-for'].split(','), function (x) {
          return /\s*127\.0\.0\.1\s*/.test(x);
        }))) || process.env.CANONICAL_DISABLE === "true") && process.env.CANONICAL_SIMULATE_PRODUCTION !== "true";

    var host = req.headers.host || 'no-host-header';

    var isSsl = req.connection.pair ||
      (req.headers['x-forwarded-proto'] &&
        req.headers['x-forwarded-proto'].indexOf('https') !== -1);

    var protocol = isSsl ? "https" : "http";
    var urlBase = protocol + "://" + host;
    var alreadyCanonical = urlBase === process.env.ROOT_URL;

    if (!isLocal && !alreadyCanonical) {
      res.writeHead(301, {
        'Location': process.env.ROOT_URL + req.url
      });
      res.end();
      return;
    }

    var args = arguments;
    _.each(oldHttpServerListeners, function (oldListener) {
      oldListener.apply(httpServer, args);
    });
  });
}