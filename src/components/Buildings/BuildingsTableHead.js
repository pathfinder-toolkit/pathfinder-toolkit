import React from 'react';
import PropTypes from 'prop-types';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Typography from '@material-ui/core/Typography';


const headCells = [
  { id: 'name', numeric: false, disablePadding: true, label: 'Name of building' },
  { id: 'date', numeric: true, disablePadding: false, label: 'Creation date' },
  { id: 'improvements', numeric: true, disablePadding: false, label: 'Suggested improvements' },
  { id: 'id', numeric: true, disablePadding: false, label: 'Open in detail' },
];




const BuildingsTableHead = (props) => {
  const { order, orderBy, onRequestSort, classes } = props;
  
  const createSortHandler = (property) => (event) => {
    if (property != 'id') {
        onRequestSort(event, property);
    }
  };

  return (
    <TableHead>
      <TableRow className={classes.row}>
        <TableCell>
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            {headCell.id != 'id' || 'image' ? (<TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              <Typography>{headCell.label}</Typography>
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>) : (
                <Typography>{headCell.label}</Typography>
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

BuildingsTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

export default BuildingsTableHead;