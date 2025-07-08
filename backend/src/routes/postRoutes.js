const express = require('express');
const router = express.Router();

const postController = require("../controllers/postController");

router.get('/:id', postController.getPostagem)
router.post('/', postController.criarPostagem);
router.put('/:id', postController.editarPostagem);
router.put('/:id', postController.excluirPostagemLogico);

module.exports = router;