import { useState, Fragment } from 'react';
import { SnackbarProvider, enqueueSnackbar } from 'notistack';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Connections from 'api';
import PropTypes from 'prop-types';
import EditForm from './EditForm';

function EditSite({ site, open, handleClose }) {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSiteEditing = (values) => {
        setIsSubmitting(true);
        const Api = Connections.api + Connections.sites + `/${site.id}`;
        const headers = {
            accept: 'application/json',
            'Content-Type': 'application/json'
        };

        const data = {
            name: values.name,
            sub_city: values.sub_city,
            woreda: values.woreda,
            starting_address: values.starting_address,
            end_address: values.end_address,
            latitude: values.latitude,
            longitude: values.longitude
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

    return (
        <Fragment>
            <Dialog open={open} onClose={handleClose} sx={{ minWidth: '400px' }}>
                <DialogTitle variant="h3">Edit Site</DialogTitle>
                <DialogContent>
                    <EditForm site={site} handleClose={handleClose} handleSiteEditing={handleSiteEditing} isSubmitting={isSubmitting} />
                </DialogContent>
            </Dialog>
            <SnackbarProvider maxSnack={3} />
        </Fragment>
    );
}

EditSite.propTypes = {
    site: PropTypes.oneOf([PropTypes.object, PropTypes.array]),
    open: PropTypes.bool,
    handleClose: PropTypes.func
};

export default EditSite;
