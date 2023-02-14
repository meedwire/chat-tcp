module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    ['@babel/plugin-proposal-decorators', {legacy: true}],
    [
      'module-resolver',
      {
        alias: {
          '@screens': './src/screens',
          '@client': './src/client',
          '@server': './src/server',
          '@store': './src/store',
          '@types': './src/commonTypes',
          '@entities': './src/entities',
          '@components': './src/components',
        },
      },
    ],
    ['react-native-reanimated/plugin'],
  ],
};
