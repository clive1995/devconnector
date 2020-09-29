import React, { useEffect } from "react";
import Spinner from "../layout/Spinner";
import { getAllProfiles } from "../../action/profile";
import PropTypes from "prop-types";
import ProfileItem from "./ProfileItem";
import { connect } from "react-redux";
const Profiles = ({ getAllProfiles, profile: { profiles, loading } }) => {
  useEffect(() => {
    getAllProfiles();
  }, [getAllProfiles]);
  return (
    <div>
      {loading ? (
        <Spinner />
      ) : (
        <div>
          <h1 className="large text-primary">Developers</h1>
          <p className="lead">
            <i className="fab fa-connectdevelop"></i> Browse and connect with
            developers
          </p>
          <div className="profiles">
            {profiles !== null && profiles.length > 0 ? (
              profiles.map((profile) => (
                <ProfileItem key={profile._id} profile={profile} />
              ))
            ) : (
              <div>
                <h4>No profiles found...</h4>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

Profiles.propTypes = {
  getAllProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToPropd = (state) => ({
  profile: state.profile,
});
export default connect(mapStateToPropd, { getAllProfiles })(Profiles);
