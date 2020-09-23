import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import { Link } from "react-router-dom";
//import {} from '../../action/auth'
import DashboardAction from "./dashboardAction";
import { getCurrentProfile } from "../../action/profile";
const Dashboard = ({
  getCurrentProfile,
  auth: { user },
  profile: { profile, loading },
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, []);
  return loading ? (
    <Spinner />
  ) : (
    <div>
      <h1 className="large text-primary">Dashboard</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Welcome {user ? user.name : null}
      </p>
      {profile != null ? (
        <DashboardAction profile={profile} />
      ) : (
        <div>
          <p>You have not setup a profile, Please add some Info</p>
          <Link to="/create-profile">Create profile</Link>
        </div>
      )}
    </div>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);
