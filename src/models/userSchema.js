import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";

// const authSchema = new mongoose.Schema({
//   user: { type: String, required: true },
//   email: { type: String, required: true, lowercase: true, unique: true },
//   twoFactors: { type: String, required: true },
//   password: { type: String, required: true, select: false },
//   passwordResetToken: { type: String, select: false },
//   passwordResetExpires: { type: String, select: false },
//   createdAt: { type: Date, default: Date.now },
// });

// authSchema.pre("save", async function (next) {
//   const hash = await bcrypt.hash(this.password, 10);
//   this.password = hash;

//   next();
// });

// export default mongoose.model("Auth", authSchema);

class userModel {
  initSchema() {
    const schema = new Schema({
      user: { type: String, required: true },
      email: { type: String, required: true, lowercase: true, unique: true },
      twoFactors: { type: String, required: true },
      password: { type: String, required: true, select: false },
      passwordResetToken: { type: String, select: false },
      passwordResetExpires: { type: String, select: false },
      createdAt: { type: Date, default: Date.now },
    });
    
    schema.pre("save", async function (next) {
      const hash = await bcrypt.hash(this.password, 10);
      this.password = hash;
    
      next();
    });
    mongoose.model("Auth", schema);
  }

  getInstance() {
    this.initSchema();
    return mongoose.model("Auth");
  }
}

export default userModel;
