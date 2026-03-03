const app = require('./app');
const { startNewsIngestionWorker } = require('./modules/news/news.queue');

const PORT = process.env.PORT || 3000;

startNewsIngestionWorker();

app.listen(PORT, () => {
  console.log(`Running in port ${PORT}`);
});
