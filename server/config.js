const config = {
  mongoURL: process.env.MONGO_URL || 'mongodb://localhost:27017/mern-starter',
  port: process.env.PORT || 8000,
  jira_user: process.env.JIRA_USER,
  jira_pass: process.env.JIRA_PASS,
  aha_whitelist: {
    products: ['6306175175643514248'],
    releases: ['6315436795396888403', '6315436621534391899', '6351047196952083063', '6351046725842285665', '6350718724436196712'],
  },
};

module.exports = config;
