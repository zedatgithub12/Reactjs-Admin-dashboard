import { useState } from 'react';
import { Box, CircularProgress, Grid, IconButton, Typography, useTheme } from '@mui/material';
import { IconChevronDown, IconChevronRight } from '@tabler/icons';
import PropTypes from 'prop-types';

const AllItems = ({ loading, data }) => {
    const theme = useTheme();

    const [expand, setExpand] = useState(false);
    const [selectedItemId, setSelectedItemId] = useState(null);

    const handleExapnd = (itemId) => {
        setSelectedItemId(itemId);
        setExpand(!expand);
    };
    return (
        <Grid container>
            <Grid item xs={12}>
                {loading ? (
                    <Box sx={{ padding: 4, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <CircularProgress size={24} />
                    </Box>
                ) : (
                    data &&
                    data.map((subCat, index) => (
                        <Box
                            key={index}
                            sx={{
                                padding: 1,
                                cursor: 'pointer',
                                backgroundColor:
                                    expand && selectedItemId === subCat.id ? theme.palette.grey[100] : theme.palette.primary.light
                            }}
                            onClick={() => handleExapnd(subCat.id)}
                        >
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <IconButton onClick={() => handleExapnd(subCat.id)}>
                                        {expand && selectedItemId === subCat.id ? (
                                            <IconChevronDown size={16} />
                                        ) : (
                                            <IconChevronRight size={16} />
                                        )}
                                    </IconButton>
                                    <Typography variant="subtitle1">{subCat.name}</Typography>
                                </Box>
                                <Typography variant="body1">{subCat.items.length}</Typography>
                            </Box>
                            {expand && selectedItemId === subCat.id && (
                                <Box>
                                    {subCat.items &&
                                        subCat.items.map((item, index) => (
                                            <Box key={index}>
                                                <Typography variant="body2">{item.name}</Typography>
                                            </Box>
                                        ))}
                                </Box>
                            )}
                        </Box>
                    ))
                )}
            </Grid>
        </Grid>
    );
};

AllItems.propTypes = {
    data: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
};
export default AllItems;
