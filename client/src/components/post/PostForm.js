import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { AddPosts } from "../../action/post";
const PostForm = ({ AddPosts }) => {
  const [text, settext] = useState("");
  return (
    <div class="post-form">
      <div class="bg-primary p">
        <h3>Say Something...</h3>
      </div>
      <form
        class="form my-1"
        onSubmit={(e) => {
          e.preventDefault();
          AddPosts({ text });
          settext("");
        }}
      >
        <textarea
          name="text"
          cols="30"
          rows="5"
          placeholder="Create a post"
          value={text}
          onChange={(e) => settext(e.target.value)}
          required
        ></textarea>
        <input type="submit" class="btn btn-dark my-1" value="Submit" />
      </form>
    </div>
  );
};

PostForm.propTypes = {
  AddPosts: PropTypes.func.isRequired,
};

export default connect(null, { AddPosts })(PostForm);
