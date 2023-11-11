import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import Jwt  from "jsonwebtoken";

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: {
    type: String,
    required: [true, "passwor is required"],
    select: false,
  },
  lastName: {
    type: String,
    default: "lastName",
  },
  location: {
    type: String,
    default: "my city",
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
    },
  
//   avatar: String,
//   avatarPublicId: String,
});

// password encryption before saving it
UserSchema.pre("save", async function (next)  {
  // if password is not modified keep going
  if (!this.isModified("password")) {
    return next;
  }

  // if password is  modified  we need to encrypt it

  try {
    this.password = await bcrypt.hash(this.password, 10);
    next();
  } catch (error) {
    next(error);
  }
});





UserSchema.methods = {
    comparepass: async function (pass) {
        return await bcrypt.compare(pass, this.password)
    }
    ,
    getJWTtoken: function () {
        return Jwt.sign({ _id: this._id }, process.env.SECRET, { expiresIn: '24h' })

    }
}



const User = mongoose.model("User", UserSchema);

export { User };
