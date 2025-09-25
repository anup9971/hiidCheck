var passwordValidator = require("password-validator");

// Create a schema for passwords
var schema = new passwordValidator();
schema
  .is().min(8)
  .is().max(100)
  .has().uppercase(1)
  .has().lowercase(1)
  .has().digits(1)
  .has().not().spaces()
  .is().not().oneOf([
    "Passw0rd",
    "Password123",
    "Admin123",
    "Admin123456789",
  ]);

export default function FormValidator(e, formData = {}) {
  var { name, value, files } = e.target;

  switch (name) {
    // ---------------- Generic fields ----------------
    case "name":
    case "username":
    case "PropertyGST":
    case "propertyName":
      if (!value || value.length === 0) return name + " Field Is Required";
      else if (value.length < 3 || value.length > 70)
        return name + " Field Length must be 3-50";
      else return "";

    case "phone":
      if (!value || value.length === 0) return name + " Field Is Required";
      else if (value.length !== 10) return name + " Field Length Must Be 10";
      else if (
        value.startsWith("6") ||
        value.startsWith("7") ||
        value.startsWith("8") ||
        value.startsWith("9")
      )
        return "";
      else return "Invalid Phone Number";

    case "email":
      if (!value || value.length === 0) return name + " Is Required";
      else if (value.length < 13 || value.length > 50)
        return name + " Field Length Must Be 13-50";
      else if (value.endsWith(".com") || value.endsWith("@gmail.com"))
        return "";
      else return "Invalid Email Address";

    case "password":
      if (!value || value.length === 0) {
        return "Password is Required";
      } else if (!schema.validate(value)) {
        return "Password must contain at least 1 uppercase, 1 lowercase, 1 digit, no spaces and be 8–100 characters long";
      } else if (/^\d+$/.test(value)) {
        return "Password cannot be only numbers";
      } else {
        return "";
      }

    case "confirmPassword":
      if (!value || value.length === 0) return "Confirm Password is Required";
      else if (formData.password && value !== formData.password)
        return "Password and Confirm Password do not match";
      else return "";

    // ---------------- Room Image Validation ----------------
    case "roomImage":
      if (!files || files.length === 0) return "Room image is required";

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const sizeKB = file.size / 1024;
        const ext = file.name.split(".").pop().toLowerCase();

        if (sizeKB > 500) return "Each image must be less than 500 KB";
        if (!["jpg", "jpeg", "webp"].includes(ext))
          return "Only JPG, JPEG, or WEBP formats are allowed";
      }
      return "";

    // ---------------- Hotel Form Validation ----------------
    case "hotel_name":
    case "hotel_address":
      if (!value || value.trim() === "") return name + " is required";
      else if (value.length < 3) return name + " must be at least 3 characters";
      else return "";

    case "starting_price":
      if (!value || value.trim() === "") return "Starting price is required";
      else if (Number(value) <= 0) return "Starting price must be greater than 0";
      else return "";

    case "rating":
      if (!value || value === "") return "Rating is required";
      else if (!["1", "2", "3", "4", "5"].includes(value))
        return "Select a valid rating";
      else return "";

    case "hotel_Description":
      if (!value || value.trim() === "") return "Description is required";
      else if (value.length < 10) return "Description must be at least 10 characters";
      else return "";

    case "hotelImage":
      if (!files || files.length === 0) return "Hotel image is required";

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const sizeKB = file.size / 1024;
        const ext = file.name.split(".").pop().toLowerCase();

        if (sizeKB > 200) return "Each hotel image must be less than 200 KB";
        if (ext !== "webp") return "Only WEBP format is allowed for hotel images";
      }
      return "";

    default:
      return "";
  }
}

// 🔑 Full form validation helper
export function validateFormData(formData) {
  let errors = {};
  for (let key in formData) {
    let fakeEvent = { target: { name: key, value: formData[key], files: formData[key] instanceof Array ? formData[key] : null } };
    let error = FormValidator(fakeEvent, formData);
    if (error) errors[key] = error;
  }
  return errors;
}
