const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const htmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const CrittersWebpackPlugin = require("critters-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

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
		new CleanWebpackPlugin(),
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
	],
	module: {
		rules: [
			{
				test: /.s?css$/,
				exclude: /node-modules/,
				use: [
					MiniCssExtractPlugin.loader,
					"css-loader",
					{
						loader: "postcss-loader",
						options: {
							postcssOptions: {
								plugins: ["postcss-preset-env"],
							},
						},
					},
				],
			},
			{
				test: /\.(png|svg|jpe?g|gif|webp|ico)$/i,
				type: "asset/resource",
			},
		],
	},
};
