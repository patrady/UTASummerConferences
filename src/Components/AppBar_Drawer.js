import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import ListItemText from '@material-ui/core/ListItemText';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import HomeIcon from '@material-ui/icons/Home';
import CampsIcon from '@material-ui/icons/ChildCare';
import HallsIcon from '@material-ui/icons/LocationCity';
import {NavLink} from 'react-router-dom';


const styles = theme => ({
    link: {
        textDecoration: 'none',
    },
    menuItem: {
        '&:focus': {
            backgroundColor: theme.palette.primary.main,
            '& $primary, & $icon': {
                color: theme.palette.common.white,
            },
        },
    },
    primary: {},
    icon: {},
    list: {
        width: 250,
    },
    fullList: {
        minWidth: 200,
    },
});

/**
 * Displays the menu of the swipe-in drawer
 */
class TemporaryDrawer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            campsCollapseOpen: true
        }
    }

    render() {
        const { classes } = this.props;

        const drawerList = (
            <MenuList className={classes.list}>
                <NavLink to='/' className={classes.link}>
                    <MenuItem className={classes.menuItem}>
                        <ListItemIcon className={classes.icon}>
                            <HomeIcon />
                        </ListItemIcon>
                        <ListItemText classes={{ primary: classes.primary }} inset primary="Homepage" />
                    </MenuItem>
                </NavLink>

                <NavLink to='/camps' className={classes.link}>
                    <MenuItem className={classes.menuItem}>
                        <ListItemIcon className={classes.icon}>
                            <CampsIcon />
                        </ListItemIcon>
                        <ListItemText classes={{ primary: classes.primary }} inset primary="Camps" />
                    </MenuItem>
                </NavLink>


                <MenuItem className={classes.link}>
                    <ListItemIcon className={classes.icon}>
                        <HallsIcon />
                    </ListItemIcon>
                    <ListItemText classes={{ primary: classes.primary }} inset primary="Halls" />
                </MenuItem>
            </MenuList>
        );

        return (
            <div>
                <Drawer open={this.props.isOpen} onClose={this.props.onClose}>
                    <div
                        tabIndex={0}
                        role="button"
                        onClick={this.props.onClose}
                        onKeyDown={this.props.onClose}
                    >
                        {drawerList}
                    </div>
                </Drawer>
            </div>
        );
    }
}

TemporaryDrawer.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TemporaryDrawer);
