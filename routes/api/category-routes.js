const router = require('express').Router();
const { Category, Product } = require('../../models');

// Localhost:3001/api/categories
// Gets all categories
router.get('/', async (req, res) => {
  try {
    const categories = await Category.findAll({
      include: [{ model: Product }]
    });
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Localhost:3001/api/categories/:id
// Gets a particular category
router.get('/:id', async (req, res) => {
  try {
    const category = await Category.findOne({
      include: [{ model: Product }]
    });
    res.status(200).json(category)
  } catch (err) {
    res.status(500).json(err);
  }
});


// Localhost:3001/api/categories
// Creates a new category
router.post('/', async (req, res) => {
  try {
    const newCategory = await Category.create({
      id: req.body.id,
      category_name: req.body.category_name,
    });
    res.json(newCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Localhost:3001/api/categories/:id
// Updates a particular category
router.put('/:id', async (req, res) => {
  try {
    const updatedCategory = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(updatedCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Localhost:3001/api/categories/:id
// Deletes a particular category
router.delete('/:id', async (req, res) => {
  try {
    const deletedCategory = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(deletedCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
