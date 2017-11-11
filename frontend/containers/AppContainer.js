import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import Title from '../components/Title';
import Trigger from '../components/Loginmodal';
import Header from '../components/Header';

const AppContainer = ({ }) => {
    return (
        <div>
            <Title name={name} />
            <Header/>
            <Trigger />
            <Header name={name} />
        </div>
    );
};

AppContainer.propTypes = {
    name: PropTypes.string,
};

const mapStateToProps = (state) => {
    return {
        name: state.title.name
    };
};

const mapDispatchToProps = (/* dispatch */) => {
    return {
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AppContainer);
