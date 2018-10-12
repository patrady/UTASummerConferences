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
        marginTop: '5px',
        marginBottom: '5px',
    }
});

class Billing extends React.Component {
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
            this.setState({isCheckInOpen: true})
        else if (this.isCheckedIn(row))
            this.setState({isOverviewOpen: true})
    }

    handleFilterClick = (filterName) => {
        console.log(filterName + ' was clicked!');
    }

    createData(category, topic, description, amount) {
        this.counter += 1;
        return { id: this.counter, category, topic, description, amount };
    }

    isCheckedOut(row) { return row.checkin.value === null }

    isCheckedIn(row) { return row.checkin.value !== null }

    addItem = () => {
        this.setState({ isCheckOutOpen: true });
    }

    render() {
        const { classes } = this.props;
        const { isCheckOutOpen, isCheckInOpen, selectedRow, isOverviewOpen } = this.state;

        return (
            <div className={classes.root}>
                <MenuAppBar title='Camp Name' />

                <Table
                    title='Billing'
                    filters={[
                        {
                            label: 'Returned',
                            func: (row) => { return row.checkin.value !== null && row.checkin.value !== 'Lost' },
                        },
                    ]}
                    columns={[
                        { id: 'category', label: 'Category' },
                        { id: 'topic', label: 'Topic' },
                        { id: 'description', label: 'Description' },
                        { id: 'amount', label: 'Amount' },
                    ]}
                    rows={[
                        this.createData(
                            { value: 'Keys', color: 'default', icon: null },
                            { value: 'Lost', color: 'default', icon: null },
                            { value: 'Lost Temporary Card', color: 'default', icon: null },
                            { value: '$20', color: 'default', icon: null },
                        ),
                        this.createData(
                            { value: 'Keys', color: 'default', icon: null },
                            { value: 'Damaged', color: 'default', icon: null },
                            { value: 'Dented hard key toward top left corner', color: 'default', icon: null },
                            { value: '$25', color: 'default', icon: null },
                        ),
                        this.createData(
                            { value: 'Equipment', color: 'default', icon: null },
                            { value: 'Lost', color: 'default', icon: null },
                            { value: 'Lost Ping Pong Paddle', color: 'default', icon: null },
                            { value: '$10', color: 'default', icon: null },
                        ),
                        this.createData(
                            { value: 'Equipment', color: 'default', icon: null },
                            { value: 'Damaged', color: 'default', icon: null },
                            { value: 'Pool tip broken', color: 'default', icon: null },
                            { value: '$5', color: 'default', icon: null },
                        ),
                        this.createData(
                            { value: 'Parking', color: 'default', icon: null },
                            { value: 'Bill', color: 'default', icon: null },
                            { value: 'License Plate #AAA-1234 for 5 days', color: 'default', icon: null },
                            { value: '$10', color: 'default', icon: null },
                        ),
                        this.createData(
                            { value: 'Rooms', color: 'default', icon: null },
                            { value: 'Meeting Space', color: 'default', icon: null },
                            { value: 'Rent out MAC for 1 day', color: 'default', icon: null },
                            { value: '$100', color: 'default', icon: null },
                        ),
                        this.createData(
                            { value: 'Rooms', color: 'default', icon: null },
                            { value: 'Bed Space', color: 'default', icon: null },
                            { value: 'Camper for 2 days', color: 'default', icon: null },
                            { value: '$64', color: 'default', icon: null },
                        ),
                        this.createData(
                            { value: 'Damages', color: 'default', icon: null },
                            { value: 'Room Damages', color: 'default', icon: null },
                            { value: 'Hole in wall of Room #123', color: 'default', icon: null },
                            { value: '$76', color: 'default', icon: null },
                        )
                    ]}
                    orderBy='category'
                    onRowClick={this.handleRowClick}
                    onAddClick={this.addItem}
                />

                {/* <Dialog title='Check-Out Equipment'
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
                    <TextField label='Guest' className={classes.textInput} value={selectedRow ? selectedRow.guest.value : (null)} fullWidth />
                    <TextField label='Item' className={classes.textInput} value={selectedRow ? selectedRow.item.value : (null)} fullWidth />
                    <TextField label='Check-Out' className={classes.textInput} value={selectedRow ? selectedRow.checkout.value : (null)} />
                    <TextField label='Check-Out' className={classes.textInput} value={selectedRow ? selectedRow.checkin.value : (null)} />
                    <TextField label='Damages' className={classes.textInput} multiline fullWidth value={selectedRow ? selectedRow.damages.value : (null)}></TextField>

                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={selectedRow ? selectedRow.checkin.value === 'Lost': false}
                                onChange={(e) => this.setState({ equipOverviewLost: e.target.checked })}
                                value="checkedB"
                                color="primary"
                            />
                        }
                        label="Lost"
                    />

                </Dialog> */}
            </div>
        );
    }
}

Billing.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Billing);
