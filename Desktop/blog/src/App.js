import React, { useEffect } from "react";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import env from "react-dotenv";
import { gapi } from "gapi-script";

<script src="https://apis.google.com/js/api.js"></script>;
function AuthPage() {
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

  // **you can access the token like this**
  // const accessToken = gapi.auth.getToken().access_token;
  // console.log(accessToken);

  const onSuccess = (response) => {
    console.log("SUCCESS", response);
  };
  const onFailure = (response) => {
    console.log("FAILED", response);
  };
  const onLogoutSuccess = () => {
    console.log("SUCESS LOG OUT");
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
