module.exports = {
  plugins: [
    require('postcss-import')({path: 'src'}),
    require('postcss-nested'),
    require('postcss-custom-media'),
    require('postcss-flexbugs-fixes'),
    require('postcss-css-variables'),
    require('postcss-preset-env')({
      autoprefixer: {
        flexbox: 'no-2009',
      },
      stage: 3,
    }),
  ]
}
