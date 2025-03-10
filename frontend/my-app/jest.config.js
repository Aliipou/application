module.exports = {
  transform: {
    "^.+\\.[t|j]sx?$": "babel-jest", // Transform both JavaScript and JSX files
    "^.+\\node_modules\\axios.+$": "babel-jest", // Ensure axios is transformed by Babel
  },
  transformIgnorePatterns: [
    "/node_modules/(?!axios)/", // Do not ignore axios in node_modules
  ],
  moduleNameMapper: {
    '^axios$': require.resolve('axios'), // Ensure axios is properly mapped
  },
};
