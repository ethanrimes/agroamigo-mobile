module.exports = function(api) {
    api.cache(true);
  
    return {
      presets: ['babel-preset-expo'],
      plugins: [
        // Removed 'nativewind/babel'
        ['module-resolver', {
          root: ["./"],
          alias: {
            "@": "./",
            "tailwind.config": "./tailwind.config.js"
          }
        }],
        // ✅ Required for expo-router to work correctly
        'expo-router/babel'
      ],
      env: {
        production: {
          plugins: ['react-native-paper/babel']
        }
      }
    };
  };
  