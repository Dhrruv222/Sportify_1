const { getPresignedUploadUrl } = require('./media.service');
const { sendEmail } = require('./email.service');
const { fetchNewsFeed } = require('./news.service');

module.exports = {
  getPresignedUploadUrl,
  sendEmail,
  fetchNewsFeed,
};
