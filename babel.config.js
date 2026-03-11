module.exports = {
  presets: ['babel-preset-expo'],
  plugins: [
    [
      'module-resolver',
      {
      root: [
        './src'
      ],
      extensions: [
        '.ios.js',
        '.android.js',
        '.js',
        '.ts',
        '.tsx',
        '.json'
      ],
      alias: {
        '@mmkv': './src/mmkv',
        '@i18n': './src/i18n',
        '@components': './src/components',
        '@screens': './src/screens',
        '@theme': './src/theme',
        '@env/env': './src/env/env.js',
        '@auth': './src/auth',
        '@hooks': './src/hooks'
      }
    }
    ]
  ],
};
