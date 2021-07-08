const express = require('express');
const router = express.Router();
const userController = require('../controllers/users')
const User = require('../models/users');
const checkAuth = require("../middleware/check-auth");
const extractFile = require('../middleware/file');
const multer = require('multer');
const bcrypt = require('bcrypt');
const Users = require('../models/users');

const DIR = './images/';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename : (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(' ').join('-');
    cb(null, fileName)  }
});

var upload = multer({
    storage: storage,
    limits: {
      fileSize: 1024 * 1024 * 5
    },
    fileFilter: (req, file, cb) => {
      if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
        cb(null, true);
      } else {
        cb(null, false);
        return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
      }
    }
  });

router.post('/authentication', userController.authentication);
router.get('/getuser', userController.getuser);
router.get('/getidUser/:id', userController.getidUser);
router.get('/getuserDetail/:email', userController.getuserDetail);
router.delete('/deleteuser/:id', userController.deleteuser);
// router.post('/adduser', extractFile, userController.adduser);
// router.put('/edituser/:id',extractFile, userController.edituser);

router.post('/adduser', upload.single('img') , (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then(hash => {
    const url = req.protocol + '://' + req.get('host')
    const data = req.body;
    const saltRounds = 10;
    const user = new Users({
      email: req.body.email,
      password: hash,
      name: req.body.name,
      tel: req.body.tel,
      age: req.body.age,
      sex: req.body.sex,
      lifestyle: req.body.lifestyle,
      educational: req.body.educational,
      faculty: req.body.faculty,
      year: req.body.year,
      facebook: req.body.facebook,
      instagram: req.body.instagram,
      other: req.body.other,
      // img: req.body.img
      img: url + '/images/' + req.file.filename
    });
    console.log(user);
    console.log();
    user.save(user).then(data => {
      res.send("Add User success")
    }).catch(err => {
      console.log(err),
      res.send(err)
    })
  });
});

router.put('/edituser/:id', upload.single('img') , (req, res, next) => {
  let imagePath = req.body.img;
  const url = req.protocol + '://' + req.get('host')
  console.log('File : ', req.file);
  if (req.file) {
      const url = req.protocol + "://" + req.get("host");
      imagePath = url + "/images/" + req.file.filename;
      console.log(imagePath);
  } else {
      const url = req.protocol + "://" + req.get("host");
      imagePath = req.body.img;
      console.log(imagePath);
  }
  const id = req.params.id;
  if (!req.body) {
      res.send("Not found data")
  }
  const user = {
      email: req.body.email,
      // password: hash,
      name: req.body.name,
      tel: req.body.tel,
      age: req.body.age,
      sex: req.body.sex,
      lifestyle: req.body.lifestyle,
      educational: req.body.educational,
      faculty: req.body.faculty,
      year: req.body.year,
      facebook: req.body.facebook,
      instagram: req.body.instagram,
      other: req.body.other,
      img: url + '/images/' + req.file.filename,
  }
  Users.findByIdAndUpdate(id, user, { useFindAndModify: false }, (err, result) => {
      if (err) {
          throw err
      } else {
          res.status(200).send(result)
      }
  })
} );
// router.post('/login', userController.login);

const passport = require('passport');
const users = require('../models/users');



// router.get('/google', passport.authenticate('google', { scope: ['profile'] }))
// router.get('/google', (req, res) => {
//         res.send('google');
//         console.log('goooooo');
//     })
// @desc    Google auth callback
// @route   GET /auth/google/callback

// @desc    Logout user
// @route   /auth/logout
router.get('/logout', (req, res) => {
    req.logout()
    res.redirect('/')
})

module.exports = router;