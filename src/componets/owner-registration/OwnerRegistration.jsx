// "use client";

// import { useState } from "react";
// import Link from "next/link";
// import FormValidator from "../FormValidator";
// import { useRouter } from "next/navigation";
// import toast from "react-hot-toast";

// export default function OwnerRegistration() {
//   const [regData, setRegData] = useState({
//     name: "",
//     email: "",
//     username: "",
//     phone: "",
//     password: "",
//     PropertyGST: "",
//     propertyName: "",
//     roomQuantity: "",
//     startingPrice: "",
//     address: "",
//     pic: null,
//   });

//   const router = useRouter();
//   const [show, setShow] = useState(false);
//   const [errorMessage, setErrorMessage] = useState({
//     name: "Name Field Is Required",
//     email: "Email Field Is Required",
//     phone: "Phone Field Is Required",
//     password: "Password Field Is Required",
//     username: "Username Field Is Required",
//     PropertyGST: "Property GST Field Is Required",
//     propertyName: "Property Name Field Is Required",
//     roomQuantity: "Room Quantity Field Is Required",
//     startingPrice: "Room Starting Price Field Is Required",
//     address: "Address Field Is Required",
//   });

//   const handleInputData = (e) => {
//     let { name, value } = e.target;
//     setErrorMessage((x) => ({
//       ...x,
//       [name]: FormValidator(e),
//     }));
//     setRegData((y) => ({
//       ...y,
//       [name]: value,
//     }));
//   };

//   const handlepostData = async (e) => {
//     e.preventDefault();
//     try {
//       let error = Object.values(errorMessage).find((a) => a !== "");
//       if (error) {
//         setShow(true);
//         return;
//       }

//       let res = await fetch("/api/owner", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(regData),
//       });

//       const result = await res.json();
//       if (!res.ok) throw new Error(result.message || `Failed: ${res.status}`);

//       localStorage.setItem("token", result.token);
//       toast.success("Registration successful!");
//       router.push("/login-owner");
//     } catch (error) {
//       console.error("❌ Error:", error);
//     }
//   };

//   return (
//     <div className="flex items-center justify-center mt-[-4px] pt-20 text-black pb-25  min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-4">
//       <div className="bg-white p-10 rounded-2xl shadow-lg w-full max-w-5xl">
//         <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
//           Owner Registration
//         </h2>

//         <form
//           onSubmit={handlepostData}
//           className="grid grid-cols-1 md:grid-cols-2 gap-6"
//         >
//           {/* Left Column */}
//           <div>
//             <label className="block mb-1 font-medium">Full Name *</label>
//             <input
//               type="text"
//               name="name"
//               placeholder="Enter full name"
//               onChange={handleInputData}
//               className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-[#5f8575]"
//             />
//             {show && errorMessage.name && (
//               <p className="text-red-500 text-sm">{errorMessage.name}</p>
//             )}
//           </div>

//           <div>
//             <label className="block mb-1 font-medium">Username *</label>
//             <input
//               type="text"
//               name="username"
//               placeholder="Enter username"
//               onChange={handleInputData}
//               className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-[#5f8575]"
//             />
//             {show && errorMessage.username && (
//               <p className="text-red-500 text-sm">{errorMessage.username}</p>
//             )}
//           </div>

//           <div>
//             <label className="block mb-1 font-medium">Email *</label>
//             <input
//               type="email"
//               name="email"
//               placeholder="Enter email"
//               onChange={handleInputData}
//               className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-[#5f8575]"
//             />
//             {show && errorMessage.email && (
//               <p className="text-red-500 text-sm">{errorMessage.email}</p>
//             )}
//           </div>

//           <div>
//             <label className="block mb-1 font-medium">Phone *</label>
//             <input
//               type="number"
//               name="phone"
//               placeholder="Enter phone number"
//               onChange={handleInputData}
//               className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-[#5f8575]"
//             />
//             {show && errorMessage.phone && (
//               <p className="text-red-500 text-sm">{errorMessage.phone}</p>
//             )}
//           </div>

//           <div>
//             <label className="block mb-1 font-medium">Room Quantity *</label>
//             <input
//               type="text"
//               name="roomQuantity"
//               placeholder="Enter room quantity"
//               onChange={handleInputData}
//               className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-[#5f8575]"
//             />
//           </div>

//           <div>
//             <label className="block mb-1 font-medium">Starting Price *</label>
//             <input
//               type="text"
//               name="startingPrice"
//               placeholder="Enter starting price"
//               onChange={handleInputData}
//               className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-[#5f8575]"
//             />
//           </div>

//           <div>
//             <label className="block mb-1 font-medium">Property Name *</label>
//             <input
//               type="text"
//               name="propertyName"
//               placeholder="Enter property name"
//               onChange={handleInputData}
//               className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-[#5f8575]"
//             />
//           </div>

//           <div>
//             <label className="block mb-1 font-medium">Address *</label>
//             <input
//               type="text"
//               name="address"
//               placeholder="Enter address"
//               onChange={handleInputData}
//               className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-[#5f8575]"
//             />
//           </div>

//           <div>
//             <label className="block mb-1 font-medium">Property GST *</label>
//             <input
//               type="text"
//               name="PropertyGST"
//               placeholder="Enter GST number"
//               onChange={handleInputData}
//               className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-[#5f8575]"
//             />
//           </div>

//           <div>
//             <label className="block mb-1 font-medium">Password *</label>
//             <input
//               type="password"
//               name="password"
//               placeholder="Enter password"
//               onChange={handleInputData}
//               className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-[#5f8575]"
//             />
//           </div>

//           <div className="md:col-span-2">
//             <button
//               type="submit"
//               className="w-full  text-white py-3 rounded-lg  bg-[#5f8575] hover:bg-[#4d886f] transition font-medium shadow-md"
//             >
//               Register
//             </button>
//           </div>
//         </form>

//         <p className="mt-6 text-center text-sm">
//           Already have an account?{" "}
//           <Link href="/login-owner" className="text-blue-600 hover:underline">
//             Login
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// }


"use client";

import { useState } from "react";
import Link from "next/link";
import FormValidator from "../FormValidator";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function OwnerRegistration() {
  const [regData, setRegData] = useState({
    name: "",
    email: "",
    username: "",
    phone: "",
    password: "",
    PropertyGST: "",
    propertyName: "",
    roomQuantity: "",
    startingPrice: "",
    address: "",
    pic: null, // image file
  });

  const router = useRouter();
  const [show, setShow] = useState(false);
  const [errorMessage, setErrorMessage] = useState({
    name: "Name Field Is Required",
    email: "Email Field Is Required",
    phone: "Phone Field Is Required",
    password: "Password Field Is Required",
    username: "Username Field Is Required",
    PropertyGST: "Property GST Field Is Required",
    propertyName: "Property Name Field Is Required",
    roomQuantity: "Room Quantity Field Is Required",
    startingPrice: "Room Starting Price Field Is Required",
    address: "Address Field Is Required",
  });

  const handleInputData = (e) => {
    const { name, value, files } = e.target;

    if (name === "pic") {
      setRegData((prev) => ({ ...prev, pic: files[0] }));
    } else {
      setErrorMessage((x) => ({
        ...x,
        [name]: FormValidator(e),
      }));
      setRegData((y) => ({
        ...y,
        [name]: value,
      }));
    }
  };

  const handlepostData = async (e) => {
    e.preventDefault();
    try {
      let error = Object.values(errorMessage).find((a) => a !== "");
      if (error) {
        setShow(true);
        return;
      }

      const formData = new FormData();
      Object.keys(regData).forEach((key) => {
        formData.append(key, regData[key]);
      });

      const res = await fetch("/api/owner", {
        method: "POST",
        body: formData,
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.message || `Failed: ${res.status}`);

      localStorage.setItem("token", result.token);
      toast.success("Registration successful!");
      router.push("/login-owner");
    } catch (error) {
      console.error("❌ Error:", error);
    }
  };

  return (
    <div className="flex items-center justify-center mt-[-4px] pt-20 text-black pb-25 min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-4">
      <div className="bg-white p-10 rounded-2xl shadow-lg w-full max-w-5xl">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
          Owner Registration
        </h2>

        <form
          onSubmit={handlepostData}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          encType="multipart/form-data"
        >
          {/* Full Name */}
          <div>
            <label className="block mb-1 font-medium">Full Name *</label>
            <input
              type="text"
              name="name"
              placeholder="Enter full name"
              onChange={handleInputData}
              className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-[#5f8575]"
            />
            {show && errorMessage.name && (
              <p className="text-red-500 text-sm">{errorMessage.name}</p>
            )}
          </div>

          {/* Username */}
          <div>
            <label className="block mb-1 font-medium">Username *</label>
            <input
              type="text"
              name="username"
              placeholder="Enter username"
              onChange={handleInputData}
              className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-[#5f8575]"
            />
            {show && errorMessage.username && (
              <p className="text-red-500 text-sm">{errorMessage.username}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block mb-1 font-medium">Email *</label>
            <input
              type="email"
              name="email"
              placeholder="Enter email"
              onChange={handleInputData}
              className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-[#5f8575]"
            />
            {show && errorMessage.email && (
              <p className="text-red-500 text-sm">{errorMessage.email}</p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label className="block mb-1 font-medium">Phone *</label>
            <input
              type="number"
              name="phone"
              placeholder="Enter phone number"
              onChange={handleInputData}
              className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-[#5f8575]"
            />
            {show && errorMessage.phone && (
              <p className="text-red-500 text-sm">{errorMessage.phone}</p>
            )}
          </div>

          {/* Property GST */}
          <div>
            <label className="block mb-1 font-medium">Property GST *</label>
            <input
              type="text"
              name="PropertyGST"
              placeholder="Enter GST number"
              onChange={handleInputData}
              className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-[#5f8575]"
            />
          </div>

          {/* Property Name */}
          <div>
            <label className="block mb-1 font-medium">Property Name *</label>
            <input
              type="text"
              name="propertyName"
              placeholder="Enter property name"
              onChange={handleInputData}
              className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-[#5f8575]"
            />
          </div>

          {/* Room Quantity */}
          <div>
            <label className="block mb-1 font-medium">Room Quantity *</label>
            <input
              type="text"
              name="roomQuantity"
              placeholder="Enter room quantity"
              onChange={handleInputData}
              className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-[#5f8575]"
            />
          </div>

          {/* Starting Price */}
          <div>
            <label className="block mb-1 font-medium">Starting Price *</label>
            <input
              type="text"
              name="startingPrice"
              placeholder="Enter starting price"
              onChange={handleInputData}
              className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-[#5f8575]"
            />
          </div>

          {/* Address */}
          <div>
            <label className="block mb-1 font-medium">Address *</label>
            <input
              type="text"
              name="address"
              placeholder="Enter address"
              onChange={handleInputData}
              className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-[#5f8575]"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block mb-1 font-medium">Password *</label>
            <input
              type="password"
              name="password"
              placeholder="Enter password"
              onChange={handleInputData}
              className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-[#5f8575]"
            />
          </div>

          {/* Property Image */}
          <div className="md:col-span-2">
            <label className="block mb-1 font-medium">Profile Image *</label>
            <input
              type="file"
              name="pic"
              accept="image/*"
              onChange={handleInputData}
              className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-[#5f8575]"
            />
            {regData.pic && (
              <img
                src={URL.createObjectURL(regData.pic)}
                alt="Preview"
                className="mt-2 w-32 h-32 object-cover rounded-lg border"
              />
            )}
          </div>

          {/* Submit Button */}
          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full text-white py-3 rounded-lg bg-[#5f8575] hover:bg-[#4d886f] transition font-medium shadow-md"
            >
              Register
            </button>
          </div>
        </form>

        <p className="mt-6 text-center text-sm">
          Already have an account?{" "}
          <Link href="/login-owner" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
