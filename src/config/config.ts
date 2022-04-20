export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  database: {
    uri: process.env.DB_URI,
  },
  auth: {
    secret: process.env.SECRET,
  },

  aws: {
    region: process.env.AWS_REGION,
    credentials: {
      accessKeyId: process.env.AWS_ID,
      secretAccessKey: process.env.AWS_SECRET,
    },
  },
})
