const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
      '/oauth', createProxyMiddleware({
          target: 'https://aip.baidubce.com', 
          changeOrigin: true 
      }),
  );
  app.use(
    '/rest', createProxyMiddleware({
        target: 'https://aip.baidubce.com', 
        changeOrigin: true, 
    }),
);
};