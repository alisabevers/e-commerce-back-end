const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// Localhost:3001//api/tags
// Gets all tags
router.get('/', async (req, res) => {
  try {
    const tags = await Tag.findAll({
      include: [{ model: Product }]
    });
    res.status(200).json(tags);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Localhost:3001//api/tags/:id
// Gets a particular tag
router.get('/:id', async (req, res) => {
  try {
    const tag = await Tag.findOne({
      include: [{ model: Product }]
    });
    res.status(200).json(tag);
  } catch (err) {
    res.status(500).json(err);
  }
});


// Localhost:3001//api/tags
// Creates a new tag
router.post('/', async (req, res) => {
  try {
    const newTag = await Tag.create({
      tag_name: req.body.tag_name,
    });
    res.status(200).json(newTag);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Localhost:3001//api/tags/:id
// Updates an existing tag
router.put('/:id', async (req, res) => {
  try {
    const updatedTag = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(updatedTag);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Localhost:3001//api/tags/:id
// Deletes a tag
router.delete('/:id', async (req, res) => {
  try {
    const deletedTag = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!deletedTag) {
      res.status(404).json({messge: 'No tag found with that id!'});
    }
    
    res.status(200).json(deletedTag);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
