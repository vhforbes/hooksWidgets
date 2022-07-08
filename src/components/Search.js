import React, { useEffect, useState } from "react";
import wikipedia from "../api/wikipedia";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    let timerId;

    const searchTimeout = (getSearch) => {
      const timeoutId = setTimeout(() => {
        getSearch();
      }, 500);
      return timeoutId;
    };

    if (searchTerm) {
      const getSearch = async () => {
        const res = await wikipedia.get("", {
          params: {
            srsearch: searchTerm,
          },
        });

        setResults(res?.data.query.search);
      };

      timerId = searchTimeout(getSearch);
    }

    // Not called at inital render, but called every time there is a
    // re-render before the rest of the use effect!
    return () => {
      clearTimeout(timerId);
    };
  }, [searchTerm]);

  const renderedResults = results.map((result) => (
    <div key={result.pageid} className="item">
      <div className="right floated content">
        <a
          className="ui button"
          href={`https://en.wikipedia.org?curid=${result.pageid}`}
          target="_blank"
          rel="noreferrer"
        >
          Go
        </a>
      </div>
      <div className="content">
        <div className="header">{result.title}</div>
        {
          // Dangerous code, someone may execute js inside the html that you are setting
        }
        <span dangerouslySetInnerHTML={{ __html: result.snippet }}></span>
      </div>
    </div>
  ));

  return (
    <>
      <div className="ui form">
        <div className="field">
          <label>Search Wiki</label>
          <input
            className="input"
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <div className="ui celled list">{renderedResults}</div>
      <div></div>
    </>
  );
};

export default Search;
