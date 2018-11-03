const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  telephone: { type: String, required: true },
  location: { type: String, required: true },
  businessRole: { type: String, required: true },
  joiningReason: { type: String, required: true },
  companyName: { type: String, required: true },
  type: { type: String, required: true }
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
