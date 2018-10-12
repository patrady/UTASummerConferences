import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Card from '../../Components/Card';
import MenuAppBar from '../../Components/AppBar'
import { Grid } from '@material-ui/core';
import { NavLink } from 'react-router-dom';

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: '6em',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '33.33%',
        flexShrink: 0,
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
    link: {
        textDecoration: 'none',
        color: 'black',
    },
});

class ControlledExpansionPanels extends React.Component {
    state = {
        expanded: 'panel1',
    };

    handleChange = panel => (event, expanded) => {
        this.setState({
            expanded: expanded ? panel : false,
        });
    };

    makeCurrentCamps() {
        return (
            [
                this.makeCard('Just Joshin Around 2018'),
                this.makeCard('Just Joshin Around 2018'),
                this.makeCard('Just Joshin Around 2018'),
                this.makeCard('Just Joshin Around 2018'),
                this.makeCard('Just Joshin Around 2018'),
                this.makeCard('Just Joshin Around 2018'),
                this.makeCard('Just Joshin Around 2018'),
                this.makeCard('Just Joshin Around 2018')
            ]
        )
    }

    makeCard(name) {
        const { classes } = this.props;

        return (
            <NavLink to='/camps/homepage' className={classes.link}>
                <Card name={name} description={'This is a description of what the camp is'} />
            </NavLink>

        );
    }

    render() {
        const { classes } = this.props;
        const { expanded } = this.state;

        return (
            <div className={classes.root}>
                <MenuAppBar title='Camps' />

                <ExpansionPanel expanded={expanded === 'panel1'} onChange={this.handleChange('panel1')}>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography className={classes.heading}>Current Camps</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <Grid wrap='wrap'>
                            {this.makeCurrentCamps()}
                        </Grid>
                    </ExpansionPanelDetails>
                </ExpansionPanel>

                <ExpansionPanel expanded={expanded === 'panel3'} onChange={this.handleChange('panel3')}>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography className={classes.heading}>Future Camps</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <Grid wrap='wrap'>
                            {this.makeCurrentCamps()}
                        </Grid>
                    </ExpansionPanelDetails>
                </ExpansionPanel>

                <ExpansionPanel expanded={expanded === 'panel2'} onChange={this.handleChange('panel2')}>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography className={classes.heading}>Past Camps</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <Grid wrap='wrap'>
                            {this.makeCurrentCamps()}
                        </Grid>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            </div>
        );
    }
}

ControlledExpansionPanels.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ControlledExpansionPanels);
