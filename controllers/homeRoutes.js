const router = require('express').Router();
const { Post, User } = require('../models');
const withAuth = require('../utils/auth');

// Login Route
router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login', {
    style: "signup.css"
  });
});

// Signup Route
router.get('/signup', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('signup', {
    style: "signup.css"
  });
});

// This takes you to profile
router.get('/', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Post }],
    });

    // const postData = await Post.findAll({
    //   include: [
    //     {
    //       model: User,
    //       attributes: ['username'],
    //     },
    //   ],
    // })

    const user = userData.get({ plain: true });
    // const posts = postData.map((post) => post.get({ plain: true }));

    res.render('profile', {
      ...user,
      // posts,
      loggedIn: true,
      style: 'newpoststyles.css'
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

router.get('/destinations/post/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [{ 
          model: User,  
          attributes: ['username'],
        },
      ],
    });

    const posts = postData.get({ plain: true });
    res.status(200).json(posts);

    // res.render('profile', {
    //   ...posts,
    //   logged_in: req.session.logged_in
    // });
  } catch (err) {
    res.status(500).json(err);
  }
});




// Original '/' Route
// router.get('/', (req, res) => {
//   // If the user is already logged in, redirect the request to another route
//   if (req.session.logged_in) {
//     res.redirect('/profile');
//     return;
//   }
  
//   res.render('homepage');
// });

// Original Profile Route
// // Use withAuth middleware to prevent access to route
// router.get('/profile', withAuth, async (req, res) => {
//   try {
//     // Find the logged in user based on the session ID
//     const userData = await User.findByPk(req.session.user_id, {
//       attributes: { exclude: ['password'] },
//       include: [{ model: Post }],
//     });
//     const postData = await Post.findAll({
//       include: [
//         {
//           model: User,
//           attributes: ['name'],
//         },
//       ],
//     })

//     const user = userData.get({ plain: true });
//     const posts = postData.map((project) => posts.get({ plain: true }));

//     res.render('profile', {
//       ...user,
//       posts,
//       logged_in: true
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });