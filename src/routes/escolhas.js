const express = require('express');
const router = express.Router();
const controller = require('../controllers/escolhaController');
const authenticate = require('../middlewares/authMiddleware');

router.get('/', authenticate, controller.list);
router.get('/:id', authenticate, controller.getOne);
router.post('/', authenticate, controller.create);
router.delete('/:id', authenticate, controller.remove);

module.exports = router;
