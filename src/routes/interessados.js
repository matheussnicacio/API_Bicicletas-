const express = require('express');
const router = express.Router();
const controller = require('../controllers/interessadoController');
const authenticate = require('../middlewares/authMiddleware');

router.get('/', controller.list);
router.get('/:id', controller.getOne);
router.post('/', authenticate, controller.create);
router.put('/:id', authenticate, controller.update);
router.delete('/:id', authenticate, controller.remove);
router.get('/:id/escolhas', controller.listEscolhas);

module.exports = router;
