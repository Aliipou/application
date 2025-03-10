module.exports = {
  presets: [
    "@babel/preset-env", // Transpile modern JavaScript
    "@babel/preset-react" // Transpile JSX
  ],
  overrides: [
    {
      test: /node_modules[\\\/]axios/,
      presets: ['@babel/preset-env'],
    },
  ],
};
