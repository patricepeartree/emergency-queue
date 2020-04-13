import React, { useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';

function Test() {

    // to test server integration
    useEffect(() => {
        axios.get("http://localhost:8080/api/test")
            .then((resp: AxiosResponse) => console.log(resp));
    }, []);

    return null;
}

export default Test;