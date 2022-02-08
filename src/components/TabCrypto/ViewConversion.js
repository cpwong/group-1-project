import { uniqueId } from "lodash";
import { useEffect, useState } from "react";

import { fiatList, tokenList } from "../data/data.js";
import { API_CryptConv } from "../api/API.js";
import ViewExchange from "./ViewExchange";
import ViewChart from "./ViewChart.js";

export default function ViewConversion() {
  ///// define input object using state function for API calls and display
  const [convertToken, setConvertToken] = useState({
    amount: " ",
    from: " ",
    to: " ",
  });

  ///// define display object using state function for API calls and display
  const [displayExchange, setDisplayExchange] = useState({
    rate: "Exchange Rate",
    from: "Selected",
    to: "Selected",
  });

  ///// exchange result
  const [changedAmount, setChangedAmount] = useState("");

  ///// define historical chart data using state function from API call
  const [cryptoChartData, setcryptoChartData] = useState([]);

  // API calls with selected token, then output to State objects
  const apiExchangeRate = async () => {
    // options setting for API and token inputs
    const options = {
      method: "Get",
      url: "/query",
      params: {
        to_currency: convertToken.to, // set currency
        function: "CURRENCY_EXCHANGE_RATE",
        from_currency: convertToken.from, // set token
      },
    };

    const { status, data } = await API_CryptConv.request(options);
    if (status === 200 && data) {
      // save exchange results
      const exRate =
        data["Realtime Currency Exchange Rate"]["5. Exchange Rate"];
      const calResult = parseFloat(convertToken.amount) * exRate;

      setChangedAmount(calResult.toFixed(2));

      // for Result Display
      setDisplayExchange({
        rate: exRate,
        from: data["Realtime Currency Exchange Rate"]["2. From_Currency Name"],
        to: data["Realtime Currency Exchange Rate"]["4. To_Currency Name"],
      });
      // console.log(
      //   "rate*amt=changedAmt: ",
      //   displayExchange.rate,
      //   convertToken.amount,
      //   changedAmount
      // );
    }
  };

  // API calls for historical chart data
  const apiExchangeChart = async () => {
    // options setting for API and token inputs
    const optionsChart = {
      method: "Get",
      url: "/query",
      params: {
        function: "DIGITAL_CURRENCY_DAILY",
        symbol: convertToken.from, // set token
        market: convertToken.to, // set currency
      },
    };
    const { status, data } = await API_CryptConv.request(optionsChart);
    // console.log("Chart Data", data);

    if (status === 200 && data) {
      console.log("Chart Data: ", status);

      // const temp = [];
      // for (const id in data.items) {
      //   temp.push({...data.items[id], date: parseInt(id, 10)*1000});
      // }
      // const obj = {

      //   array: [...temp]
      // }

      // const chartData =
      // setcryptoChartData(obj);

      // const timeData = [data["Time Series (Digital Currency Daily)"]];

      // console.log("timeData[1]", Object.keys(data)[1]); // Time Series (Digital Currency Daily)
      // console.log("timeData", timeData);

      const timeData = data["Time Series (Digital Currency Daily)"];
      console.log("timeData", timeData);
      console.log(Object.keys(timeData)); // dates string
      console.log(Object.values(timeData)[0][6]);

      // Object.filter = (object, objectItems) =>
      // object > array > filter > filteredArray > filteredObject

      // const timeData = [data["Time Series (Digital Currency Daily)"]];
      // const arr = [...timeData];

      // console.log("arry: ", arr);

      // let dataChart =[];
      // const dataArr = arr.map((item) => {

      //   console.log(Object.keys(item));

      //   dataChart.push({
      //     date: new Date(2010, 0, i).getTime(),
      //     price1: price1,
      //     quantity: quantity
      //   });

      // });

      // data["Time Series (Digital Currency Daily)"]["2019-12-31"][6];

      // const timeextract = timeData.map((item) => {
      //   console.log(item);
      // });

      // console.log(timeData);

      // console.log("timeData: ", timeData);

      // console.log(cryptoChartData);
    }
  };

  // call API chart data after chargedAmount
  useEffect(() => {
    apiExchangeChart();
  }, [changedAmount]);

  // handle token conversion
  const handleConvert = async (event) => {
    apiExchangeRate();
    // apiExchangeChart();
    event.preventDefault();
  };

  // handle input change
  const handleChange = (event) => {
    const { name, value } = event.target;
    setConvertToken((prevInput) => {
      return {
        ...prevInput, // spread operator
        [name]: value, // e.target.name: e.target.value
      };
    });
    // console.log(convertToken);
  };

  return (
    <div>
      <div className="tile is-child box has-background-primary-light">
        <div className="columns mb-0">
          <div className="column is-four-fifths">
            <p className="title is-4 has-text-info-dark">
              Crypto-to-Fiat/Crypto Converter
            </p>
          </div>
          <div className="column">
            <button
              className="button is-info has-text-weight-bold mb-0"
              onClick={handleConvert}
            >
              <span>Convert</span>
            </button>
          </div>
        </div>
        <div className="box has-background-info-light p-2">
          <table className="table is-fullwidth mb-2 has-background-primary-light">
            <tbody>
              <tr>
                <td>Crypto:</td>
                <td>
                  <input
                    onChange={handleChange}
                    value={convertToken.amount}
                    type="number"
                    step="0.01"
                    min="0"
                    name="amount"
                    placeholder="Enter amount"
                    autoFocus
                  />
                </td>
                <td>
                  <div>
                    <select
                      name="from"
                      value={convertToken.from}
                      onChange={handleChange}
                      required
                      style={{ width: 90 }}
                    >
                      <option> Select ... </option>
                      {tokenList.map((token) => (
                        <option key={uniqueId()}> {token} </option>
                      ))}
                    </select>
                  </div>
                </td>
              </tr>

              <tr>
                <td>Fiat/Crypto:</td>
                <td>
                  <input
                    type="number"
                    readOnly
                    value={changedAmount}
                    placeholder="RESULT"
                  />
                </td>
                <td>
                  <select
                    name="to"
                    value={convertToken.to}
                    onChange={handleChange}
                    required
                    style={{ width: 90 }}
                  >
                    <option> Select ... </option>
                    <optgroup label="Fiat">
                      {fiatList.map((fiat) => (
                        <option key={uniqueId()}> {fiat} </option>
                      ))}
                    </optgroup>
                    <optgroup label="Crypto">
                      {tokenList.map((token) => (
                        <option key={uniqueId()}> {token} </option>
                      ))}
                    </optgroup>
                  </select>
                </td>
              </tr>
            </tbody>
          </table>

          <ViewExchange
            from={displayExchange.from}
            to={displayExchange.to}
            rate={displayExchange.rate}
          />
        </div>
        {/* <ViewChart /> */}
      </div>
    </div>
  );
}
