import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { connect } from "react-redux";
import { AddLike, RemoveLike, DeletePost } from "../../action/post";

const PostItem = ({
  auth,
  post: { _id, text, name, avatar, user, likes, comments, date },
  AddLike,
  RemoveLike,
  DeletePost,
  showActions = true,
}) => {
  return (
    <div className="posts">
      <div className="post bg-white p-1 my-1">
        <div>
          <Link to={`/profile/${_id}`}>
            <img className="round-img" src={avatar} alt="" />
            <h4>{name}</h4>
          </Link>
        </div>
        <div>
          <p className="my-1">{text}</p>
          <p className="post-date">
            Posted on <Moment format="YYYY/MM/DD">{date}</Moment>
          </p>
          {showActions ? (
            <Fragment>
              {" "}
              <button
                type="button"
                className="btn btn-light"
                onClick={() => AddLike(_id)}
              >
                <i className="fas fa-thumbs-up"></i>
                <span>{likes.length}</span>
              </button>
              <button
                type="button"
                className="btn btn-light"
                onClick={() => RemoveLike(_id)}
              >
                <i className="fas fa-thumbs-down"></i>
              </button>
              <Link to={`/posts/${_id}`} className="btn btn-primary">
                Discussion{" "}
                {comments.length.length > 0 ? (
                  <span className="comment-count">{comments.length}</span>
                ) : null}
              </Link>
              {!auth.loading && user == auth.user._id ? (
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => DeletePost(_id)}
                >
                  <i className="fas fa-times"></i>
                </button>
              ) : null}
            </Fragment>
          ) : null}
        </div>
      </div>
    </div>
  );
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  AddLike: PropTypes.func.isRequired,
  RemoveLike: PropTypes.func.isRequired,
  DeletePost: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { AddLike, RemoveLike, DeletePost })(
  PostItem
);
