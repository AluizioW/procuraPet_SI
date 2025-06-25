const express = require('express');
const router = express.Router();
const {
    registrarUsuario,
    loginUsuario,
    getMeuPerfil
} = require('../controllers/userController'); 
const { protect, authorize } = require('../middleware/authMiddleware'); 

router.post('/registrar', registrarUsuario);
router.post('/login', loginUsuario);
router.get('/meuperfil', protect, getMeuPerfil);

module.exports = router;