import React, {createContext, useState, useEffect} from "react";
// import { API_Json } from './../api/API';
import axios from 'axios';

export const NewsComp = createContext();

export const NewsCompProvider = (props) => {
    const [data, setData] = useState();
    const apiKey = 'c1c56bdf71c14d1cabebd9a4f6610a9d';

    useEffect(() => {
        axios
            .get(`https://newsapi.org/v2/everything?q=apple&from=2022-02-06&to=2022-02-06&sortBy=popularity&apiKey=${apiKey}`
            )
            .then((res) => setData(res.data))
            .catch((err) => console.log(err));
    }, [data]);
    
    return (
        <NewsCompProvider value={{data}}>
            {props.children}
        </NewsCompProvider>
    );
};
