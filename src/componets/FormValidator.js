var passwordValidator = require('password-validator');

// Create a schema
var schema = new passwordValidator();

// Add properties to it
schema
.is().min(8)                                    // Minimum length 8
.is().max(100)                                  // Maximum length 100
.has().uppercase()                              // Must have uppercase letters
.has().lowercase()                              // Must have lowercase letters
.has().digits(2)                                // Must have at least 2 digits
.has().not().spaces()                           // Should not have spaces
.is().not().oneOf(['Passw0rd', 'Password123']); // Blacklist these values

 export default function FormValidator(e){
     var {name, value}= e.target;
    switch(name){
        case "name":
            if(!value || value.length ===0)
                return name + " Field Is Required"
            else if( value.length <3 || value. length >50)
                return  name+ "Field Length must be 3-50"
            else  return ""
        
        case "phone":
            if(!value || value.length ===0)
                return name + "Field Is Requried "
            else if (value.length !== 10) 
                 return name + "Field Length Must Be 1-10";
            else if(
                value.startsWith("6")||
                value.startsWith("7")||
                value.startsWith("8")||
                value.startsWith("9")

            )
            return ""
            else "Invalid Phone Number"

        case "email":
          if (!value || value.length === 0) return name + " is Mandatory";
          else if (value.length < 13 || value.length > 50)
            return name + "Field Length Must Be 13-50";
          else if(
            value.endsWith(".com") ||
            value.endsWith("@gmail.com")
          ) return ""
           else return "";

    }
 }