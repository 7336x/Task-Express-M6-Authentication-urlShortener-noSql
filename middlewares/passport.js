const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const { User } = require("../models"); // Import User model

// Step 3: Create localStrategy instance
const localStrategy = new LocalStrategy(
  {
    usernameField: "username", // Make sure it matches your front-end field name
  },
  async (username, password, done) => {
    try {
      // Step 6: Look for user in the User model
      const user = await User.findOne({ username });

      // Step 9: Compare password if user exists
      if (user) {
        const passwordsMatch = await bcrypt.compare(password, user.password);

        if (passwordsMatch) {
          // Step 12: If passwords match, pass user to done
          return done(null, user);
        }
      }

      // Step 13: If passwords don't match or user doesn't exist
      return done(null, false);
    } catch (error) {
      // Step 5: Catch any errors
      return done(error);
    }
  }
);

// Step 15: Use localStrategy
passport.use(localStrategy);
