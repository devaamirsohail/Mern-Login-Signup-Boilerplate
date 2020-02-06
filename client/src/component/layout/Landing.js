import React from "react";

const Landing = () => {
  return (
    <div className="landing">
      <div className="dark-overlay landing-inner text-light">
        <div className="container">
          <div className="row">
            <div className="col-md-12 text-center">
              <h1 className="display-3 mb-4">
                React Node MongoDB Authentication Boilerplate
              </h1>
              <h2>MERN STACK</h2>
              <hr />
              <p className="lead">
                MERN stack login register system with account activation through
                email verification, forgot password, reset password, login with
                google as well as private and protected routes for authorized
                user and users with the role of admin.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Landing;
