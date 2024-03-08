import { Button, CircularProgress, FormControl, FormHelperText, Grid, InputLabel, OutlinedInput } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import PropTypes from 'prop-types';

const validationSchema = Yup.object().shape({
    name: Yup.string().required('Site name is required'),
    sub_city: Yup.string().required('Sub city is required'),
    woreda: Yup.string().required('Woreda is required'),
    starting_address: Yup.string().required('Starting address is required'),
    end_address: Yup.string().required('End address is required')
});

const EditForm = ({ site, handleClose, handleSiteEditing, isSubmitting }) => {
    const formik = useFormik({
        initialValues: {
            name: site?.name ? site.name : '',
            sub_city: site?.sub_city ? site.sub_city : '',
            woreda: site?.woreda ? site.woreda : '',
            starting_address: site?.starting_address ? site.starting_address : '',
            end_address: site?.end_address ? site.end_address : '',
            latitude: site?.latitude ? site.latitude : '',
            longitude: site?.longitude ? site.longitude : ''
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            handleSiteEditing(values);
        }
    });

    return (
        <form noValidate onSubmit={formik.handleSubmit} onReset={formik.handleReset} style={{ minWidth: '80%' }}>
            <Grid container sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Grid item xs={12}>
                    <InputLabel htmlFor="name" sx={{ marginTop: 2, marginBottom: 0.5, paddingLeft: 1 }}>
                        Site name
                    </InputLabel>
                    <FormControl fullWidth error={formik.touched.name && Boolean(formik.errors.name)}>
                        <OutlinedInput id="name" name="name" fullWidth value={formik.values.name} onChange={formik.handleChange} />

                        {formik.touched.name && formik.errors.name && (
                            <FormHelperText error id="standard-weight-helper-text-name">
                                {formik.errors.name}
                            </FormHelperText>
                        )}
                    </FormControl>
                </Grid>

                <Grid item xs={12}>
                    <InputLabel htmlFor="sub_city" sx={{ marginTop: 2, marginBottom: 0.5, paddingLeft: 1 }}>
                        Sub City
                    </InputLabel>
                    <FormControl fullWidth error={formik.touched.sub_city && Boolean(formik.errors.sub_city)}>
                        <OutlinedInput
                            id="sub_city"
                            name="sub_city"
                            fullWidth
                            value={formik.values.sub_city}
                            onChange={formik.handleChange}
                        />

                        {formik.touched.sub_city && formik.errors.sub_city && (
                            <FormHelperText error id="standard-weight-helper-text-sub_city">
                                {formik.errors.sub_city}
                            </FormHelperText>
                        )}
                    </FormControl>
                </Grid>

                <Grid item xs={12}>
                    <InputLabel htmlFor="woreda" sx={{ marginTop: 2, marginBottom: 0.5, paddingLeft: 1 }}>
                        Woreda
                    </InputLabel>
                    <FormControl fullWidth error={formik.touched.woreda && Boolean(formik.errors.woreda)}>
                        <OutlinedInput id="woreda" name="woreda" fullWidth value={formik.values.woreda} onChange={formik.handleChange} />

                        {formik.touched.woreda && formik.errors.woreda && (
                            <FormHelperText error id="standard-weight-helper-text-woreda">
                                {formik.errors.woreda}
                            </FormHelperText>
                        )}
                    </FormControl>
                </Grid>

                <Grid item xs={12}>
                    <Grid container sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Grid item xs={5.8}>
                            <InputLabel htmlFor="starting_address" sx={{ marginTop: 2, marginBottom: 0.5, paddingLeft: 1 }}>
                                Starting Address
                            </InputLabel>
                            <FormControl fullWidth error={formik.touched.starting_address && Boolean(formik.errors.starting_address)}>
                                <OutlinedInput
                                    id="starting_address"
                                    name="starting_address"
                                    fullWidth
                                    value={formik.values.starting_address}
                                    onChange={formik.handleChange}
                                />

                                {formik.touched.starting_address && formik.errors.starting_address && (
                                    <FormHelperText error id="standard-weight-helper-text-starting_address">
                                        {formik.errors.starting_address}
                                    </FormHelperText>
                                )}
                            </FormControl>
                        </Grid>
                        <Grid item xs={5.8}>
                            <InputLabel htmlFor="end_address" sx={{ marginTop: 2, marginBottom: 0.5, paddingLeft: 1 }}>
                                End Address
                            </InputLabel>
                            <FormControl fullWidth error={formik.touched.end_address && Boolean(formik.errors.end_address)}>
                                <OutlinedInput
                                    id="end_address"
                                    name="end_address"
                                    fullWidth
                                    value={formik.values.end_address}
                                    onChange={formik.handleChange}
                                />

                                {formik.touched.end_address && formik.errors.end_address && (
                                    <FormHelperText error id="standard-weight-helper-text-end_address">
                                        {formik.errors.end_address}
                                    </FormHelperText>
                                )}
                            </FormControl>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Grid container sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Grid item xs={5.8}>
                            <InputLabel htmlFor="latitude" sx={{ marginTop: 2, marginBottom: 0.5, paddingLeft: 1 }}>
                                Latitude
                            </InputLabel>
                            <FormControl fullWidth error={formik.touched.latitude && Boolean(formik.errors.latitude)}>
                                <OutlinedInput
                                    id="latitude"
                                    name="latitude"
                                    fullWidth
                                    value={formik.values.latitude}
                                    onChange={formik.handleChange}
                                />

                                {formik.touched.latitude && formik.errors.latitude && (
                                    <FormHelperText error id="standard-weight-helper-text-latitude">
                                        {formik.errors.latitude}
                                    </FormHelperText>
                                )}
                            </FormControl>
                        </Grid>
                        <Grid item xs={5.8}>
                            <InputLabel htmlFor="longitude" sx={{ marginTop: 2, marginBottom: 0.5, paddingLeft: 1 }}>
                                Longitude
                            </InputLabel>
                            <FormControl fullWidth error={formik.touched.longitude && Boolean(formik.errors.longitude)}>
                                <OutlinedInput
                                    id="longitude"
                                    name="longitude"
                                    fullWidth
                                    value={formik.values.longitude}
                                    onChange={formik.handleChange}
                                />

                                {formik.touched.longitude && formik.errors.longitude && (
                                    <FormHelperText error id="standard-weight-helper-text-longitude">
                                        {formik.errors.longitude}
                                    </FormHelperText>
                                )}
                            </FormControl>
                        </Grid>
                    </Grid>

                    <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', marginTop: 2 }}>
                        <Button onClick={handleClose}>Close</Button>
                        <Button type="submit" variant="contained" sx={{ paddingX: 8, marginLeft: 2 }}>
                            {isSubmitting ? <CircularProgress size={20} sx={{ color: 'white' }} /> : 'Done'}
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </form>
    );
};

EditForm.propTypes = {
    site: PropTypes.oneOf([PropTypes.object, PropTypes.array]),
    handleClose: PropTypes.func,
    handleSiteEditing: PropTypes.func,
    isSubmitting: PropTypes.bool
};

export default EditForm;
