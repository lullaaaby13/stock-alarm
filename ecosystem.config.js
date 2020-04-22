module.exports = {
  apps : [{
    name: 'DART-DISCLOSURE',
    script: './dist/app.js',
    instances: 1,
    autorestart: true,
    watch: true,
    max_memory_restart: '256M',
    log_date_format: 'YYYY-MM-DD HH:mm:ss.SSS',
    env: {
      NODE_ENV: 'development',
      APP_KEY: 'DART-DISCLOSURE',
    },
    env_production: {
      NODE_ENV: 'production',
      APP_KEY: 'DART-DISCLOSURE',
    }
  }, {
    name: 'SLACK-MESSAGE-SENDER',
    script: './dist/SlackMessageSender.js',
    instances: 1,
    autorestart: true,
    watch: true,
    max_memory_restart: '256M',
    log_date_format: 'YYYY-MM-DD HH:mm:ss.SSS',
    env: {
      NODE_ENV: 'development',
      BOT_TOKEN: '',
    },
    env_production: {
      NODE_ENV: 'production',
      BOT_TOKEN: '',
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
