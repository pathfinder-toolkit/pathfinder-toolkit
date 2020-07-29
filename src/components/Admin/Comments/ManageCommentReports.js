import React, { useState, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import Paper from '@material-ui/core/Paper';
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button'

import { useBackend } from "../../../utils/BackendProvider";

const ManageCommentReports = ( {style} ) => {
    const classes = style;

    const [ pending, setPending ] = useState(false)

    const [ page, setPage ] = useState(1);
    const [ perPage, setPerPage ] = useState(5);
    const [ maxPages, setMaxPages ] = useState(1);
    const [ reports, setReports ] = useState();

    const {
        getCommentReportsForAdmin
    } = useBackend();

    const updateReports = async () => {
        setPending(true);
        const response = await getCommentReportsForAdmin(page, perPage);
        console.log(response);
        if (response.status === 200) {
            setReports(response.data.reports);
            setMaxPages(response.data.maxPages);
        }
        setPending(false);
    }

    useEffect(() => {
        updateReports();
    }, [page, perPage]);

    return <React.Fragment>
        <Typography variant="h4" component="h4" className={classes.header}>Manage comment reports</Typography>
        <TableContainer component={Paper} className={classes.tableRoot} >
            <Table>
                <TableBody>
                    {reports?.map((report) => {
                        return (
                        <TableRow>
                            <TableCell>
                                {report.reason}
                            </TableCell>
                            <TableCell>
                                {report.reportedBy}
                            </TableCell>
                            <TableCell align="right">
                                <Button
                                variant="contained"
                                color="secondary"
                                >
                                    Delete comment
                                </Button>
                            </TableCell>
                            <TableCell align="right">
                                <Button
                                variant="contained"
                                color="primary"
                                >
                                    Clear report
                                </Button>
                            </TableCell>
                        </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    </React.Fragment>
};

export default ManageCommentReports;