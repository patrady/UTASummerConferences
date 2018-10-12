import React from 'react';
import HomepageCard from '../../Components/Card_Icon';
import MenuAppBar from '../../Components/AppBar'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CampsIcon from '@material-ui/icons/ChildCareOutlined';
import RequestsIcon from '@material-ui/icons/DescriptionOutlined';
import UsersIcon from '@material-ui/icons/GroupOutlined';
import HallsIcon from '@material-ui/icons/LocationCityOutlined';
import SettingsIcon from '@material-ui/icons/SettingsOutlined';
import { NavLink } from 'react-router-dom';

const styles = theme => ({
    root: {
        marginTop: '6em',
    },
    iconStyle: {
        fontSize: '70px',
        alignContent: 'center',
        verticalAlign: 'middle'
    },
    link: {
        textDecoration: 'none',
        color: 'black',
    },
    menuItem: {
        '&:focus': {
            backgroundColor: theme.palette.primary.main,
            '& $primary, & $icon': {
                color: theme.palette.common.white,
            },
        },
    },
})

function StaffHomepage(props) {
    const { classes } = props;


    return (
        <div className={classes.root}>
            <MenuAppBar title='Homepage' />

            <NavLink to='/camps' className={classes.link}>
                <HomepageCard title="Camps" description="See all past, present, and future camps" className={classes.menuItem}>
                    <CampsIcon className={classes.iconStyle} />
                </HomepageCard>
            </NavLink>

            <HomepageCard title="Camp Requests" description="See all requests to host their camps" notifications={7}>
                <RequestsIcon className={classes.iconStyle} />
            </HomepageCard>

            <HomepageCard title="Users" description="Manage positions and permissions" notifications={12}>
                <UsersIcon className={classes.iconStyle} />
            </HomepageCard>

            <HomepageCard title="Halls" description="View availability, work orders, and rooms">
                <HallsIcon className={classes.iconStyle} />
            </HomepageCard>

            <HomepageCard title="Settings" description="Manage general settings">
                <SettingsIcon className={classes.iconStyle} />
            </HomepageCard>

        </div>
    );
}

StaffHomepage.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(StaffHomepage);