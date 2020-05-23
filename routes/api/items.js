const express = require('express');
const router = express.Router();




const Item = require('../../models/Item');

//Routes

//Get all times
router.get('/', (req, res) => {
  Item.find()
  .sort({date: -1})
  .then(items => res.json(items));
});

router.post('/', (req, res) => {
  newItem = new Item({
    name: req.body.name
  });

  newItem.save().then(function(req, res){
    res.json(item);
  });
});


router.delete("/:id", (req, res) => {
  Item.findById(req.params.id)
  .then(item => item.remove().then(() => res.json({success: true})))
  .catch(err => res.status(404).json({success: false}));
});

module.exports = router;
