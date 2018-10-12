import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FilterListIcon from '@material-ui/icons/FilterList';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import SearchIcon from '@material-ui/icons/Search';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

function desc(a, b, orderBy) {
    if (a[orderBy].value === null) {
        return -1;
    }
    if (b[orderBy].value === null) {
        return 1;
    }
    if (b[orderBy].value < a[orderBy].value) {
        return -1;
    }
    if (b[orderBy].value > a[orderBy].value) {
        return 1;
    }
    return 0;
}

function stableSort(array, cmp) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = cmp(a[0], b[0]);
        if (order !== 0) return order;
        return a[1].value - b[1].value;
    });
    return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
    return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

class EnhancedTableHead extends React.Component {
    createSortHandler = property => event => {
        this.props.onRequestSort(event, property);
    };

    render() {
        const { order, orderBy, columns } = this.props;

        return (
            <TableHead>
                <TableRow>
                    {columns.map((row, index) => {
                        return (
                            <TableCell
                                key={row.id}
                                padding={index === 0 ? 'default' : 'none'}
                                sortDirection={orderBy === row.id ? order : false}
                            >
                                <Tooltip
                                    title="Sort"
                                    placement='bottom-start'
                                    enterDelay={300}
                                >
                                    <TableSortLabel
                                        active={orderBy === row.id}
                                        direction={order}
                                        onClick={this.createSortHandler(row.id)}
                                    >
                                        {row.label}
                                    </TableSortLabel>
                                </Tooltip>
                            </TableCell>
                        );
                    }, this)}
                </TableRow>
            </TableHead>
        );
    }
}

EnhancedTableHead.propTypes = {
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.string.isRequired,
    orderBy: PropTypes.string.isRequired,
    columns: PropTypes.arrayOf(Object).isRequired,
};

const toolbarStyles = theme => ({
    root: {
        paddingRight: theme.spacing.unit,
    },
    spacer: {
        flex: '1 1 100%',
    },
    actions: {
        color: theme.palette.text.secondary,
    },
    title: {
        flex: '0 0 auto',
    },
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
    inputRoot: {
        color: 'inherit',
        width: '100%',
    },
    inputInput: {
        paddingTop: theme.spacing.unit,
        paddingRight: theme.spacing.unit,
        paddingBottom: theme.spacing.unit,
        paddingLeft: theme.spacing.unit * 10,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: 120,
            '&:focus': {
                width: 200,
            },
        },
    },
    grow: {
        flexGrow: 1,
    },
});

class EnhancedTableToolbar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            anchorEl: null,

        }
    }

    handleMenuOpen = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleMenuClose = () => {
        this.setState({ anchorEl: null });
    };

    render() {
        const { classes, tableTitle, search, filterItems, onFilterItemClick } = this.props;
        const { anchorEl } = this.state;

        return (
            <Toolbar className={classes.root}>

                {/* Table Title */}
                <div className={classes.title}>
                    <Typography variant="title" id="tableTitle"> {tableTitle} </Typography>
                </div>

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
                        onChange={(e) => search(e.target.value)}
                    />
                </div>

                {/* Filter Button */}
                <div className={classes.actions}>
                    <Tooltip title="Filter list">
                        <IconButton aria-label="Filter list" onClick={this.handleMenuOpen}>
                            <FilterListIcon />
                        </IconButton>
                    </Tooltip>

                    {/* Filter Menu */}
                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={this.handleMenuClose}
                    >
                        {
                            // Display all of the items to be displayed in the filter
                            filterItems.map((item, index) => {
                                return (
                                    <MenuItem key={'mi-' + index} onClick={() => { this.handleMenuClose(); onFilterItemClick(item) }}>{item}</MenuItem>
                                );
                            })
                        }
                    </Menu>
                </div>
            </Toolbar >
        );
    }
}

EnhancedTableToolbar.propTypes = {
    classes: PropTypes.object.isRequired,

    // Items to display in the filter menu
    filterItems: PropTypes.array.isRequired,

    // Title of the table
    tableTitle: PropTypes.string.isRequired,

    // Search Function called when the input search text changes
    search: PropTypes.func.isRequired,

    // Filter Function called when a filter option is chosen
    onFilterItemClick: PropTypes.func.isRequired,
};

EnhancedTableToolbar = withStyles(toolbarStyles)(EnhancedTableToolbar);

const styles = theme => ({
    root: {
        width: '95%',
        marginTop: theme.spacing.unit * 3,
        marginLeft: '2.5%'
    },
    table: {
    },
    tableWrapper: {
        overflowX: 'auto',
    },
    button: {
        margin: theme.spacing.unit,
    },
    rightIcon: {
        marginLeft: theme.spacing.unit,
    },
    subheading: {
        padding: theme.spacing.unit * 3,
    },
    fab: {
        position: 'fixed',
        bottom: theme.spacing.unit * 8,
        right: theme.spacing.unit * 8,
    },
    rowIcon: {
        display: 'flex',
    },
    icon: {
        marginTop: -2,
        marginLeft: 10,
    }
});

class EnhancedTable extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            order: 'asc',
            orderBy: this.props.orderBy,
            data: this.props.rows,
            displayData: this.props.rows,
            page: 0,
            rowsPerPage: 5,
        };

        this.search = this.search.bind(this);
    }

    createCell(cell, index, rowID) {
        return (
            <TableCell key={rowID + '-' + index} component="th" scope="row" padding={index === 0 ? 'default' : 'none'}>
                <div className={this.props.classes.rowIcon}>
                    <Typography color={cell.color === 'error' ? 'error' : 'default'}>{cell.value}</Typography>
                    <div className={this.props.classes.icon}>{cell.icon}</div>
                </div>
            </TableCell>
        );
    }

    search(text) {
        const { data } = this.state;

        let filteredData = data.filter((row) => {
            return Object.getOwnPropertyNames(row).some((prop) => {
                if (prop === 'id')
                    return false;
                if (row[prop]) {
                    if (row[prop].value)
                        return row[prop].value.toString().toLowerCase().indexOf(text) !== -1;
                }
                return false;
            });
        });

        this.setState({ displayData: filteredData });
    }

    filter(filter) {
        // Find the right filter
        let filterFunc = this.props.filters.find(i => { return i.label === filter }).func;

        this.setState({ displayData: this.state.data.filter(filterFunc) });
    }

    handleRequestSort = (event, property) => {
        const orderBy = property;
        let order = 'desc';

        if (this.state.orderBy === property && this.state.order === 'desc') {
            order = 'asc';
        }

        this.setState({ order, orderBy });
    };

    handleClick = (event, id) => {

    };

    handleFilterItemClick = (item) => {
        console.log(item);
    }

    handleChangePage = (event, page) => {
        this.setState({ page });
    };

    handleChangeRowsPerPage = event => {
        this.setState({ rowsPerPage: event.target.value });
    };

    render() {
        const { classes, title, filters, onRowClick, columns, onAddClick } = this.props;
        const { displayData, order, orderBy, rowsPerPage, page } = this.state;

        return (
            <Paper className={classes.root}>
                <EnhancedTableToolbar
                    tableTitle={title}
                    filterItems={filters.map(filter => { return filter.label })}
                    onFilterItemClick={this.filter.bind(this)}
                    search={this.search}
                />
                <div className={classes.tableWrapper}>
                    <Table className={classes.table} aria-labelledby="tableTitle">
                        <EnhancedTableHead
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={this.handleRequestSort}
                            columns={columns}
                        />
                        <TableBody>
                            {stableSort(displayData, getSorting(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row) => {
                                    return (
                                        <TableRow
                                            hover
                                            onClick={() => onRowClick(row)}
                                            key={row.id}
                                        >
                                            {
                                                /**
                                                 * Each attribute should be printed with the appropriate column but each row
                                                 * starts with an id attribute which should be ignored, so decrement the index
                                                 * by one since the columns does not have an id attribute
                                                 */
                                                Object.getOwnPropertyNames(row).reduce((all, prop, index) => {
                                                    if (prop !== 'id')
                                                        all.push(this.createCell(row[prop], index - 1, row.id));
                                                    return all;
                                                }, [])
                                            }
                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>

                    {
                        // If there are no rows, then display a message
                        displayData.length === 0 ?
                            (
                                <div>
                                    <div className={classes.spacer} />
                                    <Typography align='center' variant='subheading' className={classes.subheading}> No Rows! </Typography>
                                </div>
                            )
                            : (null)
                    }
                </div>
                <TablePagination
                    component="div"
                    count={displayData.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    backIconButtonProps={{
                        'aria-label': 'Previous Page',
                    }}
                    nextIconButtonProps={{
                        'aria-label': 'Next Page',
                    }}
                    onChangePage={this.handleChangePage}
                    onChangeRowsPerPage={this.handleChangeRowsPerPage}
                />

                {
                    // Display an 'ADD' button if the onClick function is provided
                    onAddClick ?
                        (
                            <Button variant="fab" className={classes.fab} color='primary' onClick={onAddClick}><AddIcon /></Button>
                        )
                        : (null)
                }


            </Paper>
        );
    }
}

EnhancedTable.propTypes = {
    classes: PropTypes.object.isRequired,
    onRowClick: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    filters: PropTypes.arrayOf(PropTypes.object).isRequired,
    columns: PropTypes.arrayOf(PropTypes.object).isRequired,
    rows: PropTypes.arrayOf(PropTypes.object).isRequired,
    orderBy: PropTypes.string.isRequired,
    onAddClick: PropTypes.func,
};

export default withStyles(styles)(EnhancedTable);
