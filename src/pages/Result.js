import React, { useEffect } from 'react';
import { FaRegBookmark } from 'react-icons/fa';

const Result = ({ resultData }) => {
  const data = resultData[0];
  const { word, meanings, phonetics, sourceUrls } = data;
  const meaningsObject = meanings[0];
  const { definitions, synonyms } = meaningsObject;

  const handleBookmark = () => {
    const sessionData = JSON.parse(sessionStorage.getItem('result'));
    Object.keys(sessionData).forEach((key) => {
      localStorage.setItem(key, JSON.stringify(sessionData[key]));
    });
  };

  useEffect(() => {
    sessionStorage.setItem('result', JSON.stringify(resultData));
  }, [resultData]);
  return (
    <>
      <article className='result'>
        <section className='header'>
          <div className='word'>
            <h1>{word}</h1>
            <div className='symbols'>
              {phonetics?.map((phonetic, i) => {
                const { text } = phonetic;
                return (
                  <p key={i} className='phonetic'>
                    {text}
                  </p>
                );
              })}
            </div>
          </div>
          <div className='audio'>
            <FaRegBookmark onClick={handleBookmark} className='book' />
            {phonetics?.map((phonetic, i) => {
              const { audio } = phonetic;
              return (
                <div key={i}>
                  <img
                    className='audio-image'
                    src='https://freesvg.org/img/icon_mic2.png'
                    alt=''
                    onClick={() => {
                      const audio = document.querySelector('#audio');
                      audio.play();
                    }}
                  />
                  <audio id='audio' src={audio}></audio>
                </div>
              );
            })}
          </div>
        </section>
        <section className='noun'>
          <h3>noun</h3>
          <h4>Meaning:</h4>
          <ul>
            {definitions?.map((definition, i) => {
              return <li key={i}>{definition.definition}</li>;
            })}
          </ul>
          <div className='synonyms'>
            <h4>Synonyms:</h4>
            <div className='synon'>
              {synonyms?.map((synonym, i) => {
                return <p key={i}>{synonym}</p>;
              })}
            </div>
          </div>
        </section>
        <div className='source'>
          <h4>Source:</h4>
          {sourceUrls?.map((sourceUrl, i) => {
            return (
              <a key={i} href={sourceUrl} target='noopener noreferer'>
                {sourceUrl}
              </a>
            );
          })}
        </div>
      </article>
    </>
  );
};

export default Result;
