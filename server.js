const express = require('express');
const app = express();
const PORT = 3001;

app.use(express.json()); // Middleware to parse JSON bodies

// In-memory "database" for simplicity
let items = [];

// CRUD Operations

// Create
app.post('/items', (req, res) => {
    const item = { id: items.length + 1, ...req.body };
    items.push(item);
    res.status(201).send(item);
});

// Read - all items
app.get('/items', (req, res) => {
    res.status(200).send(items);
});

// Read - single item
app.get('/items/:id', (req, res) => {
    const item = items.find(i => i.id === parseInt(req.params.id));
    if (!item) res.status(404).send('Item not found');
    else res.status(200).send(item);
});

// Update
app.put('/items/:id', (req, res) => {
    const item = items.find(i => i.id === parseInt(req.params.id));
    if (!item) {
        res.status(404).send('Item not found');
    } else {
        const index = items.indexOf(item);
        items[index] = { ...item, ...req.body };
        res.status(200).send(items[index]);
    }
});

// Delete
app.delete('/items/:id', (req, res) => {
    const item = items.find(i => i.id === parseInt(req.params.id));
    if (!item) {
        res.status(404).send('Item not found');
    } else {
        items = items.filter(i => i.id !== parseInt(req.params.id));
        res.status(204).send();
    }
});

// Starting the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
