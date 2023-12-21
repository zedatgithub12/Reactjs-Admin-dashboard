import { useState } from 'react';
import { Grid } from '@mui/material';
import { useQuery } from 'react-query';
import ItemTabs from './tabs';
import Connections from 'api';
import AllItems from './allItems';
import TodaysUpdate from './todaysupdate';

const PriceChangeBody = ({ todays }) => {
    const [loading, setLoading] = useState(false);
    const [maincategory, setCategory] = useState([]);
    const [itemLoading, setItemLoading] = useState(false);
    const [Items, setItems] = useState([]);
    const [value, setValue] = useState(0);
    const [todaysData, setTodaysData] = useState(false);
    const [paginationModel, setPaginationModel] = useState({
        pagesize: 10,
        page: 1
    });
    const [popup, setPopup] = useState({
        status: false,
        severity: 'info',
        message: ''
    });

    const FetchTodaysUpdate = () => {
        setItemLoading(true);
        var Api = Connections.api + Connections.todayupdates + `?page=${paginationModel.page}&limit=${paginationModel.pagesize}`;
        var headers = {
            accept: 'application/json',
            'Content-Type': 'application/json'
        };
        // Make the API call using fetch()
        fetch(Api, {
            method: 'GET',
            headers: headers,
            cache: 'no-cache'
        })
            .then((response) => response.json())
            .then((response) => {
                if (response.success) {
                    setTodaysData(response.data.data);
                    setItemLoading(false);
                }
            })
            .catch(() => {
                setPopup({
                    ...popup,
                    status: true,
                    severity: 'error',
                    message: 'There is error featching price updates!'
                });
                setItemLoading(false);
            });
    };

    const FetchMainCategory = () => {
        setLoading(true);
        var Api = Connections.api + Connections.main_cat;
        var headers = {
            accept: 'application/json',
            'Content-Type': 'application/json'
        };
        // Make the API call using fetch()
        fetch(Api, {
            method: 'GET',
            headers: headers,
            cache: 'no-cache'
        })
            .then((response) => response.json())
            .then((response) => {
                if (response.success) {
                    setCategory(response.data);
                    setLoading(false);
                    let id = response.data && response.data[0].id;
                    id && FetchItems(id);
                }
            })
            .catch(() => {
                setPopup({
                    ...popup,
                    status: true,
                    severity: 'error',
                    message: 'There is error featching category!'
                });
                setLoading(false);
            });
    };

    useQuery(['data'], () => FetchMainCategory(), {
        refetchOnWindowFocus: false
    });

    useQuery(['updates', todays], () => FetchTodaysUpdate(), {
        refetchOnWindowFocus: false
    });

    const FetchItems = (id) => {
        setItemLoading(true);
        var Api = Connections.api + Connections.item + '/category/' + id;
        var headers = {
            accept: 'application/json',
            'Content-Type': 'application/json'
        };
        // Make the API call using fetch()
        fetch(Api, {
            method: 'GET',
            headers: headers,
            cache: 'no-cache'
        })
            .then((response) => response.json())
            .then((response) => {
                if (response.success) {
                    setItems(response.data);
                    setItemLoading(false);
                }
            })
            .catch(() => {
                setPopup({
                    ...popup,
                    status: true,
                    severity: 'error',
                    message: 'There is error featching items!'
                });
                setItemLoading(false);
            });
    };

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Grid container>
            <Grid item xs={12}>
                {todays ? (
                    <TodaysUpdate loading={itemLoading} data={todaysData} />
                ) : (
                    <>
                        <ItemTabs maincategories={maincategory} value={value} handleChange={handleChange} onPressed={FetchItems} />
                        <AllItems loading={itemLoading} data={Items} />
                    </>
                )}
            </Grid>
        </Grid>
    );
};

export default PriceChangeBody;
