import express = require('express');
import characterController = require('../controllers/character.controller');

const { listCharacters } = characterController;
const router = express.Router();

router.get('/characters', listCharacters);

export = router;
