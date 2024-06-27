module.exports = {
  apps: [
    {
      name: "app",
      script: "./www/app.js",
      max_memory_restart: "200M",
      log_file: "./logs/err.log",
      env_production: {
        NODE_ENV: "production",
      },
    },
  ],
};
