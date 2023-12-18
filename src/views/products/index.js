// material-ui

import { Grid, Typography } from '@mui/material';
import Connections from 'api';
import { useEffect, useState } from 'react';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import { RefreshToken } from 'utils/token-refresh';

// ==============================|| PRODUCT PAGE ||============================== //

const Products = () => {
    const [Catgeories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [refreshed, setRefreshed] = useState(false);

    const handleCategoryFetching = async () => {
        const tokenExpiration = sessionStorage.getItem('tokenExpiration');
        const currentTime = new Date().getTime();

        if (tokenExpiration && currentTime >= tokenExpiration) {
            await RefreshToken();
            setRefreshed(true);
        } else {
            FetchCategory();
        }
    };

    const FetchCategory = async () => {
        // Token is still valid, proceed with the request using the stored token
        setIsLoading(true);
        const token = sessionStorage.getItem('token');
        var Api = Connections.api + Connections.main_cat;

        fetch(Api, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
            .then((response) => response.json())
            .then((response) => {
                if (response.success) {
                    setCategories(response.data);
                    setIsLoading(false);
                    setRefreshed(false);
                }
            })
            .catch((error) => {
                setIsLoading(false);
                setRefreshed(false);
            });
    };

    useEffect(() => {
        if (refreshed) {
            FetchCategory();
        }
        return () => {};
    }, [refreshed]);

    return (
        <MainCard>
            <Grid container>
                <Grid item xs={12}>
                    <Grid container>
                        <Grid item xs={12}>
                            <Typography variant="h3">Page </Typography>
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item xs={12}>
                            <Typography variant="body2">Body of content</Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </MainCard>
    );
};

export default Products;
