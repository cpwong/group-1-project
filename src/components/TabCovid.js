import { useState, useEffect } from 'react';
import { API_covidstat } from '../api/API';
import * as covid19Stat from './TabCovid/vwCovid';
import * as covid19Vaxed from './TabCovid/vwVaxed';
import FormSearch from './TabCovid/frmSearch';
import getcountries from './TabCovid/frmSearch';
import { first } from '@amcharts/amcharts5/.internal/core/util/Array';

export default function TabCovid() {
  const iso = require('iso-3166-1');

  var holder;

  const blankForm = {
    pCountry: 'Singapore',
  };

  const [formItem, setFormItem] = useState(blankForm); // Query form input
  const [pCountry, setSymbol] = useState('Singapore'); // Stock symbol to query
  const [isSearchBox, setSearchBox] = useState(false);
  const [firstload, setFirstLoad] = useState(false);

  //-- Handler for submit button
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('handlerSubmit:');
    setSymbol(formItem.pCountry);
    setSearchBox(false);
    covid19Stat.COVIDapiBycountry(formItem.pCountry);
    covid19Vaxed.vwVaxed(iso.whereCountry(formItem.pCountry).alpha3);
  };

  //-- Handler for input field boxes
  const handleInput = (e) => {
    const { name, value } = e.target;
    const newItem = { ...formItem, [name]: value };
    setFormItem(newItem);
    console.log('handleInput:', newItem);
  };

  //-- Handler for search modal window
  const handleOpenSearch = (e) => {
    console.log('handleOpenSearch');
    setSearchBox(true);
  };

  const handleCloseSearch = (e) => {
    console.log('handleCloseSearch');
    setSearchBox(false);
  };

  useEffect(() => {
    console.log('App.useEffect');
    if (!firstload) {
      covid19Stat.COVIDapiBycountry(pCountry);
      covid19Vaxed.vwVaxed(iso.whereCountry(pCountry).alpha3);
      setFirstLoad(true);
    }
  });

  return (
    <div className='TabCovid box'>
      {/*---- User input form ----*/}
      <div className='columns is-vcentered'>
        {/*-- Input text box with Submit button -- */}
        <div className='column is-3'>
          <form className='field has-addons' onSubmit={handleSubmit}>
            <div className='control'>
              <input
                className='input'
                type='text'
                name='pCountry'
                placeholder='Country'
                value={formItem.pCountry}
                onChange={handleInput}
              />
            </div>
            <div className='control'>
              <button type='submit' className='button is-info'>
                Submit
              </button>
            </div>
          </form>
        </div>
        {/*--- Input with Submit button ----*/}
        <div className='column is-2'>
          <button className='button is-primary' onClick={handleOpenSearch}>
            Search
          </button>
        </div>
        <div className='column'>
          <p className='is-size-4 has-text-right has-text-weight-light'>CORONAVIRUS PANDEMIC</p>
        </div>
      </div>
      {/*-- Search box window (modal) for stock symbol --*/}
      <div className={`modal ${isSearchBox ? 'is-active' : ''}`}>
        <div className='modal-background'></div>
        <div className='modal-content'>
          <div className='box'>
            <p>Start typing in the search box below...</p>
            <form className='field has-addons' onSubmit={handleSubmit}>
              <div className='control'>
                <FormSearch
                  onChange={(country) => {
                    console.log('Dropdown changed');
                    console.log(country.name);
                    setFormItem({ pCountry: country.name });
                  }}
                />
              </div>
              <div className='control'>
                <button className='button is-primary'>Submit</button>
              </div>
            </form>
          </div>
        </div>
        <button
          className='modal-close is-large'
          aria-label='close'
          onClick={handleCloseSearch}
        />
      </div>
      <div class='columns'>
        <div class='column is-three-fifths'>
          <div className='column block'>
            <p className='is-size-4 has-text-weight-light has-text-centered'>
              Reported Cases and Deaths
            </p>
            <div id='chartdiv' style={{ width: '100%', height: '300px' }} />
          </div>
        </div>
        <div class='column'>
          <div className='column block'>
            <p className='is-size-4 has-text-weight-light has-text-centered'>
              Vaccination Data
            </p>
            <div id='divVaxed' style={{ width: '100%', height: '300px' }} />
          </div>
        </div>
      </div>
    </div>
  );
}
