import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import { fade } from '@material-ui/core/styles/colorManipulator';
import Input from '@material-ui/core/Input';
import { Toolbar } from '@material-ui/core';

const style = theme => ({
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.gray, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.gray, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing.unit,
            width: 'auto',
        },
    },
    searchIcon: {
        width: theme.spacing.unit * 9,
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    grow: {
        flexGrow: 1,
    },
    root: {
        paddingRight: theme.spacing.unit,
    },
    spacer: {
        flex: '1 1 100%',
    },
})

class SearchBar extends React.Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }

    search() { }

    render() {
        const { classes } = this.props;


        return (
            <Toolbar className={classes.root}>


                <div className={classes.spacer} />

                {/* Grow Room for searchbar when clicked */}
                <div className={classes.grow} />

                {/* Search Bar */}
                <div className={classes.search}>
                    <div className={classes.searchIcon}>
                        <SearchIcon />
                    </div>
                    <Input
                        placeholder="Search…"
                        disableUnderline
                        classes={{
                            root: classes.inputRoot,
                            input: classes.inputInput,
                        }}
                        onChange={(e) => this.search(e.target.value)}
                    />
                </div>
            </Toolbar>


        );
    }
}


SearchBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(style)(SearchBar);