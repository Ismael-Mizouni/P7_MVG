const express = require("express");
const booksCtrl = require("../controllers/bookController");
const auth = require("../middleware/auth.js");
const multer = require("../middleware/multer-config");
const router = express.Router();

// Import path construction chemin fichier image
const path = require("path");

router.get("/", booksCtrl.getAllBooks);

router.get("/bestrating", booksCtrl.getBestRating);

router.get("/:id", booksCtrl.getBookById);

// route pour récupérer une image
router.get("/images/:filename", (req, res) => {
  const filename = req.params.filename;
  const imagePath = path.join(__dirname, "../images/", filename);

// méthode pour envoyer le fichier
  res.sendFile(imagePath);
});

router.post("/", auth, multer, booksCtrl.addBook);

router.put("/:id", auth, multer, booksCtrl.modifyBook);

router.delete("/:id", auth, booksCtrl.deleteBook);

router.post("/:id/rating", auth, booksCtrl.rateBook);

module.exports = router;
