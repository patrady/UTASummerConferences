import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MenuAppBar from '../../Components/AppBar'

const styles = theme => ({
    root: {
        width: '100%',
    },
});

class ClassName extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

        }
    }

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <MenuAppBar title='Camps' />

            </div>
        );
    }
}

ClassName.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ClassName);
