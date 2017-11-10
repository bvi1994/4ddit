import React from 'react';
import PropTypes from 'prop-types';

const Title = ( { name } ) => {
    return (
        <h1><img src="http://i.imgur.com/sdO8tAw.png" alt="reddit" style={{height: 50, width: 50}}/>{name}</h1>
    );
};

Title.propTypes = {
    name: PropTypes.string,
};


export default Title;
