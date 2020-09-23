import React from "react";
import { Link } from "react-router-dom";
import Experience from "./Experience";
import Education from "./Education";
import { deleteProfile } from "../../action/profile";
import { connect } from "react-redux";
export const DashboardAction = ({ profile, deleteProfile }) => {
  return (
    <div>
      <div>
        <div className="dash-buttons">
          <Link to="/edit-profile" className="btn btn-light">
            <i className="fas fa-user-circle text-primary"></i> Edit Profile
          </Link>
          <Link to="/add-experience" className="btn btn-light">
            <i className="fab fa-black-tie text-primary"></i> Add Experience
          </Link>
          <Link to="/add-education" className="btn btn-light">
            <i className="fas fa-graduation-cap text-primary"></i> Add Education
          </Link>
        </div>
        {profile.experience ? (
          <Experience experience={profile.experience} />
        ) : null}
        {profile.education ? <Education education={profile.education} /> : null}

        <div className="my-2">
          <button
            className="btn btn-danger"
            onClick={() => deleteProfile(profile._id)}
          >
            <i className="fas fa-user-minus"></i>
            Delete My Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default connect(null, { deleteProfile })(DashboardAction);
