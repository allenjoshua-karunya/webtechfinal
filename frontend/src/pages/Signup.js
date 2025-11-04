// import React, { useState } from "react";
// import axios from "../api/axios";
// import { useNavigate } from "react-router-dom";
// import "../styles/Signup.css";

// function Signup() {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const handleSignup = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post("/auth/register", { username, password });
//       alert("Signup successful! You can now log in.");
//       navigate("/login");
//     } catch (err) {
//       alert(err.response?.data?.message || "Signup failed");
//     }
//   };

//   return (
//     <div className="auth-container">
//       <div className="auth-box">
//         <h2>Create Your Account</h2>
//         <form onSubmit={handleSignup}>
//           <input
//             type="text"
//             placeholder="Choose a Username"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             required
//           />
//           <input
//             type="password"
//             placeholder="Create a Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//           <button type="submit">Sign Up</button>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default Signup;

import React, { useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";
import "../styles/Signup.css";

function Signup() {
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const navigate = useNavigate();

const handleSignup = async (e) => {
e.preventDefault();
try {
if (!/\S+@\S+.\S+/.test(email)) {
alert("Enter a valid email address");
return;
}


  await axios.post("/auth/register", { email, password });
  alert("Signup successful! You can now log in.");
  navigate("/login");
} catch (err) {
  alert(err.response?.data?.message || "Signup failed");
}


};

return ( <div className="auth-container"> <div className="auth-box"> <h2>Create Your Account</h2> <form onSubmit={handleSignup}>
<input
type="email"
placeholder="Enter Your Email"
value={email}
onChange={(e) => setEmail(e.target.value)}
required
/>
<input
type="password"
placeholder="Create a Password"
value={password}
onChange={(e) => setPassword(e.target.value)}
required
/> <button type="submit">Sign Up</button> </form> </div> </div>
);
}

export default Signup;
