const express = require('express')
const router = express.Router();

// returns usage spec
router.get('/', (req, res) => {
    res.send('deCODE API')
})

module.exports = router;