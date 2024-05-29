// Create web server
// Create a route to handle comments
// Create a route to handle post requests
// Create a route to handle delete requests
// Create a route to handle put requests
// Create a route to handle patch requests

const express = require('express');
const comments = require('./comments.json');
const fs = require('fs');
const app = express();

app.use(express.json());

app.get('/comments', (req, res) => {
    res.status(200).send(comments);
});

app.post('/comments', (req, res) => {
    const newComment = req.body;
    comments.push(newComment);
    fs.writeFile('./comments.json', JSON.stringify(comments), (err) => {
        if (err) {
            res.status(500).send('Unable to add comment');
        } else {
            res.status(201).send(newComment);
        }
    });
});

app.delete('/comments/:id', (req, res) => {
    const commentId = req.params.id;
    const commentIndex = comments.findIndex(comment => comment.id === commentId);
    if (commentIndex === -1) {
        res.status(404).send('Comment not found');
    } else {
        comments.splice(commentIndex, 1);
        fs.writeFile('./comments.json', JSON.stringify(comments), (err) => {
            if (err) {
                res.status(500).send('Unable to delete comment');
            } else {
                res.status(200).send('Comment deleted');
            }
        });
    }
});

app.put('/comments/:id', (req, res) => {
    const commentId = req.params.id;
    const updatedComment = req.body;
    const commentIndex = comments.findIndex(comment => comment.id === commentId);
    if (commentIndex === -1) {
        res.status(404).send('Comment not found');
    } else {
        comments.splice(commentIndex, 1, updatedComment);
        fs.writeFile('./comments.json', JSON.stringify(comments), (err) => {
            if (err) {
                res.status(500).send('Unable to update comment');
            } else {
                res.status(200).send(updatedComment);
            }
        });
    }
});

app.patch('/comments/:id', (req, res) => {
    const commentId = req.params.id;
    const updatedComment = req.body;
    const commentIndex = comments.findIndex(comment => comment.id === commentId);
    if (commentIndex === -1) {
        res.status(404).send('Comment not found');
    } else {
        comments[commentIndex] = { ...comments[commentIndex], ...updatedComment };
        fs.writeFile('./comments.json', JSON.stringify(comments), (err) => {
            if (err) {
                res.status(500).send('Unable to update comment');
            } else {
                res.status(200).send(comments[commentIndex]);
            }
        });
    } 
});