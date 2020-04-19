module.exports = {
  apps : [{
    name: 'DART-DISCLOSURE',
    script: './dist/app.js',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '256M',
    env: {
      NODE_ENV: 'development',
      APP_KEY: 'DART-DISCLOSURE',
    },
    env_production: {
      NODE_ENV: 'production',
      APP_KEY: 'DART-DISCLOSURE',
    }
  }, {
    name: 'PROCESS2',
    script: './dist/app.js',
    args: 'one two',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '256M',
    env: {
      NODE_ENV: 'development',
      TEST: 'HELLO WORLD',
      BANANA: 'BANANA',
    },
    env_production: {
      NODE_ENV: 'production',
      TEST: 'HELLO WORLD',
      BANANA: 'BANANA',
    }
  }],

  deploy : {
    production : {
      user : 'node',
      host : '212.83.163.1',
      ref  : 'origin/master',
      repo : 'git@github.com:repo.git',
      path : '/var/www/production',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production'
    }
  }
};
