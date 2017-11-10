import React from 'react';
import PropTypes from 'prop-types';
import ReactBootstrap from 'react-bootstrap';

const Header = () => {
    return (
      <div>
        <img src="https://archives.bulbagarden.net/media/upload/d/d4/025Pikachu_Channel_4.png"/>
        <h2>{"Pikadit"}</h2>
      </div>
    );
};

Header.propTypes = {
    name: PropTypes.string,
    title: PropTypes.string,
};

export default Header;
