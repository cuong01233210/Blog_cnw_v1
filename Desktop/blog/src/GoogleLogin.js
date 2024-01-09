import React from "react";
import { GoogleLogin } from "react-google-login";

const GoogleLoginComponent = ({ handleLogin }) => {
  const clientId =
    "196742119836-eu1vlot0fiadvp5201kvijoh5ku8b07l.apps.googleusercontent.com";

  const onSuccess = (response) => {
    handleLogin(response);
  };

  const onFailure = (error) => {
    handleLogin(null, error);
  };

  return (
    <GoogleLogin
      clientId={clientId}
      buttonText="Login with Google"
      onSuccess={onSuccess}
      onFailure={onFailure}
      cookiePolicy={"single_host_origin"}
    />
  );
};

export default GoogleLoginComponent;
