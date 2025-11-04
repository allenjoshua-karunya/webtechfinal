// import React, { useState } from "react";
// import axios from "../api/axios";
// import { useNavigate } from "react-router-dom";
// import "../styles/Login.css";

// function Login() {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const { data } = await axios.post("/auth/login", { username, password });
//       localStorage.setItem("token", data.token);
//       localStorage.setItem("role", data.user.role);
//       if (data.user.role === "admin") navigate("/admin/dashboard");
//       else navigate("/userhome");
//     } catch (err) {
//       alert(err.response?.data?.message || "Login failed");
//     }
//   };

//   return (
//     <div className="auth-container">
//       <div className="auth-box">
//         <h2>Welcome Back</h2>
//         <form onSubmit={handleLogin}>
//           <input
//             type="text"
//             placeholder="Username"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             required
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//           <button type="submit">Login</button>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default Login;

import React, { useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";

function Login() {
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const navigate = useNavigate();

const handleLogin = async (e) => {
e.preventDefault();
try {
if (!/\S+@\S+.\S+/.test(email)) {
alert("Enter a valid email address");
return;
}


  const { data } = await axios.post("/auth/login", { email, password });
  localStorage.setItem("token", data.token);
  localStorage.setItem("role", data.user.role);

  if (data.user.role === "admin") navigate("/admin/dashboard");
  else navigate("/userhome");
} catch (err) {
  alert(err.response?.data?.message || "Login failed");
}


};

return ( <div className="auth-container"> <div className="auth-box"> <h2>Welcome Back</h2> <form onSubmit={handleLogin}>
<input
type="email"
placeholder="Email"
value={email}
onChange={(e) => setEmail(e.target.value)}
required
/>
<input
type="password"
placeholder="Password"
value={password}
onChange={(e) => setPassword(e.target.value)}
required
/> <button type="submit">Login</button> </form> </div> </div>
);
}

export default Login;
