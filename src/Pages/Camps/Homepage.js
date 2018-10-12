import React from 'react';
import HomepageCard from '../../Components/Card_Icon';
import MenuAppBar from '../../Components/AppBar'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ContractIcon from '@material-ui/icons/EditOutlined';
import ParkingIcon from '@material-ui/icons/DirectionsCarOutlined';
import KeysIcon from '@material-ui/icons/CreditCardOutlined';
import EquipmentIcon from '@material-ui/icons/VideogameAssetOutlined';
import InventoryIcon from '@material-ui/icons/ListOutlined';
import BillingIcon from '@material-ui/icons/AttachMoneyOutlined';
import CampersIcon from '@material-ui/icons/HowToRegOutlined';
import SettingsIcon from '@material-ui/icons/SettingsOutlined';
import { NavLink } from 'react-router-dom';

const iconStyle = {
    fontSize: '70px',
    alignContent: 'center',
    verticalAlign: 'middle'
}

const style = theme => ({
    headline: {
        padding: theme.spacing.unit * 2,
    },
    root: {
        marginTop: '6em',
    },
    link: {
        textDecoration: 'none',
        color: 'black',
    },
})

function StaffHomepage(props) {
    const { classes } = props;


    return (
        <div className={classes.root}>
            <MenuAppBar title='Camp Name' />

            <HomepageCard title="Contract" description="See the details of the contract">
                <ContractIcon style={iconStyle} />
            </HomepageCard>

            <HomepageCard title="Campers" description="Roster, Check-In, and Check-Out">
                <CampersIcon style={iconStyle} />
            </HomepageCard>

            <HomepageCard title="Parking" description="Manage all vehicles">
                <ParkingIcon style={iconStyle} />
            </HomepageCard>

            <HomepageCard title="Keys" description="Manage all cards and keys">
                <KeysIcon style={iconStyle} />
            </HomepageCard>

            <NavLink to='/camps/equipment' className={classes.link}>
                <HomepageCard title="Equipment" description="Lend and return equipment">
                    <EquipmentIcon style={iconStyle} />
                </HomepageCard>
            </NavLink>

            <HomepageCard title="Inventory Sheets" description="Fill out and view room conditions">
                <InventoryIcon style={iconStyle} />
            </HomepageCard>

            <NavLink to='/camps/billing' className={classes.link}>
                <HomepageCard title="Billing" description="Generate and invoice for the camp">
                    <BillingIcon style={iconStyle} />
                </HomepageCard>
            </NavLink>

            <HomepageCard title="Settings" description="Manage the settings for this camp">
                <SettingsIcon style={iconStyle} />
            </HomepageCard>


        </div>
    );
}

StaffHomepage.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(style)(StaffHomepage);