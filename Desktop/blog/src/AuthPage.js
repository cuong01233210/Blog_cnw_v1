import React, { useEffect, useState } from "react";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import env from "react-dotenv";
import { gapi } from "gapi-script";
import { useNavigate } from "react-router-dom";

function AuthPage() {
  const navigate = useNavigate();

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId:
          "196742119836-eu1vlot0fiadvp5201kvijoh5ku8b07l.apps.googleusercontent.com",
        scope: "email",
      });
    }

    gapi.load("client:auth2", start);
  }, []);

  const onSuccess = (response) => {
    console.log("SUCCESS", response);
    // Extract email from the response
    const userEmail = response.profileObj.email;
    // Print the login email
    console.log("Logged in with email:", userEmail);
    // Navigate to CreateBlog and pass the email as a parameter
    navigate("/create-blog", { state: { userEmail } });
  };

  const onFailure = (response) => {
    console.log("FAILED", response);
  };

  const onLogoutSuccess = () => {
    console.log("SUCCESS LOG OUT");
  };

  return (
    <div>
      <GoogleLogin
        clientId={
          "196742119836-eu1vlot0fiadvp5201kvijoh5ku8b07l.apps.googleusercontent.com"
        }
        onSuccess={onSuccess}
        onFailure={onFailure}
      />
      <GoogleLogout
        clientId={
          "196742119836-eu1vlot0fiadvp5201kvijoh5ku8b07l.apps.googleusercontent.com"
        }
        onLogoutSuccess={onLogoutSuccess}
      />
    </div>
  );
}

export default AuthPage;
