import React from 'react';
import PropTypes from 'prop-types';

const Layout = ({ children }) => <>{children}</>;

export default Layout;

Layout.propTypes = {
  children: PropTypes.element.isRequired,
};
