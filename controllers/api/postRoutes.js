const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../../utils/auth');

// router.post('/post', withAuth, async (req, res) => {
//   console.log(req.body)
//   try {
//     const newPost = await Post.create({
//       ...req.body,
//       userId: req.session.user_id,
//     });

//     res.status(200).json(newPost);
//   } catch (err) {
//     res.status(400).json(err);
//   }
// });

router.post('/post', withAuth, async (req, res) => {
  const body = req.body;
    console.log(body);
  try {
    const newPost = await Post.create({ ...body, userId: req.session.user_id });
    console.log("Here is the new post: ",  newPost);
    res.json(newPost);
     } catch (err) {
       console.log('IT FAILED!', err);
    res.status(500).json(err);
  }
});

module.exports = router;