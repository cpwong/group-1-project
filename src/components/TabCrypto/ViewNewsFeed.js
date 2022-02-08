import { useEffect, useState } from "react";
import { uniqueId } from "lodash";
import { API_CryptNews } from "../api/API.js";

export default function ViewNewsFeed(props) {
  // Add the default values when creating Edit function

  const [newsArticles, setNewsArticles] = useState([]);

  const apiNewsFeed = async (e) => {
    const options = {
      method: "GET",
      url: "/news",
    };

    const { status, data } = await API_CryptNews.request(options);
    // console.log(status, data);

    if (status === 200 && data) {
      // setNewsArticles(data.slice(0, 12));
      setNewsArticles(data);
      console.log(newsArticles);
    }
    e.preventDefault();
  };

  useEffect(() => {
    apiNewsFeed();
  }, []);

  return (
    <div
      className="tile is-child box has-background-primary-light"
      // onClick={apiNewsFeed}
    >
      <p className="title has-text-info-dark  mb-3">NewsFeed</p>
      <article>
        <div
          className="table-container is-fullheight is-scrollable"
          style={{ overflowY: "scroll", height: 600 }}
        >
          <table className="table is-striped is-hoverable has-background-info-light">
            <tbody style={{ height: 200 }}>
              {newsArticles.map((news) => (
                <tr key={uniqueId()}>
                  <td>
                    <a href={news.url} target="blank" rel="noopener noreferrer">
                      <p>{news.title}</p>
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </article>
    </div>
  );
}
