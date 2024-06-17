const express = require('express');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
    const server = express();

    // Маршруты для каждого домена
    server.get('/', (req, res) => {
        return app.render(req, res, '/', req.query);
    });

    server.get('/domain1', (req, res) => {
        return app.render(req, res, '/domain1', req.query);
    });

    server.get('/domain2', (req, res) => {
        return app.render(req, res, '/domain2', req.query);
    });

    // Статический контент (например, из папки content/)
    server.use(express.static('content'));

    // Обработка всех остальных запросов с помощью Next.js
    server.all('*', (req, res) => {
        return handle(req, res);
    });

    server.listen(3000, (err) => {
        if (err) throw err;
        console.log('> Ready on http://localhost:3000');
    });
}).catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
});
