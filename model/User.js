const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  // values: educator/guardian
  uType: {
    type: String,
    required: true
  }
  
});

// export model user with UserSchema
module.exports = mongoose.model("user", UserSchema);
