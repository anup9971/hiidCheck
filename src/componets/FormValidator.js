// var passwordValidator = require('password-validator');

// // Create a schema
// var schema = new passwordValidator();

// // Add properties to it
// schema
//   .is().min(8)                                   // Minimum length 8
//   .is().max(100)                                 // Maximum length 100
//   .has().uppercase(1)                            // Must have uppercase letters
//   .has().lowercase(1)                            // Must have lowercase letters
//   .has().digits(1)                               // Must have at least 1 digit
//   .has().not().spaces()                          // Should not have spaces
//   .is().not().oneOf(['Passw0rd', 'Password123', 'Admin123', 'Admin123456789']); // Blacklist these values

// export default function FormValidator(e, formData = {}) {
//   var { name, value } = e.target;

//   switch (name) {
//     case "name":
//     case "username":
//     case "PropertyGST":
//     case "propertyName":
//       if (!value || value.length === 0)
//         return name + " Field Is Required";
//       else if (value.length < 3 || value.length > 70)
//         return name + " Field Length must be 3-50";
//       else return "";

//     case "phone":
//       if (!value || value.length === 0)
//         return name + " Field Is Required";
//       else if (value.length !== 10)
//         return name + " Field Length Must Be 10";
//       else if (
//         value.startsWith("6") ||
//         value.startsWith("7") ||
//         value.startsWith("8") ||
//         value.startsWith("9")
//       )
//         return "";
//       else return "Invalid Phone Number";

//     case "email":
//       if (!value || value.length === 0) return name + " Is Required";
//       else if (value.length < 13 || value.length > 50)
//         return name + " Field Length Must Be 13-50";
//       else if (
//         value.endsWith(".com") ||
//         value.endsWith("@gmail.com")
//       )
//         return "";
//       else return "Invalid Email Address";

//     case "password":
//       if (!value || value.length === 0) return "Password is Required";
//       else if (!schema.validate(value))
//         return "Password must contain at least 1 uppercase, 1 lowercase, 1 digit, no spaces and be 8–100 characters long";
//       else return "";

//     case "confirmPassword":
//       if (!value || value.length === 0) return "Confirm Password is Required";
//       else if (formData.password && value !== formData.password)
//         return "Password and Confirm Password do not match";
//       else return "";

//     default:
//       return "";
//   }
// }










var passwordValidator = require("password-validator");

// Create a schema
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
  var { name, value } = e.target;

  switch (name) {
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
      if (!value || value.length === 0) return "Password is Required";
      else if (!schema.validate(value))
        return "Password must contain at least 1 uppercase, 1 lowercase, 1 digit, no spaces and be 8–100 characters long";
      else return "";

    case "confirmPassword":
      if (!value || value.length === 0) return "Confirm Password is Required";
      else if (formData.password && value !== formData.password)
        return "Password and Confirm Password do not match";
      else return "";

    default:
      return "";
  }
}

// 🔑 Helper for full form validation
export function validateFormData(formData) {
  let errors = {};
  for (let key in formData) {
    let fakeEvent = { target: { name: key, value: formData[key] } };
    let error = FormValidator(fakeEvent, formData);
    if (error) errors[key] = error;
  }
  return errors;
}
