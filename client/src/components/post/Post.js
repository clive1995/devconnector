import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import { GetPost } from "../../action/post";
import PostItem from "./PostItem";
const Post = ({ GetPost, history, match, post: { post, loading } }) => {
  useEffect(() => {
    GetPost(match.params.id);
  }, [GetPost]);
  return loading || post === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <PostItem post={post} showActions={false} />
    </Fragment>
  );
};

Post.propTypes = {
  GetPost: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, { GetPost })(Post);
