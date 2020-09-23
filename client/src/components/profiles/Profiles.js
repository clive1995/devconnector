import React, { useEffect } from "react";
import Spinner from "../layout/Spinner";
import { getAllProfiles } from "../../action/profile";
import PropTypes from "prop-types";
import { connect } from "react-redux";
const Profiles = ({ getAllProfiles, profile: { profiles: loading } }) => {
  useEffect(() => {
    getAllProfiles();
  }, []);
  return <div></div>;
};

Profiles.propTypes = {
  getAllProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToPropd = (state) => ({
  profile: state.profile,
});
export default connect(mapStateToPropd, { getAllProfiles })(Profiles);
