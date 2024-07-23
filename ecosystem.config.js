module.exports = {
  apps: [
    {
      name: 'NuxtApp',
      exec_mode: 'fork',
      script: './server/index.mjs',
      port: 3000,
    },
  ],
};
