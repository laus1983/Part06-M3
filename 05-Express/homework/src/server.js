// const bodyParser = require("body-parser");
const express = require("express");

const STATUS_USER_ERROR = 422;

// This array of posts persists in memory across requests. Feel free
// to change this to a let binding if you need to reassign it.
let posts = [];

const server = express();
// to enable parsing of json bodies for post requests
server.use(express.json());

// TODO: your code to handle requests

const PATH = '/posts';

let id = 0;

server.post(PATH, (req, res) => {
    const {author, title, contents} = req.body;
    if (!author || !title || !contents) {
        return res.status(STATUS_USER_ERROR).json({error: "No se recibieron los parámetros necesarios para crear el Post"});
    }
    const post = {
        id: id++, author, title, contents
    };
    posts.push(post);
    res.status(200).json(post);
});

server.post(`${PATH}/author/:author`, (req, res) => {
    const {author} = req.params;
    const {title, contents} = req.body;
    if (!author || !title || !contents) {
        return res.status(STATUS_USER_ERROR).json({error: "No se recibieron los parámetros necesarios para crear el Post"});
    }
    const post = {
        id: id++, author, title, contents
    };
    posts.push(post);
    res.status(200).json(post);
});

server.get(PATH, (req, res) => {
    const {term} = req.query;
    if (term) {
        const filteredPosts = posts.filter(e => e.title.includes(term) || e.contents.includes(term));
        return res.status(200).json(filteredPosts);
    }
    res.status(200).json(posts);
});

server.get(`${PATH}/:author`, (req, res) => {
    const {author} = req.params;
    const authorPosts = posts.filter(e => e.author === author);
    if (authorPosts.length === 0) {
        return res.status(STATUS_USER_ERROR).json({error: "No existe ningun post del autor indicado"});
    }
    res.status(200).json(authorPosts);
});

server.get(`${PATH}/:author/:title`, (req, res) => {
    const {author, title} = req.params;
    if (author && title){
        const newPost = posts.filter(e => e.author === author && e.title === title);
        if (newPost.length > 0) {
            res.status(200).json(newPost);
        } else {
        res.status(STATUS_USER_ERROR).json({error: "No existe ningun post con dicho titulo y autor indicado"});
        }
    } else {
        res.status(STATUS_USER_ERROR).json({error: "No existe ningun post con dicho titulo y autor indicado"});
    }
});

server.put(PATH, (req, res) => {
    const {id, title, contents} = req.body;
    if (id && title && contents) {
        const filteredPosts = posts.find(e => e.id === parseInt(id));
        if (filteredPosts) {
            filteredPosts.title = title;
            filteredPosts.contents = contents;
            res.status(200).json(filteredPosts);
        } else {
            res.status(STATUS_USER_ERROR).json({error: "No existe ningun post con el id indicado"});
        }
    } else {
        res.status(STATUS_USER_ERROR).json({error: "No se recibieron los parámetros necesarios para modificar el Post"});
    }
});

server.delete(PATH, (req, res) => {
    const {id} = req.body;
    const post = posts.find(e => e.id === parseInt(id));
    if (!id || !post) {
        return res.status(STATUS_USER_ERROR).json({error: "No se recibieron los parámetros necesarios para eliminar el Post"});
    }
    posts = posts.filter(e => e.id !== parseInt(id));
    res.status(200).json({success: true});
});

server.delete('/author', (req, res) => {
    const {author} = req.body;
    const authorPost = posts.find(e => e.author === author);
    if (!author || !authorPost) {
        return res.status(STATUS_USER_ERROR).json({error: "No existe el autor indicado"});
    }
    let deletePosts = [];
    deletePosts = posts.filter(e => e.author === author);
    posts = posts.filter(e => e.author !== author);
    res.status(200).json(deletePosts);
});


module.exports = { posts, server };
