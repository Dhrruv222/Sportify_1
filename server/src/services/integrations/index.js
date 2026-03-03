const { getPresignedUploadUrl } = require('./media.service');
const { sendEmail } = require('./email.service');
const { computeScoutScoreFromAI } = require('./ai.service');

module.exports = {
  getPresignedUploadUrl,
  sendEmail,
  computeScoutScoreFromAI,
};
