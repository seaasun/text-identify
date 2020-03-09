const express = require('express');
const cors = require('cors')
const { createProxyMiddleware } = require('http-proxy-middleware');
// const proxy = require('express-http-proxy');

var bodyParser = require("body-parser");

// mount `exampleProxy` in web server
const app = express();
app.use(cors())
// app.use('/api',proxy('https://aip.baidubce.com'));

// app.use(bodyParser.urlencoded({ extended: false }));
app.use(
    '/', createProxyMiddleware({
        target: 'https://aip.baidubce.com', 
        logLevel: 'debug',
        changeOrigin: true,
        secure: false,
        pathRewrite: {
          '^/' : ''
        },
    }),
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));


app.listen(3009);