import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Launch from "@material-ui/icons/Launch";
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import { useBackend } from "../../utils/BackendProvider";
import history from "../../utils/history";

import BuildingsTableToolbar from "./BuildingsTableToolbar";
import BuildingsTableHead from "./BuildingsTableHead";
import ImageWithModal from "../reusable/ImageWithModal";

import { useAuth0 } from "../../utils/react-auth0-spa"




function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
  headerRow: {
    height:75,
  },
  row: {
    height:110
  },
  card: {
    maxWidth:90
  },
  cardMedia: {
    height:90,
    maxWidth:90,
    "&:hover": {
      cursor:"pointer"
    }
  }
}));


const BuildingsTable = () => {
  const classes = useStyles();
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('date');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const {getStoredBuildings} = useBackend();
  const [rows, setRows] = useState([]);

  const { loading } = useAuth0();

  useEffect(() => {
    async function fetchData() {
      const data = await getStoredBuildings();
      if (data) {
        setRows(data);
      }
    }
    if (!loading) {
      fetchData();
    }
  },[loading]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 5));
    setPage(0);
  };

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  const headCells = [
    { id: 'name', numeric: false, disablePadding: true, label: 'Saved building name' },
    { id: 'image', numeric: false, disablePadding: false, label: 'Image'},
    { id: 'creationDate', numeric: true, disablePadding: false, label: 'Creation date' },
    { id: 'slug', numeric: true, disablePadding: false, label: 'Open in detail' },
  ];

  const _handleClick = (slug) => {
    const addr = "/buildings/" + slug;
    history.push(addr);
  }

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <BuildingsTableToolbar />
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={'medium'}
            aria-label="enhanced table"
          >
            <BuildingsTableHead
              classes = {classes}
              headers = {headCells}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      className={classes.row}
                      hover
                      tabIndex={-1}
                      key={row.name}
                    >
                      <TableCell padding="checkbox">
                      </TableCell>
                      <TableCell component="th" id={labelId} scope="row" padding="none">
                        {row.name}
                      </TableCell>
                      <TableCell align="left">
                        <ImageWithModal image={row.image} width={90} height={90}/>
                      </TableCell>
                      <TableCell align="right">{row.creationDate}</TableCell>
                      <TableCell align="right"><Button variant="contained" color="primary" onClick={() => {_handleClick(row.slug)}}> <Launch /> </Button></TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 106 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}

export default BuildingsTable;