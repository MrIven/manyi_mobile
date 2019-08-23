module.exports = {
	'/root/': {
		target: 'http://www.easiroam.cn/',
		changeOrigin: true
	},
  '/api': {
		target: 'http://www.easiroam.cn/',
		changeOrigin: true,
    pathRewrite: {
		  '^/api': ''
    }
	}
}
