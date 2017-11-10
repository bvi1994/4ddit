import PropTypes from 'prop-types';
import React from 'react';
import Title from '../components/Title';

const Header = ({ name }) => {
    return (
        <div>
          <Title name={name} />
        </div>
    );
};

Header.propTypes = {
    name: PropTypes.string,
};

export default Header;
