const path = require('path');
const express = require("express");
const router = express.Router();

// Home page
router.get("/", (req, res) => {
  var image = req.param('image');
  req.query.image = image;
  console.log ('Image inside route '+ image); 
  res.render("terminal",{
        image: image});
//res.sendFile(path.join(__dirname, '.', 'index.html'));
});


module.exports = router;
