import React from "react";
import { withRouter } from "react-router-dom";
import PropTypes from 'prop-types'
import DesktopContainer from './Layout/DesktopContainer'
import MobileContainer from './Layout/MobileContainer'



const ResponsiveContainer = ({ children }) => (
  <div>
    <DesktopContainer>{children}</DesktopContainer>
    <MobileContainer>{children}</MobileContainer>
  </div>
)

ResponsiveContainer.propTypes = {
  children: PropTypes.node,
}

class CustomLayout extends React.Component {
  render() {
    return (
      <ResponsiveContainer>
        {this.props.children}
      </ResponsiveContainer>
    )
  }
}

/* const mapStateToProps = state => {
  return {
    authenticated: state.auth.token !== null
  };
};

 */

export default withRouter(CustomLayout);
