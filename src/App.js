import React, { useState, useEffect } from 'react';
import Result from './pages/Result';

// 50bb2b24-1fa5-43e6-94fc-d56ce2613300 my API key for meriam webster dictionary

const getSearchedWord = () => {
  let word = sessionStorage.getItem('word');
  if (word) {
    return (word = JSON.parse(sessionStorage.getItem('word')));
  } else {
    return [];
  }
};

const App = () => {
  const [searchTerm, setSearchTerm] = useState(getSearchedWord());
  const [resultData, setResultData] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${searchTerm}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Not found!');
        }
      })
      .then((data) => setResultData(data))
      .catch((err) => {
        console.log(err);
        setResultData(null);
      });
  };

  useEffect(() => {
    sessionStorage.setItem('word', JSON.stringify(searchTerm));
  }, [searchTerm]);

  return (
    <main className='App'>
      <h1>My dictionary</h1>
      <form>
        <input
          type='text'
          className='input'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSubmit} type='submit'>
          submit
        </button>
      </form>
      <section className='result'>
        {!resultData ? (
          <p>Please enter a word</p>
        ) : (
          <Result resultData={resultData} />
        )}
      </section>
    </main>
  );
};

export default App;
