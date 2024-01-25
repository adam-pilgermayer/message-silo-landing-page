const path = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const CrittersWebpackPlugin = require("critters-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
	entry: {
		index: "./src/js/index.js",
	},
	devtool: "inline-source-map",
	devServer: {
		static: "./dist",
	},
	output: {
		filename: "[name].bundle.js",
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
				cache: true,
				parallel: true,
				sourceMap: true,
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
			title: "Message Silo",
			inject: "body",
		}),
		new MiniCssExtractPlugin(),
		new CrittersWebpackPlugin({
			preload: "media",
			mergeStylesheets: false,
			pruneSource: false,
		}),
	],
	module: {
		rules: [
			{
				test: /.s?css$/,
				use: [MiniCssExtractPlugin.loader, "css-loader"],
			},
			{
				test: /\.(png|svg|jpe?g|gif|webp|ico)$/i,
				type: "asset/resource",
			},
		],
	},
};
