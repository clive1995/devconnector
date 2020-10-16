import React from "react";
import { withRouter } from "react-router-dom";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
const Landing = ({ history, auth }) => {
  const { isAuthenticated } = auth;
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <section className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1 className="x-large">Developer Connector</h1>
          <p className="lead">
            Create a developer profile/portfolio, share posts and get help from
            other developers
          </p>
          <div className="buttons">
            <button
              onClick={() => history.push("/register")}
              className="btn btn-primary"
            >
              Sign Up
            </button>
            <button
              onClick={() => history.push("/login")}
              className="btn btn-light"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, {})(withRouter(Landing));
