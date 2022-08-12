const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = (app) => {
	app.use(
		createProxyMiddleware('/data', {
			target: process.env.REACT_APP_PROXY, 
			changeOrigin: true,
		})
	);
};