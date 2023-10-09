const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { DefinePlugin } = require('webpack');
require('dotenv').config()

const envVariablesToExpose = Object.keys(process.env)
  .filter(key => key.startsWith('CHROME_EXTENSION_'))
  .reduce((env, key) => {
    env[`process.env.${key}`] = JSON.stringify(process.env[key]);
    return env;
  }, {});


const filepath = (pathData) => {
    const rootFile = ['background', 'content-script']
    // If the chunk name is "background", use a specific filename
    if (rootFile.includes(pathData.chunk.name)) {
       return '[name].js';
    }

    const htmlFiles = ['popup', 'options']
    if (htmlFiles.includes(pathData.chunk.name)) {
        return '[name]/[name].js'
    }

    // Otherwise, use the directory structure
    return 'external/[name]/[name].js';
}

const mapHtmlPlugin = (chunks) => {
    const htmlPluginList = chunks.map(chunk => {
        return new HtmlWebpackPlugin({
            title: 'React Chrome Extension',
            filename: `${chunk}.html`,
            chunks: [`${chunk}`]
        })
    })
    return htmlPluginList
}

module.exports = {
    mode: process.env.CHROME_EXTENSION_MODE,
    devtool: process.env.CHROME_EXTENSION_MODE === 'production' ? false : 'cheap-module-source-map',
    entry:{
        popup: path.resolve('src/popup/popup.tsx'),
        options: path.resolve('src/options/options.tsx'),
        background: path.resolve('src/background.ts'),
        "content-script": path.resolve('src/content-script.tsx')
    }, // entry point, this is the place where it will start building dependency graph
    module: {
        // To compile typescript file it needs additional module
        // don't have to import ts-loader
        rules: [{
            use: 'ts-loader',
            test: /\.tsx?$/,
            exclude: /node_modules/
        }, {
            use: ['style-loader', 'css-loader', 'sass-loader'],
            test: /\.(scss|sass|css)$/,
            exclude: /node_modules/
        }, {
            type: 'asset/resource',
            test: /\.(woff|woff2|eot|ttf|svg)$/,
        },{
            test: /\.(jpg|png)$/,
            use: {
              loader: 'url-loader',
            },
        }],
    },
    plugins: [
        new DefinePlugin(envVariablesToExpose),
        // It's not directly editing or compliling
        new CopyPlugin({
            patterns: [{
                from: path.resolve('src/manifest.json'),
                to: path.resolve('dist')
            }, {
                from: path.resolve('src/assets'),
                to: path.resolve('dist/assets')
            }]
        }),
        new CleanWebpackPlugin(), // to clean before rebuild
        ...mapHtmlPlugin(['popup', 'options'])
    ],
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
    },
    output: {
        filename: filepath,
        path: path.resolve('dist')
    },
    optimization: {
        splitChunks: {
            chunks(chunkName) {
                return chunkName.name !== 'content-script'
            }
        }
    }
}