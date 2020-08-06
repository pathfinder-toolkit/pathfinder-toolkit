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

import Comment from "../../Comment/CommentComponents/Comment";
import { useBackend } from "../../../utils/BackendProvider";

const ManageCommentReports = ( {style} ) => {
    const classes = style;

    const [ pending, setPending ] = useState(false)

    const [ page, setPage ] = useState(1);
    const [ perPage, setPerPage ] = useState(5);
    const [ maxPages, setMaxPages ] = useState(1);
    const [ reports, setReports ] = useState();

    const {
        getCommentReportsForAdmin,
        rejectSelectedReportAsAdmin,
        approveSelectedReportAsAdmin
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

    const approveReport = async (idReport) => {
        await approveSelectedReportAsAdmin(idReport);
        await updateReports();
    }

    const rejectReport = async (idReport) => {
        await rejectSelectedReportAsAdmin(idReport);
        await updateReports();
    }

    const changePerPage = (e) => {
        setPerPage(e.target.value);
    }

    const nextPage = () => {
        setPage(current => current + 1);
    }

    const previousPage = () => {
        setPage(current => current - 1);
    }

    useEffect(() => {
        updateReports();
    }, [page, perPage, updateReports]);

    return <React.Fragment>
        <Typography variant="h4" component="h4" className={classes.header}>Review comment reports</Typography>
        <TableContainer component={Paper} className={classes.tableRoot} >
            <Table>
                <TableBody>
                    <TableRow>
                        <TableCell>
                            <b>Reason for report</b>
                        </TableCell>
                        <TableCell align="center">
                            <b>Comment</b>
                        </TableCell>
                        <TableCell align="right">
                            <b>Delete comment and report</b>
                        </TableCell>
                        <TableCell align="right">
                            <b>Dismiss report</b>
                        </TableCell>
                    </TableRow>
                    {!pending && reports?.map((report) => {
                        return (
                            <TableRow key={report.idReport}>
                                <TableCell>
                                    {report.reason}
                                </TableCell>
                                <TableCell>
                                    <Paper>
                                        <Comment 
                                        comment={report.comment}
                                        classes={classes}
                                        actionsDisabled={true}
                                        />
                                    </Paper>
                                </TableCell>
                                <TableCell align="right">
                                    <Button
                                    variant="contained"
                                    color="secondary"
                                    onClick={() => {approveReport(report.idReport)}}
                                    >
                                        Delete comment
                                    </Button>
                                </TableCell>
                                <TableCell align="right">
                                    <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => {rejectReport(report.idReport)}}
                                    >
                                        Dismiss report
                                    </Button>
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TablePagination 
                        rowsPerPageOptions={[5, 10]}
                        onChangeRowsPerPage={changePerPage}
                        rowsPerPage={perPage}
                        count={-1}
                        labelDisplayedRows={() => {return ""}}
                        nextIconButtonProps={{
                            disabled: (page === maxPages || page > maxPages),
                            onClick: nextPage
                        }}
                        backIconButtonProps={{
                            disabled: (page === 1 || page < 1),
                            onClick: previousPage
                        }}
                        onChangePage={() => {}}
                        />
                    </TableRow>
                </TableFooter>
            </Table>
        </TableContainer>
    </React.Fragment>
};

export default ManageCommentReports;