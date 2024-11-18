const express = require("express");
const connectDb = require("./database");
const urlRoutes = require("./api/urls/urls.routes");
const userRoutes = require("./api/users/users.routes");
const notFoundHandler = require("./middlewares/notFoundHandler");
const errorHandler = require("./middlewares/errorHandler");
const passport = require("passport");//
require("./middleware/passport");//
const app = express();
connectDb();

app.use(express.json());

app.use("/urls", urlRoutes);
app.use(userRoutes);

app.use(notFoundHandler);
app.use(errorHandler);
app.use(passport.initialize()); //
//q16
app.post('/signin', passport.authenticate('local', { session: false }), (req, res) => {
  // Step 1: Generate token for user after successful authentication
  const token = generateToken(req.user); // Pass user from passport middleware

  // Step 2: Send the token in response
  res.json({ token });
});


app.listen(8000, () => {
  console.log("The application is running on localhost:8000");
});
