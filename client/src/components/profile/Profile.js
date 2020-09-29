import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import { getProfileById, getCurrentProfile } from "../../action/profile";
import { Link } from "react-router-dom";
import ProfileTop from "./ProfileTop";
import ProfileAbout from "./ProfileAbout";
import ProfileExperience from "./ProfileExperience";
import ProfileEductaion from "./ProfileEductaion";
//import ProfileGitHub from "./ProfileGitHub";
import profile from "../../reducers/profile";
const Profile = ({
  match,
  getProfileById,
  getCurrentProfile,
  profileo: { profiles, loading, profile },
  auth,
}) => {
  useEffect(() => {
    getProfileById(match.params.id);
  }, []);
  return (
    <div>
      {profiles === null || loading ? (
        <Spinner></Spinner>
      ) : (
        <div>
          <div className="row">
            <div className="col-md-6">
              <Link to="/profiles" className="btn btn-light mb-3 float-left">
                Back To Profiles
              </Link>
            </div>
            <div className="col-md-6" />
          </div>
          {auth.loading === false &&
          auth.isAuthenticated &&
          auth.user.hasOwnProperty("_id") &&
          profiles.hasOwnProperty("user") &&
          auth.user._id === profiles.user._id ? (
            <div>
              <Link to="/edit-profile" className="btn btn-dark">
                Edit Profile
              </Link>
            </div>
          ) : null}
          {auth.loading === false &&
          auth.isAuthenticated &&
          auth.user.hasOwnProperty("_id") &&
          profiles.hasOwnProperty("user") ? (
            <div className="profile-grid my-1">
              <ProfileTop profile={profiles}></ProfileTop>
              <ProfileAbout profile={profiles}></ProfileAbout>
              <div className="my-css">
                <h2 className="text-primary">Experience</h2>
                {profiles.experience.length > 0 ? (
                  <div>
                    {profiles.experience.map((exp, index) => (
                      <ProfileExperience
                        key={exp._id}
                        experience={exp}
                      ></ProfileExperience>
                    ))}
                  </div>
                ) : (
                  <h2>No Experience credentials</h2>
                )}
              </div>
              <div className="my-css">
                <h2 className="text-primary">Education</h2>
                {profiles.education.length > 0 ? (
                  <div>
                    {profiles.education.map((edu, index) => (
                      <ProfileEductaion
                        key={edu._id}
                        education={edu}
                      ></ProfileEductaion>
                    ))}
                  </div>
                ) : (
                  <h2>No Education credentials</h2>
                )}
              </div>
              {/* {profiles.githubusername ? (
                <ProfileGitHub githubusername={profiles.githubusername} />
              ) : null} */}
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
};

Profile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  profileo: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profileo: state.profile,
  auth: state.auth,
});

export default connect(mapStateToProps, { getProfileById, getCurrentProfile })(
  Profile
);
