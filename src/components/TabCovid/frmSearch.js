import React from 'react';
import Downshift from 'downshift';
import { API_covidstat } from '../../api/API'
import symbolList from '../TabStocks/stocks-symbols.js'
import { forEach } from 'lodash';

export var pCountry = "";
var countries;

function getcountries() {
    let countriesdata = API_covidstat.get(`/countries`).then(function (response) {
        countries = response.data.response;
        countries = countries.map(function (x) {
            return {
                "symbol": x,
                "name" : x
            }
        });
        return response.data.response;
    }).catch(function (error) {
        console.error(error);
    });
    return countriesdata;
}

export default function frmSearch(props) {
    var countriess = getcountries();
    var countriess2 = Promise.resolve(countriess);
    //var countriess3 = countriess2.map((x) => {
    //    return {
    //        symbol: x,
    //        name : x
    //    };
    //});
    console.log("Doraemon");
    console.log(countriess2);
    var ll = async function () {
        let Output = await countriess2.then((dat) => { console.log(dat); });
    }
    

    countries = [
        {
            "symbol": "SGP",
            "name": "Singapore"
        },
        {
            "symbol": "MYS",
            "name": "Malaysia"
        }];
    //API_covidstat.get(`/countries`).then(function (response) {
    //    console.log(response.data);
    //    this.countries = response.data.response;
    //    console.log(countries);
    //    //drawForm(response.data);
    //}).catch(function (error) {
    //    console.error(error);
    //});
    

    //if (countries != "undefined") {
    //    console.log(countries.length);

    //}
    //console.log(countries);

    //let countries = getCountries();

    //console.log(countries);

    //(async () => {
    //    let countries = await getCountries();
    //    console.log(countries);
    //})()
    const { onChange } = props;
    return (
        <Downshift
            onChange={onChange}
            itemToString={item => (item ? item.name : '')}>
            {({
                getInputProps,
                getItemProps,
                isOpen,
                inputValue,
                highlightedIndex,
                selectedItem
            }) => (
                <div>
                    <input className='input' {...getInputProps({ placeholder: "Country" })} />
                    {isOpen
                        ? countries
                            .filter(item => !inputValue || item.name.toLowerCase().includes(inputValue.toLowerCase()))
                            .slice(0, 30)
                            .map((item, index) => (
                                <div className="dropdown-item"
                                    {...getItemProps({
                                        key: item.name, index, item,
                                        style: {
                                            backgroundColor: highlightedIndex === index ? 'lightgray' : 'white',
                                            fontWeight: selectedItem === item ? 'bold' : 'normal'
                                        },
                                    })}
                                >
                                    {item.name}
                                </div>
                            ))
                        : null
                    }

                </div>
            )}
        </Downshift>
    )

}

//function drawForm(props) {
//    let countries = props.response;
//    console.log(countries);
    

//}

//async function getcountries() {
//    var countries = await API_covidstat.get(`/countries`);
//    console.log(countries.data);
//    return countries;
//}
