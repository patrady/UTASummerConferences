import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Table from '../../Components/Table';


const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    },
    input: {
        display: 'none',
    },
});

class Billing2 extends React.Component {
    constructor(props) {
        super(props);

        this.counter = 0;

        this.state = {
            title: 'hello',
            count: 1,
            row: [],
        }

        // this.handleBtnClick = this.handleBtnClick.bind(this);
        this.handleAddClick = this.handleAddClick.bind(this);
    }

    // handleBtnClick() {
    //     this.setState({title: this.state.title + this.state.count,
    //                    count: this.state.count + 1});
    // }

    // printToScreen() {
    //     console.log('this is a test');
    // }

    handleRowClick() {
        console.log('pop up a dialog box');
    }

    createData(guest, date, item) {
        this.counter += 1;
        return { id: this.counter, guest, date, item };
    }

    handleAddClick(name) {
        console.log('add button clicked');
        let newArr = this.state.row.slice();
        newArr.push(
            this.createData(
                { value: name, color: 'error', icon: null },
                { value: '9/29/2018 06:21 PM', color: 'error', icon: null },
                { value: 'Billiards', color: 'error', icon: null },
            ));


        this.setState({ row: newArr.slice() })

        console.log(this.state.row);
    }


    render() {
        const { classes } = this.props;
        const { title, row } = this.state;

        let arr = ['item1', 'item2', 'item3'];

        return (
            <div>

                {
                    // Make 3 buttons 'item1', '2',...
                    arr.map((i, index) => {
                        return (
                            <Button color='primary'>{i + index}</Button>
                        )
                    })
                }

                <Button color={'primary'} onClick={() => { this.handleBtnClick(); this.printToScreen(); }}>{title}</Button>
                <Table onRowClick={this.handleRowClick}
                    title={'Billing'}
                    filters={[
                        {
                            label: 'All',
                            func: (row) => { return row.guest.value !== null },
                        }
                    ]}
                    columns={[
                        { id: 'guest', label: 'Guest' },
                        { id: 'date', label: 'Date' },
                        { id: 'item', label: 'Item' }
                    ]}
                    rows={row}
                    orderBy='guest'
                    onAddClick={() => this.handleAddClick('Nick Reimherr')}
                />

            </div>


        )

    }


}

Billing2.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default Billing2;