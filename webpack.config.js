var webpack = require('webpack');

module.exports = {
    entry: './src/index.js',
    //이 파일에서부터 require한 파일 불러오고 재귀적으로 불러온다. 배열을 넣어서 여러파일 전달가능
    output: {
        path: __dirname + '/public/',
        filename: 'bundle.js'
    },
    //합친폴더를 output에 bundle에 저장한다. 합친다.
    devServer: {
        hot: true,      //파일 수정될때마다 리로딩
        inline: true,   //핫리로딩에 필요한 웹팩을 번들에 넣어주는것
        host: '0.0.0.0',
        port: 4000,
        contentBase: __dirname + '/public/',
    },

    module: {
        loaders: [
            {
                test: /\.js$/,
                loaders: ['react-hot','babel?'+JSON.stringify({
                    cacheDirectory: true,
                    presets: ['es2015', 'react']
                })],
                exclude: /node_modules/
            }
        ]
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
}