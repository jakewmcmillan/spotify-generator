// Check if user is logged in, if not redirect them to login page
const withAuth = (req, res, next) => {
  if (!req.session.user_id) {
    res.redirect("/login");
  } else {
    next();
  }
};

// Export withAuth
module.exports = withAuth;
