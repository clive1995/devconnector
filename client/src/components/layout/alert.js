import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const Alert = ({ alerts }) => {
  return (
    <div>
      {alerts !== null && alerts.length > 0 ? (
        <div>
          {alerts.map((alert) => (
            <div key={alert.id} className={`alert alert-${alert.alertType}`}>
              {alert.msg}
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
};

// render() {
//     const { res } = this.props;
//     return !res.length ? null : (
//         <ul>{res.map(item => <li key={item.id}>{item.subreddit}</li>)}</ul>
//     );
// }

// alerts !== null &&
// alerts.length > 0 &&
// alerts.map((alert) => {
//   <div key={alert.id} className={`alert alert ${alert.alertType}`}>
//     {alert.msg}
//   </div>;
// });
Alert.propTypes = {
  alerts: PropTypes.array.isRequired,
};

const mapStateToProp = (state) => ({
  alerts: state.alert,
});

export default connect(mapStateToProp)(Alert);
