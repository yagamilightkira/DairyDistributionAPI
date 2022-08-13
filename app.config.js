
module.exports = {
    apps : [{
      name   : "MilkDistributor-Main",
      script : "./main.js",
      env: {
        NODE_ENV: "development",
      },
      env_production: {
        NODE_ENV: "production",
      }
    }]
  }
  