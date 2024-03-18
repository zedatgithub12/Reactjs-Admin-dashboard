import { useState } from 'react';
// material-ui
import { Dialog, DialogTitle, DialogContent, TextField, Button, DialogActions, Autocomplete, CircularProgress } from '@mui/material';
import Connections from 'api';

const EditSubCateory = ({ editDialogOpen, handleEditDialogClose, selectedCategory, mainCategories }) => {
    const [newCategoryName, setNewCategoryName] = useState('');
    const [newCategoryDesc, setNewCategoryDesc] = useState('');

    const handleMainCategoryUpdate = (value) => {
        setNewCategoryName(value.id);
    };

    const handleEditCategory = () => {
        setSpinner(true);
        const Api = Connections.api + Connections.sub_cat + '/' + selectedCategory.id;
        const headers = {
            accept: 'application/json',
            'Content-Type': 'application/json'
        };

        const data = {
            main_category_id: newCategoryName,
            name: newCategoryDesc
        };

        fetch(Api, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(data)
        })
            .then((response) => response.json())
            .then((response) => {
                if (response.success) {
                    setPopup({
                        ...popup,
                        status: true,
                        severity: 'success',
                        message: response.message
                    });
                    setSpinner(false);
                    handleEditDialogClose();
                } else {
                    setPopup({
                        ...popup,
                        status: true,
                        severity: 'error',
                        message: response.message
                    });
                    setSpinner(false);
                }
            })
            .catch(() => {
                setPopup({
                    ...popup,
                    status: true,
                    severity: 'error',
                    message: 'There is error editing category!'
                });
                setSpinner(false);
            });
    };
    return (
        <Dialog open={editDialogOpen} onClose={handleEditDialogClose}>
            <DialogTitle variant="h4">Edit Sub Category</DialogTitle>
            <DialogContent>
                <Autocomplete
                    options={mainCategories}
                    getOptionLabel={(option) => option.name}
                    defaultValue={{ name: newCategoryName }}
                    onChange={(event, value) => {
                        if (value) {
                            handleMainCategoryUpdate(value);
                        }
                    }}
                    renderInput={(params) => (
                        <TextField {...params} margin="dense" label="Main Category" variant="outlined" fullWidth required />
                    )}
                />
                <TextField
                    margin="dense"
                    label="Sub Category"
                    color="primary"
                    value={newCategoryDesc}
                    onChange={(e) => setNewCategoryDesc(e.target.value)}
                    fullWidth
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleEditDialogClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={() => handleEditCategory()} color="primary">
                    {spinner ? <CircularProgress size={20} color="primary" /> : 'Save'}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditSubCateory;
