const { prisma } = require('../../lib/prisma');

async function listNews({ locale, page, limit }) {
  const where = {
    isPublished: true,
    ...(locale ? { locale } : {}),
  };
  const skip = (page - 1) * limit;

  const [items, total] = await Promise.all([
    prisma.newsArticle.findMany({
      where,
      orderBy: { publishedAt: 'desc' },
      skip,
      take: limit,
    }),
    prisma.newsArticle.count({ where }),
  ]);

  return {
    items,
    pagination: { page, limit, total },
  };
}

async function createNews({ title, summary, content, source, sourceUrl, locale, publishedAt }) {
  return prisma.newsArticle.create({
    data: {
      title,
      summary,
      content,
      source,
      sourceUrl,
      locale,
      publishedAt: publishedAt || new Date(),
      isPublished: true,
    },
  });
}

async function getNewsById(id) {
  const article = await prisma.newsArticle.findUnique({ where: { id } });
  if (!article || !article.isPublished) {
    throw new Error('News article not found');
  }

  return article;
}

module.exports = {
  listNews,
  createNews,
  getNewsById,
};