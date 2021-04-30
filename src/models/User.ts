import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcryptjs";

export interface IUser extends Document {
  user: string;
  email: string;
  twoFactors: string;
  password: string;
  passwordResetToken?: string;
  passwordResetExpires?: string;
  createdAt: Date;
}

const UserSchema = new Schema({
  user: { type: String, required: true },
  email: { type: String, required: true, lowercase: true, unique: true },
  twoFactors: { type: String, required: true },
  password: { type: String, required: true, select: false },
  passwordResetToken: { type: String, select: false },
  passwordResetExpires: { type: String, select: false },
  createdAt: { type: Date, default: Date.now },
});

UserSchema.pre<IUser>("save", async function (next) {
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;

  next();
});

export default mongoose.model<IUser>("Auth", UserSchema);
