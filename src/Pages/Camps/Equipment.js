import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MenuAppBar from '../../Components/AppBar'
import Table from '../../Components/Table';
import Dialog from '../../Components/Dialog';
import Button from '@material-ui/core/Button';
import { TextField } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import AutoSuggest from '../../Components/AutoSuggest';

const styles = theme => ({
    appBar: {
        padding: '4em',
    },
    root: {
        width: '100%',
        marginTop: '6em',
    },
    headline: {
        padding: theme.spacing.unit * 2,
    },
    container: {
        margin: theme.spacing.unit * 2
    },
    textInput: {
        marginTop: '10px',
        marginBottom: '10px',
    }
});

class Equipment extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedRow: null,
            isCheckOutOpen: false,
            isCheckInOpen: false,
            isOverviewOpen: false,
        }

        this.counter = 0;
    }

    handleCloseDialog(state) {
        console.log('closing ' + state);
        this.setState({ [state]: false });
    }

    handleRowClick = (row) => {
        this.setState({ selectedRow: row });

        // Display the correct Dialog box based on the state of the row
        if (this.isCheckedOut(row))
            this.setState({ isCheckInOpen: true })
        else if (this.isCheckedIn(row))
            this.setState({ isOverviewOpen: true })
    }

    handleFilterClick = (filterName) => {
        console.log(filterName + ' was clicked!');
    }

    createData(guest, item, checkout, checkin, damages) {
        this.counter += 1;
        return { id: this.counter, guest, item, checkout, checkin, damages };
    }

    isCheckedOut(row) { return row.checkin.value === null }

    isCheckedIn(row) { return row.checkin.value !== null }

    addItem = () => {
        this.setState({ isCheckOutOpen: true });
    }

    getAutoSuggestedItem = object => {
        console.log(object)
    }

    getSuggestions = () => {
        return [
            { name: 'Kingsley Pitkins' },
            { name: 'Elfreda Haw' },
            { name: 'Felipa Purrington' },
            { name: 'Boycey Amort' },
            { name: 'Row Schaumann' },
            { name: 'Maryl Scrace' },
        ]
    }

    getDamages = () => {
        return [
            { label: 'Dented Side' },
            { label: 'Broken Pool Tip' },
            { label: 'Snapped Handle' },
            { label: 'Poked Hole in Ball' },
            { label: 'Slight Damages' },
        ]
    }

    getItems = () => {
        return [
            { label: 'Pool' },
            { label: 'Ping Pong' },
            { label: 'Table Tennis' },
            { label: 'Board Games' },
            { label: 'Pots' },
            { label: 'Knife' },
        ]
    }

    render() {
        const { classes } = this.props;
        const { isCheckOutOpen, isCheckInOpen, selectedRow, isOverviewOpen } = this.state;

        return (
            <div className={classes.root}>
                <MenuAppBar title='Camps' />

                <Table
                    title='Equipment'
                    filters={[
                        {
                            label: 'Returned',
                            func: (row) => { return row.checkin.value !== null && row.checkin.value !== 'Lost' },
                        },
                        {
                            label: 'Checked Out',
                            func: (row) => { return row.checkout.value !== null && row.checkin.value === null },
                        },
                        {
                            label: 'Damaged',
                            func: (row) => { return row.damages.value !== null },
                        },
                        {
                            label: 'Lost',
                            func: (row) => { return row.checkin.value === 'Lost' }
                        },
                        {
                            label: 'All',
                            func: () => { return true; }
                        }
                    ]}
                    columns={[
                        { id: 'guest', label: 'Guest' },
                        { id: 'item', label: 'Item' },
                        { id: 'checkout', label: 'Check-Out' },
                        { id: 'checkin', label: 'Check-In' },
                        { id: 'damages', label: 'Damages' },
                    ]}
                    rows={[
                        this.createData(
                            { value: 'Robert Brady', color: 'error', icon: null },
                            { value: 'Billiards', color: 'error', icon: null },
                            { value: '9/29/2018 06:21 PM', color: 'error', icon: null },
                            { value: 'Lost', color: 'error', icon: null },
                            { value: null, color: 'error', icon: null },
                        ),
                        this.createData(
                            { value: 'Andrew Brady', color: 'default', icon: null },
                            { value: 'Billiards', color: 'default', icon: null },
                            { value: '9/28/2018 05:15 PM', color: 'default', icon: null },
                            { value: '9/28/2018 05:46 PM', color: 'default', icon: null },
                            { value: 'Dented side', color: 'default', icon: null },
                        ),
                        this.createData(
                            { value: 'Billy Brady', color: 'default', icon: null },
                            { value: 'Billiards', color: 'default', icon: null },
                            { value: '9/28/2018 05:57 PM', color: 'default', icon: null },
                            { value: null, color: 'default', icon: null },
                            { value: null, color: 'default', icon: null },
                        )
                    ]}
                    orderBy='guest'
                    onRowClick={this.handleRowClick}
                    onAddClick={this.addItem}
                />

                <Dialog title='Check-Out Equipment'
                    isOpen={isCheckOutOpen}
                    actionButtons={
                        <div>
                            <Button onClick={() => this.handleCloseDialog('isCheckOutOpen')} color="default"> Cancel </Button>
                            <Button onClick={() => this.handleCloseDialog('isCheckOutOpen')} color="primary"> Check-out </Button>
                        </div>
                    }>
                    <TextField label='Guest' fullWidth />
                    <TextField label='Item' fullWidth />

                </Dialog>

                <Dialog title='Check-In Equipment'
                    isOpen={isCheckInOpen}
                    actionButtons={
                        <div>
                            <Button onClick={() => this.handleCloseDialog('isCheckInOpen')} color="default"> Cancel </Button>
                            <Button onClick={() => this.handleCloseDialog('isCheckInOpen')} color="secondary"> Delete </Button>
                            <Button onClick={() => this.handleCloseDialog('isCheckInOpen')} color="primary"> Check-In </Button>
                        </div>
                    }>
                    <TextField label='Guest' className={classes.textInput} value={selectedRow ? selectedRow.guest.value : (null)} fullWidth />
                    <TextField label='Item' className={classes.textInput} value={selectedRow ? selectedRow.item.value : (null)} fullWidth />
                    <TextField label='Damages' className={classes.textInput} multiline fullWidth>{}</TextField>

                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={this.state.checkInLost}
                                onChange={(e) => this.setState({ checkInLost: e.target.checked })}
                                value="checkedB"
                                color="primary"
                            />
                        }
                        label="Lost"
                    />

                </Dialog>

                <Dialog title='Equipment Overview'
                    isOpen={isOverviewOpen}
                    actionButtons={
                        <div>
                            <Button onClick={() => this.handleCloseDialog('isOverviewOpen')} color="default"> Cancel </Button>
                            <Button onClick={() => this.handleCloseDialog('isOverviewOpen')} color="secondary"> Delete </Button>
                            <Button onClick={() => this.handleCloseDialog('isOverviewOpen')} color="primary"> Finish </Button>
                        </div>
                    }>
                    <AutoSuggest
                        label='Guest'
                        value={selectedRow ? selectedRow.guest.value : (null)}
                        suggestions={this.getSuggestions()}
                        accessor={'name'}
                        onChange={this.getAutoSuggestedItem}
                        className={classes.textInput}
                    />
                    <AutoSuggest
                        label='Item'
                        value={selectedRow ? selectedRow.item.value : (null)}
                        suggestions={this.getItems()}
                        accessor={'label'}
                        onChange={this.getAutoSuggestedItem}
                        className={classes.textInput}
                    />
                    <TextField label='Check-Out' className={classes.textInput} value={selectedRow ? selectedRow.checkout.value : (null)} />
                    <TextField label='Check-Out' className={classes.textInput} value={selectedRow ? selectedRow.checkin.value : (null)} />
                    <AutoSuggest
                        label='Damages'
                        value={selectedRow ? selectedRow.damages.value : (null)}
                        suggestions={this.getDamages()}
                        accessor={'label'}
                        onChange={this.getAutoSuggestedItem}
                        className={classes.textInput}
                    />

                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={selectedRow ? selectedRow.checkin.value === 'Lost' : false}
                                onChange={(e) => this.setState({ equipOverviewLost: e.target.checked })}
                                value="checkedB"
                                color="primary"
                            />
                        }
                        label="Lost"
                    />

                </Dialog>
            </div>
        );
    }
}

Equipment.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Equipment);
