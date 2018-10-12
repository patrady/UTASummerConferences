import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';

const CardStyle = theme => ({
    root: {
        flexGrow: 1,
        margin: theme.spacing.unit * 2,
    },
    paper: {
        width: 300,
        height: 75,
        padding: theme.spacing.unit * 2,
    },
    icon: {
        fontSize: 70,
    },
    description: {
        paddingRight: 7
    },
    notifications: {
        marginLeft: -28,
        marginTop: 115,
    },
    circleStyle: {
        padding:10,
        margin:20,
        display:"inline-block",
        backgroundColor: 'inherit',
        borderRadius: "50%",
        width:100,
        height:100,
      }
});

/**
 * A clickable card with notifications
 * @var {string} name Headline
 * @var {string} description Description
 * @var {string} notifications **Optional** Number of notifications
 */

function Card(props) {
    const { classes } = props;

    return (
        <ButtonBase className={classes.root}>
            <Paper className={classes.paper}>
                <Grid container spacing={0}>
                    <Grid item xs={12} container>
                        <Typography gutterBottom variant="headline" align="left" noWrap>{props.name}</Typography>
                        <Typography variant="body1" align="left" className={classes.description}>{props.description}</Typography>
                    </Grid>
                </Grid>
            </Paper>

            {
                props.notifications 
                ? <div className={classes.circleStyle}>7</div>
                : (null)
            }
        </ButtonBase>
    );
}

Card.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(CardStyle)(Card);


