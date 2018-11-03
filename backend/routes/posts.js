const express = require('express');
const multer = require('multer');

const Post = require('../models/post');

const MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg':'jpg'
};

const storage = multer.diskStorage({
  destination: (req,file,cb) => {
    cb(null,"backend/images");
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(' ').join('-');
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + '-' + Date.now() + '.' + ext);
  }
});

const app = express.Router();

app.post("/",multer({storage: storage}).single("image"),(req,res,next)=>{
  const url = req.protocol + '://' + req.get("host");
  const post = new Post({

    title: req.body.title,
    content: req.body.content,
    imagePath: url + '/images/' + req.file.filename
  });

  post.save().then((result) => {
    res.status(201).json({
      message: 'Post success',
      post: {
        id: result._id,
        title: result.title,
        content: result.content,
        imagePath: result.imagePath
      }
     });
  });

  console.log(post);

});

app.get("/",(req,res,next)=>{
  console.log('First Middleware');
  /*const posts = [
    {
      id: "afadfadgh",
      title: "reguest from backend",
      content: "Some content from backend"
    },
    {
      id: "afhtjtjkjy",
      title: "reguest from backend 2",
      content: "Some content from backend 2"
    }
  ];*/

  Post.find().then( documents => {
    res.status(200).json({
      message: 'Post fetched',
      posts: documents
    });
  });

});

app.delete('/:id',(req, res, next) => {
  console.log(req.params.id);
  Post.deleteOne({_id: req.params.id})
  .then((result) => {
    console.log('Deleted sucessfully');
    res.status(200).json({message: "Post Deleted"});
  });
});

app.put("/:id",(req,res,next) => {
  const post = new Post({
    _id: req.body._id,
    title: req.body.title,
    content: req.body.content
  });
  Post.updateOne({_id: req.params.id}, post).then(result => {
    console.log(result);
    res.status(200).json({message:"Update Successful"});
  });
});

module.exports = app;
