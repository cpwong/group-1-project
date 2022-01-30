import React, { useEffect } from 'react';

export default function ViewStock(props) {
  // Add the default values when creating Edit function
  const { data: stock } = props;
  const shortNum = (num) => {
    return(
      new Intl.NumberFormat( 'en-US', {
        maximumFractionDigits: 2,
        notation: "compact", 
        compactDisplay: "short" 
      }).format(num));
  }
  useEffect( () => {
    // console.log('Viewstock.useEffect', stock);
  })
  return (
    <div className='ViewStock block'>
      { stock && <>
      <p className='title is-1 has-text-centered'>{stock.name}</p>
      <div className='columns block has-text-centered'>
        <div className='column'>
          <div>
            <p className='heading'>Bid</p>
            <p className='title'>${stock.bid}</p>
          </div>
        </div>
        <div className='column'>
          <div>
            <p className='heading'>Ask</p>
            <p className='title'>${stock.ask}</p>
          </div>        
        </div>
        <div className='column'>
          <div>
            <p className='heading'>Change $</p>
            <p className='title'>{shortNum(stock.change)}</p>
          </div>
        </div>
        <div className='column'>
          <div>
            <p className='heading'>Change</p>
            <p className='title'>{shortNum(stock.chgPct)} %</p>
          </div>
        </div>
      </div>

      <div className='columns block has-text-centered'>
        <div className='column'>
          <p className='heading'>Daily Volume</p>
          <p className='title'>{shortNum(stock.dayVol)}</p>
        </div>
        <div className='column'>
          <div>
            <p className='heading'>3-Month Volume</p>
            <p className='title'>{shortNum(stock.avgVol)}</p>
          </div>
        </div>
        <div className='column'>
          <div>
            <p className='heading'>P/E Ratio</p>
            <p className='title'>{shortNum(stock.pe)}</p>
          </div>
        </div>
        <div className='column'>
          <div>
            <p className='heading'>Forward P/E</p>
            <p className='title'>{shortNum(stock.fwdPe)}</p>
          </div>
        </div>
      </div>
      <div className='block'></div>

      {/* <div className='level'>
        <div className='level-item item has-text-centered'>
          <div>
            <p className='title'>{stock.name}</p>
          </div>
        </div>
        <div className='level-item has-text-centered'>
          <div>
            <p className='heading'>Bid</p>
            <p className='title'>${stock.bid}</p>
          </div>
        </div>
        <div className='level-item item has-text-centered'>
          <div>
            <p className='heading'>Ask</p>
            <p className='title'>${stock.ask}</p>
          </div>
        </div>
      </div> */}
      </>
      }
    </div>
  );
}
