import React from "react";
import { Link, withRouter } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../../actions/authActions";

const Navbar = ({ history }) => {
  const user = useSelector(state => state.auth.user);
  const auth = useSelector(state => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const authLinks = (
    <ul className="navbar-nav ml-auto">
      <li className="nav-item">
        {user && user.role === "admin" && (
          <Link className="nav-link" to="/admin">
            {user.name}
          </Link>
        )}
        {user && user.role === "subscriber" && (
          <Link className="nav-link" to="/subscriber">
            {user.name}
          </Link>
        )}
      </li>
      <li className="nav-item">
        <Link
          className="nav-link"
          to="/"
          onClick={() => {
            dispatch(logoutUser());
          }}
        >
          Signout
        </Link>
      </li>
    </ul>
  );
  const guestLinks = (
    <ul className="navbar-nav ml-auto">
      <li className="nav-item">
        <Link className="nav-link" to="/signup">
          Sign Up
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/signin">
          Login
        </Link>
      </li>
    </ul>
  );
  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
      <div className="container">
        <Link className="navbar-brand" to="/">
          Home
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#mobile-nav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="mobile-nav">
          {auth ? authLinks : guestLinks}
        </div>
      </div>
    </nav>
  );
};
export default withRouter(Navbar);
