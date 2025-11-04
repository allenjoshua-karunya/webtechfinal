// import mongoose from "mongoose";

// const userSchema = new mongoose.Schema({
//   username: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   role: { type: String, enum: ["user", "admin"], default: "user" },
// });

// export default mongoose.model("User", userSchema);

import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
email: {
type: String,
required: true,
unique: true,
match: [/^\S+@\S+.\S+$/, "Please enter a valid email address"]
},
password: { type: String, required: true },
role: { type: String, enum: ["user", "admin"], default: "user" },
});

export default mongoose.model("User", userSchema);
