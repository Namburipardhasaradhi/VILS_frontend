module.exports = {
    transform: {
      "^.+\\.(js|jsx|ts|tsx)$": "babel-jest", // Use babel-jest for transforming files
    },
    transformIgnorePatterns: [
      "/node_modules/(?!axios)/", // Transform axios and other necessary modules
    ],
    testEnvironment: "jsdom", // Use jsdom for React testing environment
  };
  