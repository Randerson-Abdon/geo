module.exports = {
  apps: [
    {
      name: "app-geo",
      script: "yarn",
      args: "start",
      watch: false,
      env: {
        NODE_ENV: "production"
      }
    }
  ]
};
