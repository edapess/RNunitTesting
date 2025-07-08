 module.exports = {
      presets: [
        ['@babel/preset-env', { targets: { node: 'current' } }],
        '@babel/preset-react', // If you are using React
        '@babel/preset-typescript', // If you are using TypeScript
        //'module:@react-native/babel-preset'
        "babel-preset-expo"
      ],
    };