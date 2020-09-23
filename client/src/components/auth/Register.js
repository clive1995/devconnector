import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { setAlert } from "../../action/alert";
import { AuthRegister } from "../../action/auth";
import PropTypes from "prop-types";

const Register = ({ setAlert, AuthRegister, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    fname: "",
    email: "",
    password: "",
    password2: "",
  });
  const { fname, email, password, password2 } = formData;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      setAlert("password does not match", "danger", 2000);
    } else {
      AuthRegister(fname, email, password);
    }
  };
  //Redirect if logedin
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }
  return (
    <div>
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Create Your Account
      </p>
      <form className="form" onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Name"
            name="fname"
            onChange={(e) => onChange(e)}
            value={fname}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            onChange={(e) => onChange(e)}
            value={email}
            name="email"
          />
          <small className="form-text">
            This site uses Gravatar so if you want a profile image, use a
            Gravatar email
          </small>
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => onChange(e)}
            value={password}
            name="password"
            minLength="6"
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            onChange={(e) => onChange(e)}
            value={password2}
            name="password2"
            minLength="6"
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
      <p className="my-1">
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  AuthRegister: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

export default connect(mapStateToProps, { setAlert, AuthRegister })(Register);
