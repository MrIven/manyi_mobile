module.exports = {
	'/root/': {
		target: 'http://localhost:8090/app/',
		changeOrigin: true
	},
  '/': {
		target: 'http://localhost:8090/app/',
		changeOrigin: true
	}
}
