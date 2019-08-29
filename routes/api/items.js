const express = require('express');
const Item = require('../../models/Item');
const auth = require('../../middleware/auth');

const router = new express.Router();

//  @route GET api/items
// @desc get All Items
// @access Public
router.get('/', async (req, res) => {
  try {
    const items = await Item.find().sort({ date: -1 });
    res.status(200).json(items);
  } catch (error) {
    res.status(400).json({ success: false });
  }
});

//  @route POST api/items
// @desc create an item
// @access Private
router.post('/', auth, async (req, res) => {
  const newItem = new Item(req.body);
  try {
    const response = await newItem.save();
    if (!res) {
      throw new Error();
    }
    res.status(201).json(response);
  } catch (error) {
    res.status(400).json({ success: false });
  }
});

//  @route DELETE api/items
// @desc delete an item
// @access Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const id = req.params.id;
    const response = await Item.findByIdAndDelete(id);
    if (!response) {
      throw new Error();
    }
    res.status(200).json({
      success: true
    });
  } catch (error) {
    res.status(404).json({ success: false });
  }
});

module.exports = router;
