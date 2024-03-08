import { useState, Fragment, useEffect } from 'react';
import { SnackbarProvider, enqueueSnackbar } from 'notistack';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Connections from 'api';
import PropTypes from 'prop-types';
import ApprovalForm from './ApproveForm';
import { CircularProgress, Grid } from '@mui/material';

function ApprovalDialog({ cid, open, handleClose, onAdded }) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [loading, setLoading] = useState(true);
    const [site, setSite] = useState([]);
    const [paginationModel, setPaginationModel] = useState({
        pageSize: 20,
        page: 1,
        total: 0,
        lastPage: 1
    });

    const handleApproval = (values) => {
        const token = sessionStorage.getItem('token');

        setIsSubmitting(true);
        const Api = Connections.api + Connections.customers + `/approve/${cid}`;
        const headers = {
            Authorization: `Bearer ${token}`,
            accept: 'application/json',
            'Content-Type': 'application/json'
        };

        const data = {
            site_id: values.site_id,
            name: values.name,
            level: values.level
        };

        fetch(Api, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(data)
        })
            .then((response) => response.json())
            .then((response) => {
                if (response.success) {
                    setIsSubmitting(false);
                    handleClose();
                    onAdded();
                    handlePrompts(response.message, 'success');
                } else {
                    setIsSubmitting(false);
                    handlePrompts(response.message, 'error');
                }
            })
            .catch((error) => {
                setIsSubmitting(false);
                handlePrompts(error.message, 'success');
            });
    };

    const handlePrompts = (message, severity) => {
        enqueueSnackbar(message, { variant: severity });
    };

    useEffect(() => {
        const getSites = () => {
            setLoading(true);
            var Api =
                Connections.api + Connections.sites + `?page=${paginationModel.page}&limit=${paginationModel.pageSize}&status='active'`;
            var headers = {
                accept: 'application/json',
                'Content-Type': 'application/json'
            };

            fetch(Api, {
                method: 'GET',
                headers: headers
            })
                .then((response) => response.json())
                .then((response) => {
                    if (response.success) {
                        setSite(response.data.data);
                        setPaginationModel({
                            ...paginationModel,
                            lastPage: response.data.last_page
                        });
                        setLoading(false);
                    } else {
                        setLoading(false);
                    }
                })
                .catch(() => {
                    setLoading(false);
                });
        };

        getSites();
        return () => {};
    }, [paginationModel.page, paginationModel.pageSize]);

    return (
        <Fragment>
            <Dialog open={open} onClose={handleClose} fullWidth>
                <DialogTitle variant="h4" color="dark">
                    Approve Customer
                </DialogTitle>
                <DialogContent sx={{ minHeight: '30dvh' }}>
                    {loading ? (
                        <Grid container>
                            <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', paddingY: 3 }}>
                                <CircularProgress size={20} />
                            </Grid>
                        </Grid>
                    ) : (
                        <ApprovalForm sites={site} handleClose={handleClose} handleApproval={handleApproval} isSubmitting={isSubmitting} />
                    )}
                </DialogContent>
            </Dialog>
            <SnackbarProvider maxSnack={3} />
        </Fragment>
    );
}

ApprovalDialog.propTypes = {
    cid: PropTypes.number,
    open: PropTypes.bool,
    handleClose: PropTypes.func,
    onAdded: PropTypes.func
};

export default ApprovalDialog;
