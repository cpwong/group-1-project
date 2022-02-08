
import ViewConversion from "./TabCrypto/ViewConversion.js";
import ViewNewsFeed from "./TabCrypto/ViewNewsFeed.js";




export default function TabCrypto() {
  return (
    <div className='TabCrypto box'>

    
      <section className="section has-background-info-light">
        <div className="container">
          <p className="title is-2 has-text-info-dark mb-5">
            Crypto-Currencies Dashboard & NewsFeed
          </p>
          {/* <p className="subtitle is-6">
            Crypto-Crypto-Fiat Currency Conversion
          </p> */}

          <div className="tile is-ancestor buttons are-small">
            <div
              className="tile is-6 is-vertical is-parent"
              style={{ minWidth: 515 }}
            >
              <ViewConversion />
            </div>

            <div className="tile is-4 is-parent" style={{ minWidth: 515 }}>
              <ViewNewsFeed />
            </div>

          </div>
        </div>
      </section>
    </div>




)
}





