
module.exports = {
    port: 8777,
    proxy: {
        '/user': {
            target: 'http://192.168.4.124:9900',
            changeOrigin: true,
            pathRewrite: {
                '^/user': '/user'
            }
        },
        '/profile': {
            target: 'http://192.168.4.124:9900',
            changeOrigin: true,
            pathRewrite: {
                '^/profile': '/profile'
            }
        },
        '/config': {
            target: 'http://192.168.4.124:9900',
            changeOrigin: true,
            pathRewrite: {
                '^/config': '/config'
            }
        },
        '/unified_account2': {
            target: 'http://test.backend.ids111.com/',
            changeOrigin: true,
            pathRewrite: {
                '^/unified_account': '/unified_account'
            }
        },
        '/upload': {
            target:'http://test.backend.ids111.com/',
            changeOrigin: true,
            pathRewrite: {
                '^/upload': '/upload'
            }
        },
        '/unified_account': {
            target:'http://test.backend.ids111.com/',
            changeOrigin: true,
            pathRewrite: {
                '^/unified_account': '/unified_account'
            }
        },
        '/unified_wx': {
            target:'http://192.168.141.140:8400',
            changeOrigin: true,
            pathRewrite: {
                '^/unified_wx': '/unified_wx'
            }
        },
        '/unified_fission': {
            target:'http://192.168.141.140:8400',
            changeOrigin: true,
            pathRewrite: {
                '^/unified_fission': '/unified_fission'
            }
        }
    },
    clientLogLevel: "error"
};
