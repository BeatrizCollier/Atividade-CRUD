const express = require('express');
const ClienteController = require('../controllers/index');

const router = express.Router();


router.post("/orcamento", ClienteController.criar);

router.put("/orcamento/:id", ClienteController.editar);

router.get("/orcamento", ClienteController.listar);
router.get("/orcamento/:matricula", ClienteController.listarPorId);

router.delete("/orcamento", ClienteController.excluirTodos);
router.delete("/orcamento/:id", ClienteController.excluirPorId);


module.exports = router