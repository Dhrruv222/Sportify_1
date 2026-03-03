const express = require('express');

const { validateBody, validateQuery } = require('../../middlewares/validate');
const { requireInternalApiKey } = require('../../middlewares/auth');
const {
  listNewsQuerySchema,
  createNewsSchema,
  ingestNewsSchema,
  enqueueNewsSchema,
  newsIdParamSchema,
} = require('./news.schema');
const {
  listNews,
  createNews,
  getNewsById,
  ingestNews,
  enqueueIngestNews,
} = require('./news.controller');

const router = express.Router();

router.get('/', validateQuery(listNewsQuerySchema), listNews);
router.post('/', validateBody(createNewsSchema), createNews);
router.post('/internal/ingest', requireInternalApiKey, validateBody(ingestNewsSchema), ingestNews);
router.post('/internal/enqueue', requireInternalApiKey, validateBody(enqueueNewsSchema), enqueueIngestNews);
router.get('/:id', (req, res, next) => {
  const parsed = newsIdParamSchema.safeParse(req.params);
  if (!parsed.success) {
    return res.status(400).json({
      success: false,
      error: parsed.error.issues.map((issue) => issue.message).join(', '),
    });
  }

  req.params = parsed.data;
  next();
}, getNewsById);

module.exports = router;