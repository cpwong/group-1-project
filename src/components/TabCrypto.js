import "../App.css";
// import React from "react";

import ViewConversion from "./TabCrypto/ViewConversion.js";
import ViewNewsFeed from "./TabCrypto/ViewNewsFeed.js";

function TabCrypto() {
  return (
    <div>
      <section className="section has-background-info-light">
        <div className="container">
          <p className="title is-2 has-text-info-dark mb-3">
            Crypto-Currency Dashboard
          </p>
          {/* <p className="subtitle is-6">
            Crypto-Crypto-Fiat Currency Conversion
          </p> */}

          <div className="tile is-ancestor buttons are-small">
            <div
              className="tile is-7 is-vertical is-parent"
              style={{ minWidth: 515 }}
            >
              <ViewConversion />
            </div>

            <div className="tile is-5 is-parent" style={{ minWidth: 515 }}>
              <ViewNewsFeed />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default TabCrypto;
