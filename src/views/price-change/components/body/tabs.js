import * as React from 'react';
import { Tabs, Tab, Box } from '@mui/material';
import PropTypes from 'prop-types';

function a11yProps(index) {
    return {
        id: `item-tab-${index}`,
        'aria-controls': `item-tabpanel-${index}`
    };
}

export default function ItemTabs({ maincategories, value, handleChange, onPressed }) {
    const handleTabClick = (category) => {
        onPressed(category.id);
    };
    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    variant="scrollable"
                    scrollButtons="auto"
                    aria-label="main category listing tab"
                >
                    {maincategories &&
                        maincategories.map((category, index) => (
                            <Tab key={index} label={category.name} {...a11yProps(index)} onClick={() => handleTabClick(category)} />
                        ))}
                </Tabs>
            </Box>
        </Box>
    );
}

ItemTabs.propTypes = {
    maincategories: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    value: PropTypes.number,
    handleChange: PropTypes.func,
    onPressed: PropTypes.func
};
