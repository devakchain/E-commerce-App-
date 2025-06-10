import React, { useEffect } from "react";
import { logout } from "../services/userServices";

function LogOut() {
  useEffect(() => {
    logout();
    window.location = "/";
  }, []);
  return null;
}

export default LogOut;
