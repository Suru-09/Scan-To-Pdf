module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
    'react-native-reanimated/plugin', // This should always be LAST
      // (CAUSES Export namespace should be first transformed by `@babel/plugin-proposal-export-namespace-from`.)!
    ],
  };
};
