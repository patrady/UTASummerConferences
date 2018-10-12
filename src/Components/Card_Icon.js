import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import { Badge } from '@material-ui/core';

const styles = theme => ({
    root: {
        float: 'left',
        margin: theme.spacing.unit * 2,
    },
    paper: {
        width: 300,
        height: 120,
    },
    icon: {
        fontSize: 70,
    },
    description: {
        paddingRight: 7
    },
    badge: {
        margin: theme.spacing.unit * 2,
        float: 'left'
    },
});

class CardWithIcon extends React.Component {
    constructor(props) {
        super(props)

        this.state = {}
    }

    render() {
        const { classes, notifications, description, title, children } = this.props;

        if (notifications) {
            return (
                <Badge className={classes.badge} badgeContent={notifications} color='error'>
                    <ButtonBase>
                        <Paper className={classes.paper}>
                            <Grid container spacing={0}>
                                <Grid item xs={4} className={classes.icon}>
                                    {children}
                                </Grid>

                                <Grid item xs={8} container>
                                    <Typography gutterBottom variant="headline" align="left">{title}</Typography>
                                    <Typography variant="body1" align="left" className={classes.description}>{description}</Typography>

                                </Grid>
                            </Grid>
                        </Paper>
                    </ButtonBase>
                </Badge>
            );
        }
        else {
            return (
                <ButtonBase className={classes.root}>
                <Paper className={classes.paper}>
                    <Grid container spacing={0}>
                        <Grid item xs={4} className={classes.icon}>
                            {children}
                        </Grid>

                        <Grid item xs={8} container>
                            <Typography gutterBottom variant="headline" align="left">{title}</Typography>
                            <Typography variant="body1" align="left" className={classes.description}>{description}</Typography>

                        </Grid>
                    </Grid>
                </Paper>
            </ButtonBase>
            )
        }
    }
}

CardWithIcon.propTypes = {
    classes: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    notifications: PropTypes.number,
};

export default withStyles(styles)(CardWithIcon);


