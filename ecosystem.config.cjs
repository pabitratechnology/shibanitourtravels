module.exports = {
  apps: [
    {
      name: 'shibani-travels',
      cwd: '/var/www/shibanitourtravels/backend',
      script: 'node_modules/.bin/tsx',
      args: 'server.ts',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '500M',
      env: {
        NODE_ENV: 'production',
        PORT: 5050 // Change if 5050 is occupied on your server
      }
    }
  ]
};
