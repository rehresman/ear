const siteConfig = require('./site-config');

module.exports = {
	siteMetadata: {
		...siteConfig,
	},
	plugins: [
		`gatsby-plugin-react-helmet`,
		`gatsby-plugin-sitemap`,
		`gatsby-plugin-offline`,
		`gatsby-transformer-json`,
		`gatsby-transformer-remark`,
		`gatsby-plugin-eslint`,
		{
			resolve: `gatsby-source-filesystem`,
			options: {
				name: `content`,
				path: `${__dirname}/content`,
			},
		},
		`gatsby-plugin-sharp`,
		`gatsby-transformer-sharp`,
		`gatsby-plugin-webpack-size`,
		{
			resolve: `gatsby-plugin-react-svg`,
			options: {
				rule: {
					include: /images\/.*\.svg$/,
				},
			},
		},
		{
			resolve: `gatsby-plugin-prefetch-google-fonts`,
			options: {
				fonts: [
					{
						family: `Karla`,
						subsets: [`latin`],
						variants: [`400`],
					},
					{
						family: `Lato`,
						subsets: [`latin`],
						variants: [`400`],
					},
				],
			},
		},
		{
			resolve: `gatsby-plugin-styled-components`,
			options: {
				// Add any options here
			},
		},
		{
			resolve: `gatsby-plugin-s3`,
			options: {
				bucketName: 'ear-training',
			},
		},
	],
};
