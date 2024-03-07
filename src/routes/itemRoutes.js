const express = require('express');
const router = express.Router();
const Item = require('../models/itemModel');
const authenticate = require('../middleware/authenticate');
const authorize = require('../middleware/authorize');

// router.post('/', authenticate, authorize(['admin']), async (req, res) => {
//     // Your create logic
// });


// Create
router.post('/', async (req, res) => {
    try {
        const item = new Item(req.body);
        await item.save();
        res.status(201).json(item);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Read - all items
router.get('/', async (req, res) => {
    try {
        const items = await Item.find();
        res.json(items);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Read - single item
router.get('/:id', getItem, (req, res) => {
    res.json(res.item);
});

// Update
router.put('/:id', getItem, async (req, res) => {
    try {
        Object.assign(res.item, req.body);
        await res.item.save();
        res.json(res.item);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete
router.delete('/:id', getItem, async (req, res) => {
    try {
        await res.item.remove();
        res.json({ message: 'Item deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

async function getItem(req, res, next) {
    let item;
    try {
        item = await Item.findById(req.params.id);
        if (item === null) {
            return res.status(404).json({ message: 'Item not found' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
    res.item = item;
    next();
}

module.exports = router;
