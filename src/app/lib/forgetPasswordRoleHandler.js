import User from "../model/User";

import Owner from "../model/Owner";

export function forgetPasswordRoleHandler(role) {
  switch (role) {
    case "User":
      return User;
    // case "Admin":
    //   return Admin;
    case "Owner":
      return Owner;
    default:
      throw new Error("Invalid Role");
  }
}
