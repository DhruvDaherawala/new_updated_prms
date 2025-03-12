// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import Swal from "sweetalert2";
// export function SignIn() {
//   const API_URL = import.meta.env.VITE_API_URL;
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();
//   useEffect(() => {
//     console.log("Checking token:", localStorage.getItem("token"));
//     if (localStorage.getItem("token")) {
//       navigate("/");
//     }
//   }, [navigate]);
//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post(`${API_URL}auth/login`, { username, password });
//       localStorage.setItem("token", res.data.token);
//       Swal.fire({
//         title: "Login Successful!",
//         text: "You are being redirected to the dashboard.",
//         icon: "success",
//         timer: 2500,
//         showConfirmButton: false,
//       });
//       navigate("/");
//     } catch (error) {
//       Swal.fire({
//         title: "Login Failed!",
//         text: error.response?.data?.message || "Invalid credentials.",
//         icon: "error",
//         confirmButtonText: "Try Again",
//       });
//     }
//   };
//   return (
//     <section className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
//       <div className="w-96 p-6 rounded-lg shadow-lg bg-white border border-gray-300">
//         <div className="text-center mb-6">
//           <h4 className="text-2xl font-bold text-gray-800">Admin Login</h4>
//           <p className="text-sm text-gray-600">Manage rentals, track Properties, and more.</p>
//         </div>
//         <form className="space-y-4" onSubmit={handleLogin}>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Username
//             </label>
//             <input
//               type="text"
//               placeholder="Enter your username"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               className="w-full px-3 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring focus:border-blue-300"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Password
//             </label>
//             <input  
//               type="password"
//               placeholder="********"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="w-full px-3 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring focus:border-blue-300"
//             />
//           </div>
//           <button
//             type="submit"
//             className="w-full py-2 mt-4 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 focus:outline-none focus:ring"
//           >
//             Sign In
//           </button>
//         </form>
//       </div>
//     </section>
//   );
// }
// export default SignIn;



import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

export function SignIn() {
  const API_URL = import.meta.env.VITE_API_URL;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/dashboard/default", { replace: true });
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_URL}auth/login`, { username, password });
      localStorage.setItem("token", res.data.token);
      Swal.fire({
        title: "Login Successful!",
        text: "You are being redirected to the dashboard.",
        icon: "success",
        timer: 2500,
        showConfirmButton: false,
      });
      navigate("/dashboard/default", { replace: true });
    } catch (error) {
      Swal.fire({
        title: "Login Failed!",
        text: error.response?.data?.message || "Invalid credentials.",
        icon: "error",
        confirmButtonText: "Try Again",
      });
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="w-96 p-6 rounded-lg shadow-lg bg-white border border-gray-300">
        <div className="text-center mb-6">
          <h4 className="text-2xl font-bold text-gray-800">Admin Login</h4>
          <p className="text-sm text-gray-600">Manage rentals, track Properties, and more.</p>
        </div>
        <form className="space-y-4" onSubmit={handleLogin}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
            <input
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input  
              type="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 mt-4 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 focus:outline-none focus:ring"
          >
            Sign In
          </button>
        </form>
      </div>
    </section>
  );
}

export default SignIn;
