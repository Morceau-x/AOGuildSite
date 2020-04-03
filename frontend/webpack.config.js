// Mainly by following webpack doc:
// https://webpack.js.org/guides/typescript/

const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const outDir = path.join(__dirname, 'dist');
// Config use for development. used by webpack-dev-server
const devConfig = {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        port: 8800,
        hot: true,
        contentBase: path.resolve(__dirname, 'dist'),
        historyApiFallback: {
            disableDotRule: true,
        },
    },
};

const prodConfig = {
    mode: 'production',
    performance: {
        hints: 'warning',
        maxAssetSize: 200000,
        maxEntrypointSize: 400000,
    },
    optimization: {
        namedModules: false,
        namedChunks: false,
        nodeEnv: 'production',
        flagIncludedChunks: true,
        occurrenceOrder: true,
        sideEffects: true,
        usedExports: true,
        concatenateModules: true,
        splitChunks: {
            hidePathInfo: true,
            minSize: 30000,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
        },
        noEmitOnErrors: true,
        checkWasmTypes: true,
        minimize: true,
    },
};

module.exports = (env, argv) => {
    const config = {
        entry: './src/App.tsx',
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: 'ts-loader',
                    exclude: /node_modules/,
                },
                {
                    test: /\.(less)$/,
                    use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader'],
                },
                {
                    test: /\.(sa|sc|c)ss$/,
                    use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
                },
                {
                    test: /\.jpe?g$|\.gif$|\.ico$|\.png$|\.svg$|\.html$/,
                    use: 'file-loader?name=[name].[ext]',
                },

                // the following rules handle font extraction
                {
                    test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                    loader: 'url-loader?limit=10000&mimetype=application/font-woff',
                },
                {
                    test: /\.(ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                    loader: 'file-loader',
                },
                {
                    test: /\.otf(\?.*)?$/,
                    use: 'file-loader?name=/fonts/[name].[ext]&mimetype=application/font-otf',
                },
            ],
        },
        plugins: [
            // this handles the bundled .css output file
            new MiniCssExtractPlugin({
                filename: '[name].css',
                //filename: "./css/[name].css"
            }),
            new CopyWebpackPlugin([{ from: path.join(__dirname, 'public/index.html'), to: outDir }]),
        ],
        resolve: {
            extensions: ['.tsx', '.ts', '.js', '.less'],
        },
        output: {
            filename: 'bundle.js',
            path: outDir,
            publicPath: '/',
        },
        serve: {
            add: (app) => {
                app.use(convert(history()));
            },
            content: path.join(__dirname, './src/App.tsx'),
            dev: {
                publicPath: path.join(__dirname, 'dist'),
            },
            open: true,
        },
        ...(argv.mode === 'production' ? prodConfig : devConfig),
    };
    console.log('webpack config loaded: ', config);
    return config;
};
