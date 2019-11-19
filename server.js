import express from 'express';

const app = express();
const port = 3000 || env.port;

app.use(express.static('dist', { extensions: ['html'] }));

app.listen(port, () => console.log(`http://localhost:${port}`));
