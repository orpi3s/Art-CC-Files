import React from 'react';

/**
 * We need to import fetchQueryResultsFromURL since we will sometimes have urls in info.prev and info.next
 * which are query urls.
 */
import { fetchQueryResultsFromURL } from '../api';

const Preview = (props) => {
  /*
   * Destructure setSearchResults, setFeaturedResult, and setIsLoading from props
   * and also destructure info and records from props.searchResults
   * 
   * You need info, records, setSearchResults, setFeaturedResult, and setIsLoading as available constants
   /*
    


  
   * Don't touch this function, it's good to go.
   * 
   * It has to be defined inside the Preview component to have access to setIsLoading, setSearchResults, etc...
   */
   let info = props.searchResults.info
   let records = props.searchResults.records
   let setSearchResults = props.setSearchResults
   let setFeaturedResult = props.setFeaturedResult
   let setIsLoading = props.setIsLoading

  async function fetchPage(pageUrl) {
    setIsLoading(true);

    try {
      const results = await fetchQueryResultsFromURL(pageUrl);
      setSearchResults(results);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return <aside id="preview">
    <header className="pagination">
      {/* This button should be disabled if nothing is set in info.prev, and should call fetchPage with info.prev when clicked */}
      <button 
        disabled={info.prev ? false : true} 
        className="previous"
        onClick={() => (fetchPage(info.prev))}>Previous</button>
      {/* This button should be disabled if nothing is set in info.next, and should call fetchPage with info.next when clicked */}
      <button
        disabled={info.next ? false : true}
        className="next"
        onClick={() => (fetchPage(info.next))}>Next</button>   
    </header>
    <section className="results">
      {
        // Here we should map over the records, and render something like this for each one:
        records.map((element, index) => (
          <div 
             key={index}
             className="object-preview"
             onClick={(event) => {
               event.preventDefault()
               setFeaturedResult(element)
             }}>
            {
              element.primaryimageurl ? <img src={element.primaryimageurl} alt={element.description} /> : undefined
            }
            {
              element.title ? <h3>{element.title}</h3> : <h3>MISSING INFO</h3>
            }
         </div>
        ))
        
      }
    </section>
  </aside>
}

export default Preview;