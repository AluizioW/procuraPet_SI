const express = require('express');
const router = express.Router();
const {
    registrarUsuario,
    loginUsuario,
    activateUsuario,
    getMeuPerfil,
    deleteUsuario
} = require('../controllers/userController'); 
const { protect, authorize } = require('../middleware/authMiddleware'); 

router.post('/registrar', registrarUsuario);
router.post('/login', loginUsuario);
router.put('/activate', protect, activateUsuario);
router.get('/meuperfil', protect, getMeuPerfil);
router.patch('/delete', protect, deleteUsuario);

module.exports = router;