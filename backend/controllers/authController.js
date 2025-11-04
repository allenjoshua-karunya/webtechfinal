// import User from "../models/User.js";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";

// export const register = async (req, res) => {
//   try {
//     const { username, password } = req.body;
//     const existingUser = await User.findOne({ username });
//     if (existingUser)
//       return res.status(400).json({ message: "Username already exists" });

//     const hashedPassword = await bcrypt.hash(password, 10);
//     const user = await User.create({
//       username,
//       password: hashedPassword,
//       role: "user",
//     });

//     res.status(201).json({ message: "User registered successfully" });
//   } catch (err) {
//     res.status(500).json({ message: "Server error", error: err.message });
//   }
// };

// export const login = async (req, res) => {
//   try {
//     const { username, password } = req.body;
//     const user = await User.findOne({ username });
//     if (!user) return res.status(400).json({ message: "Invalid username" });

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(400).json({ message: "Invalid password" });

//     const token = jwt.sign(
//       { id: user._id, role: user.role },
//       process.env.JWT_SECRET,
//       { expiresIn: "1d" }
//     );

//     res.json({
//       token,
//       user: {
//         role: user.role,
//         username: user.username,
//       },
//     });

//   } catch (err) {
//     res.status(500).json({ message: "Server error", error: err.message });
//   }
// };

import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
try {
const { email, password } = req.body;
const existingUser = await User.findOne({ email });
if (existingUser)
return res.status(400).json({ message: "Email already exists" });

```
const hashedPassword = await bcrypt.hash(password, 10);
await User.create({
  email,
  password: hashedPassword,
  role: "user",
});

res.status(201).json({ message: "User registered successfully" });
```

} catch (err) {
res.status(500).json({ message: "Server error", error: err.message });
}
};

export const login = async (req, res) => {
try {
const { email, password } = req.body;
const user = await User.findOne({ email });
if (!user) return res.status(400).json({ message: "Invalid email" });

```
const isMatch = await bcrypt.compare(password, user.password);
if (!isMatch) return res.status(400).json({ message: "Invalid password" });

const token = jwt.sign(
  { id: user._id, role: user.role },
  process.env.JWT_SECRET,
  { expiresIn: "1d" }
);

res.json({
  token,
  user: {
    role: user.role,
    email: user.email,
  },
});
```

} catch (err) {
res.status(500).json({ message: "Server error", error: err.message });
}
};
