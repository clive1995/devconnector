import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getGitHubRepos } from "../../action/profile";

const ProfileGitHub = ({ githubusername, getGitHubRepos, repos }) => {
  useEffect(() => {
    getGitHubRepos(githubusername);
  }, [getGitHubRepos, githubusername]);
  return (
    <div className="profile-github">
      <h2 className="text-primary my-1">Github Repos</h2>
      {repos.map((repo) => {
        <div key={repo.id} className="repo bg-white p-1 my-1">
          <div>
            <h4>
              <a href={repo.html_url} target="_blank">
                {repo.name}
              </a>
            </h4>
          </div>
        </div>;
      })}
    </div>
  );
};

ProfileGitHub.propTypes = {};

const mapStateToProps = (state) => ({
  repos: state.profile.repos,
});
export default connect(mapStateToProps, { getGitHubRepos })(ProfileGitHub);
