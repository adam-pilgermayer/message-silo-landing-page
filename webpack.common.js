const path = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const CrittersWebpackPlugin = require("critters-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");

module.exports = {
	entry: {
		index: "./src/js/index.js",
	},
	output: {
		filename: "[name].[contenthash].min.js",
		path: path.resolve(__dirname, "dist"),
		publicPath: "",
		assetModuleFilename: (pathData) => {
			const filepath = path
				.dirname(pathData.filename)
				.split("/")
				.slice(1)
				.join("/");
			return `${filepath}/[name].[hash][ext][query]`;
		},
		clean: true,
	},
	optimization: {
		minimize: true,
		minimizer: [
			"...",
			new CssMinimizerPlugin(),
			new TerserPlugin({
				exclude: /node-modules/,
				minify: TerserPlugin.swcMinify,
				terserOptions: {
					compress: {
						drop_console: true,
					},
					mangle: true,
				},
			}),
		],
		splitChunks: {
			chunks: "all",
		},
	},
	plugins: [
		new htmlWebpackPlugin({
			filename: "index.html",
			template: "./src/template.html",
		}),
		new MiniCssExtractPlugin({
			filename: "[name].css",
			chunkFilename: "[id].css",
		}),
		new CrittersWebpackPlugin({
			preload: "swap",
			mergeStylesheets: false,
		}),
		new CompressionPlugin({
			exclude: /.map$/,
			deleteOriginalAssets: "keep-source-map",
		}),
	],
	module: {
		rules: [
			{
				test: /.s?css$/,
				exclude: /node-modules/,
				use: [MiniCssExtractPlugin.loader, "css-loader"],
			},
			{
				test: /\.(png|svg|jpe?g|gif|webp|ico)$/i,
				type: "asset/resource",
			},
		],
	},
};
