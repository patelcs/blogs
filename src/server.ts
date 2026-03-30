import { CWD, NODE_ENV, PORT } from '#configs';
import express from 'express';
import path from 'path';
import ejs from 'ejs';
import fs from 'fs';
import type { Blog } from './types/blogs.js';

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(CWD, 'views'));
app.use(express.static(path.join(CWD, 'public')));

const blogsPath = path.join(CWD, 'blogs.json');
const blogs: Blog[] = JSON.parse(fs.readFileSync(blogsPath, 'utf-8'));

const renderStaticIfProduction = (filename: string, html: string) => {
    if (NODE_ENV !== 'production') return;
    const outputPath = path.join(CWD, 'public', filename);
    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    fs.writeFileSync(outputPath, html);
};

app.get(['/', '/blogs'], async (req, res) => {
    console.log("rendering blogs index");
    const html = await ejs.renderFile(path.join(CWD, 'views', 'index.ejs'), { blogs });
    res.send(html);
    renderStaticIfProduction('index.html', html);
});

app.get('/blogs/:slug', async (req, res) => {
    const blog = blogs.find((item) => item.slug === req.params.slug);
    if (!blog) {
        res.status(404).send('Blog not found');
        return;
    }

    const html = await ejs.renderFile(path.join(CWD, 'views', 'blogs', 'post.ejs'), { blog });
    res.send(html);
    renderStaticIfProduction(path.join('blogs', `${blog.slug}.html`), html);
});

app.listen(PORT, (error) => {
    if (error) console.error(error);
    else console.log(`Blogs app listening on port ${PORT}`);
})
