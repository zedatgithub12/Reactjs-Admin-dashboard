import { Button, CircularProgress, FormControl, FormHelperText, Grid, InputLabel, MenuItem, OutlinedInput, Select } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { ShopLevels } from 'data/static/shopLevels';

const validationSchema = Yup.object().shape({
    name: Yup.string().required('Site name is required'),
    site_id: Yup.number().required('Site name is required'),
    level: Yup.string().required('Shop level is required')
});

const ApprovalForm = ({ sites, handleClose, handleApproval, isSubmitting }) => {
    const formik = useFormik({
        initialValues: {
            site_id: '',
            name: '',
            level: ''
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            handleApproval(values);
        }
    });

    return (
        <form noValidate onSubmit={formik.handleSubmit} onReset={formik.handleReset} style={{ minWidth: '80%' }}>
            <Grid container sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Grid item xs={12}>
                    <InputLabel htmlFor="name" sx={{ marginTop: 2, marginBottom: 0.5, paddingLeft: 1 }}>
                        Site
                    </InputLabel>
                    <FormControl fullWidth error={formik.touched.name && Boolean(formik.errors.name)}>
                        <Select
                            labelId="name"
                            id="name"
                            name="name"
                            value={formik.values.name}
                            onChange={(e) => {
                                const selectedSite = sites.find((site) => site.name === e.target.value);
                                formik.setValues({
                                    ...formik.values,
                                    name: e.target.value,
                                    site_id: selectedSite ? selectedSite.id : '' // Set site_id based on selected site id
                                });
                            }}
                            displayEmpty
                            renderValue={(selected) => {
                                if (!selected) {
                                    return <span>Select site</span>;
                                }
                                return selected;
                            }}
                        >
                            <MenuItem value="" disabled>
                                Please select the site
                            </MenuItem>

                            {sites?.map((site, index) => (
                                <MenuItem key={index} value={site.name}>
                                    {site.name}
                                </MenuItem>
                            ))}
                        </Select>
                        {formik.touched.name && formik.errors.name && (
                            <FormHelperText error id="standard-weight-helper-text-name">
                                {formik.errors.name}
                            </FormHelperText>
                        )}
                    </FormControl>
                </Grid>

                <Grid item xs={12}>
                    <InputLabel htmlFor="level" sx={{ marginTop: 2, marginBottom: 0.5, paddingLeft: 1 }}>
                        Shop Level
                    </InputLabel>
                    <FormControl fullWidth error={formik.touched.level && Boolean(formik.errors.level)}>
                        <Select
                            labelId="level"
                            id="level"
                            name="level"
                            value={formik.values.level}
                            onChange={formik.handleChange}
                            displayEmpty
                            renderValue={(selected) => {
                                if (!selected) {
                                    return <span>Select shop level</span>;
                                }
                                return selected;
                            }}
                        >
                            <MenuItem value="" disabled>
                                Please select shop level
                            </MenuItem>

                            {ShopLevels?.map((level, index) => (
                                <MenuItem key={index} value={level} sx={{ textTransform: 'capitalize' }}>
                                    {level}
                                </MenuItem>
                            ))}
                        </Select>
                        {formik.touched.level && formik.errors.level && (
                            <FormHelperText error id="standard-weight-helper-text-level">
                                {formik.errors.level}
                            </FormHelperText>
                        )}
                    </FormControl>
                </Grid>

                <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', marginTop: 4 }}>
                    <Button onClick={handleClose}>Close</Button>
                    <Button type="submit" variant="contained" sx={{ paddingX: 4, marginLeft: 2 }}>
                        {isSubmitting ? <CircularProgress size={20} sx={{ color: 'white' }} /> : 'Approve'}
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
};

ApprovalForm.propTypes = {
    sites: PropTypes.oneOf([PropTypes.object, PropTypes.array]),
    handleClose: PropTypes.func,
    handleSiteAddition: PropTypes.func,
    isSubmitting: PropTypes.bool
};

export default ApprovalForm;
