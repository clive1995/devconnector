import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Moment from "react-moment";
import { deleteEducation } from "../../action/profile";
const Education = ({ education, deleteEducation }) => {
  return (
    <div>
      <h2 className="my-2">Education Credentials</h2>
      <table className="table">
        <thead>
          <tr>
            <th>School</th>
            <th className="hide-sm">Degree</th>
            <th className="hide-sm">Years</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {education.map((edu, index) => (
            <tr key={`education${index}`}>
              <td>{edu.school}</td>
              <td className="hide-sm">{edu.degree}</td>
              <td className="hide-sm">
                <Moment format="YYYY/MM/DD">{edu.from}</Moment> -
                {edu.to == null ? (
                  "NOW"
                ) : (
                  <Moment format="YYYY/MM/DD">{edu.to}</Moment>
                )}
              </td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteEducation(edu._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

Education.propTypes = {
  education: PropTypes.array.isRequired,
  deleteEducation: PropTypes.func.isRequired,
};

export default connect(null, { deleteEducation })(Education);
