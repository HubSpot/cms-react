import { useState } from 'react';

export default function MakeServerlessRequestIsland() {
  const [data, setData] = useState([]);
  const [message, setMessage] = useState('');

  function makeRequestToProjectFunction(event) {
    event.preventDefault();

    return fetch(`/hs/serverless/parrot?message=${message}`)
      .then((response) => response.json())
      .then((jsonResponse) => {
        setData([...data, jsonResponse.message]);
      });
  }

  return (
    <>
      <form onSubmit={makeRequestToProjectFunction}>
        <fieldset>
          <legend>
            Make a request to the Developer Platform Serverless Function
          </legend>
          <label htmlFor="message">Message:</label>
          <input
            type="text"
            id="message"
            name="message"
            onChange={(e) => setMessage(e.target.value)}
            value={message}
          />
          <div style={{ marginTop: '10px' }}>
            <button type="submit">Make Request</button>
          </div>
        </fieldset>
      </form>
      <ul
        style={{
          listStyle: 'none',
          margin: '0',
          padding: '0',
        }}
      >
        {data.map((item) => (
          <li style={{ margin: '5px 0' }} key={item}>
            {item}
          </li>
        ))}
      </ul>
    </>
  );
}
