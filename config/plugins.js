module.exports = ({ env }) => ({
  upload: {
    config: {
      provider: 'local',
      providerOptions: {},
      sizeLimit: 1000000, // 1MB
    },
  },
});