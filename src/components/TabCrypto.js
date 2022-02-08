
import ViewConversion from "./TabCrypto/ViewConversion.js";
import ViewNewsFeed from "./TabCrypto/ViewNewsFeed.js";

export default function TabCrypto() {
  return (
    <div className='TabCrypto box'>
    <div className='columns'>
      <div className='column'>
        <p className='is-size-4 has-text-right has-text-weight-light'>
        CRYPTO-CURRENCIES DASHBOARD & NEWSFEED
        </p>
      </div>
    </div>    
      {/* <section className="section has-background-info-light"> */}
        <div className="container">
          <div className="tile is-ancestor ">
            <div
              className="tile is-vertical is-parent"
              // style={{ minWidth: 515 }}
            >
              <ViewConversion />
            </div>
            <div className="tile is-parent" 
              // style={{ minWidth: 515 }}
            >
              <ViewNewsFeed />
            </div>

          </div>
        </div>
      {/* </section> */}
    </div>




)
}





