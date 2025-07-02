const express = require('express');
const router = express.Router();

const postController = require("../controllers/postController");

router.get('/:id', postController.getPostagem)
router.post('/', postController.criarPostagem);
router.put('/:id', postController.editarPostagem);
router.delete('/:id', postController.excluirPostagemLogico);

module.exports = router;