import React from 'react';
import Downshift from 'downshift';
import symbolList from './stocks-symbols.js'

// Simple dropdown
/*
const symbolList = [
  { symbol: 'AAPL', name: 'AAPL Apple Inc' },
  { symbol: 'FB', name: 'FB Meta Platforms Inc' },
  { symbol: 'BA', name: 'BA The Boeing Company' },
  { symbol: 'TSLA', name: 'TSLA Tesla Inc' },
  { symbol: 'MSFT', name: 'MSFT Microsoft Corporation' },
];
*/

// const onChange = (symbol) => {
//   console.log(`Stock is ${symbol.name}`);
//   setFormItem(symbol);
// }

export default function FormTickerSymbol(props) {
  const { onChange } = props;
  return (
    <Downshift 
      onChange={onChange}
      itemToString={item => (item ? item.symbol : '')}>
        {({
          getInputProps,
          getItemProps,
          isOpen,
          inputValue,
          highlightedIndex,
          selectedItem
        }) => (
          <div>
            <input className='input' {...getInputProps({ placeholder: "Ticker SYMBOL" })} />
            { isOpen 
              ? ( <div>
              {/* ? ( <div className="downshift-dropdown"> */}
                { symbolList
                .filter(item => !inputValue || item.name.toLowerCase().includes(inputValue.toLowerCase()))
                .slice(0, 30)
                .map((item, index) => (
                  <div className="dropdown-item"
                    {...getItemProps({ key: item.name, index, item })}
                    style={{ 
                      backgroundColor: highlightedIndex === index ? 'lightgray' : 'white',
                      fontWeight: selectedItem === item ? 'bold' : 'normal'
                    }} >
                    {item.name}
                  </div> ))}
                </div> )
              : null}
            </div>
          )}
    </Downshift>
  )
}