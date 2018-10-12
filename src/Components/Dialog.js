import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Typography, withStyles } from '@material-ui/core';
import PropTypes from 'prop-types';

const styles = theme => ({
    subTitle: {
        marginTop: -40,
        marginRight: 30,
    },
    root: {
        marginTop: 20,
    }


});


class DialogBox extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            open: true,
        }
    }

    render() {
        const { classes, isOpen, title, actionButtons, subtitle, children } = this.props;


        return (
            <Dialog
                open={isOpen}
            >
                <DialogTitle >{title}</DialogTitle>
                <Typography align='right' className={classes.subTitle} variant='subheading'>{subtitle}</Typography>

                <DialogContent className={classes.root}>
                    { children }
                </DialogContent>
                <DialogActions>
                    {actionButtons}
                </DialogActions>
            </Dialog>
        );
    }
}

DialogBox.propTypes = {
    classes: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string,
    actionButtons: PropTypes.element.isRequired,
    isOpen: PropTypes.bool.isRequired,
};

export default withStyles(styles)(DialogBox);