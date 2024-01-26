const path = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const CrittersWebpackPlugin = require("critters-webpack-plugin");

module.exports = {
	entry: {
		index: "./src/js/index.js",
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
		minimizer: ["...", new CssMinimizerPlugin()],
		splitChunks: {
			chunks: "all",
		},
	},
	plugins: [
		new htmlWebpackPlugin({
			filename: "index.html",
			template: "./src/template.html",
		}),
		new MiniCssExtractPlugin(),
		new CrittersWebpackPlugin({
			preload: "swap",
			mergeStylesheets: false,
		}),
	],
	module: {
		rules: [
			{
				test: /.s?css$/,
				use: [MiniCssExtractPlugin.loader, "css-loader"],
			},
			{
				test: /\.(png|jpe?g|gif|webp|ico)$/i,
				type: "asset/resource",
			},
			{
				test: /\.svg/i,
				type: "asset/inline",
			},
		],
	},
};
