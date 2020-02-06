import React from "react";
import GoogleLogin from "react-google-login";
import { useDispatch } from "react-redux";

import { googleLoginUser } from "../../actions/authActions";
import { withRouter } from "react-router-dom";

const Google = ({ history }) => {
  const dispatch = useDispatch();
  const responseGoogle = response => {
    //console.log(response.tokenId);
    const idToken = response.tokenId;
    dispatch(googleLoginUser({ idToken }, history));
  };
  return (
    <div className="pb-3">
      <GoogleLogin
        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
        render={renderProps => (
          <button
            onClick={renderProps.onClick}
            disabled={renderProps.disabled}
            style={{ backgroundColor: "#f50057", color: "#ffffff" }}
            className="btn btn-lg btn-block"
          >
            <i className="fab fa-google pr-2" /> Login with Google
          </button>
        )}
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={"single_host_origin"}
      />
    </div>
  );
};
export default withRouter(Google);
