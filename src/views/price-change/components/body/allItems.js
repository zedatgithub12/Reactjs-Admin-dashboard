import { useState } from 'react';
import { Box, CircularProgress, Grid, IconButton, Typography, useTheme } from '@mui/material';
import { IconChevronDown, IconChevronRight } from '@tabler/icons';
import PropTypes from 'prop-types';
import ItemListingOne from 'ui-component/items/Listing';

const AllItems = ({ loading, data }) => {
    const theme = useTheme();
    const [expand, setExpand] = useState(false);
    const [selectedItemId, setSelectedItemId] = useState(null);

    const handleExapnd = (itemId) => {
        if (itemId === selectedItemId) {
            setExpand(!expand);
        } else {
            setSelectedItemId(itemId);
            setExpand(true);
        }
    };

    function isDateEqualToToday(dateString) {
        const inputDate = new Date(dateString);
        const today = new Date();

        // Extract year, month, and day from input date
        const inputYear = inputDate.getFullYear();
        const inputMonth = inputDate.getMonth();
        const inputDay = inputDate.getDate();

        // Extract year, month, and day from today's date
        const currentYear = today.getFullYear();
        const currentMonth = today.getMonth();
        const currentDay = today.getDate();

        // Compare the date components
        if (inputYear === currentYear && inputMonth === currentMonth && inputDay === currentDay) {
            return true;
        }

        return false;
    }

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
                        >
                            <Box
                                sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                                onClick={() => handleExapnd(subCat.id)}
                            >
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
                                <Typography variant="body1" marginRight={2}>
                                    {subCat.items.length} አይነት
                                </Typography>
                            </Box>

                            {expand && selectedItemId === subCat.id && (
                                <Box>
                                    {subCat.items &&
                                        subCat.items.map((item, index) => (
                                            <ItemListingOne
                                                key={index}
                                                image={item.picture}
                                                brand={item.brand}
                                                updated={isDateEqualToToday(item.updated_at)}
                                                code={item.code}
                                                sku={item.sku}
                                                price={item.price}
                                                status={item.status}
                                            />
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
