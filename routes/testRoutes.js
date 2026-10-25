const express = require('express');
const { testingController } = require('../controllers/testController');
const router = express.Router();

// routes
router.get("/", testingController )

// export
module.exports = router;