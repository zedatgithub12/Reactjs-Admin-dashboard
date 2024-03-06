const Connections = {
    // url: 'http://localhost:3000',
    api: 'http://localhost:8000/api/',
    images: 'http://localhost:8000/api/images/',
    itempictures: 'http://localhost:8000/api/itempictures/',

    //backend api endpoints
    // api: 'https://service.sheketdelivery.com/api/',
    // images: 'https://service.sheketdelivery.com/api/images/',
    // itempictures: 'https://service.sheketdelivery.com/api/itempictures/',

    signin: 'signin',
    forgotpassword: 'forgotpassword',
    resetpassword: 'resetpassword',
    refresh_token: 'refresh-token',

    // users management api endpoints
    users: 'users',
    userdata: 'users/',
    searchuser: 'users/search',
    rolebasedsearch: 'role-based-search',
    changerole: 'users/change-role',
    updatestatus: 'users/update-status',

    main_cat: 'main-categories',
    sub_cat: 'sub-categories',
    item: 'item',
    priceupdate: 'price-updates',
    todayupdates: 'priceupdates/todays',

    //category api's
    addcategory: 'addcategory',
    viewcategory: 'viewcategory',
    editcategory: 'editcategory/',
    deletecategory: 'deletecategory/',

    //sub category api's
    addsubcategory: 'addsubcategory',
    subcategory: 'subcategory/',
    viewsubcategory: 'viewsubcategory',
    editsubcategory: 'editsubcategory/',
    deletesubcategory: 'deletesubcategory/',
    sites: 'sites',
    customers: 'customers'
};

export default Connections;
