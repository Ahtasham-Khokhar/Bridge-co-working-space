import { Document, Model, Schema } from "mongoose";
import bcrypt from "bcrypt";
import mongoose from "mongoose";

export interface ILogin extends Document {
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  comparePassword: (password: string) => Promise<boolean>;
}

const LoginSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        "Please provide a valid email address"
      ]
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 digits"],
      select: false
    }
  },
  { timestamps: true }
);

// ✅ async hooks don't need next() — Mongoose awaits the returned promise
LoginSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  // Your Logic to hash password (e.g. bcrypt) goes here
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password as string, salt);
});

LoginSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch {
    throw new Error("Password does not match");
  }
};

const Login: Model<ILogin> =
  mongoose.models.User || mongoose.model<ILogin>("User", LoginSchema, "user");

export default Login;