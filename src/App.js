import React, {useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
const App = () => {
const [data, setData] = useState(false);
useEffect(() => {
  fetch('https://api.watchmode.com/v1/sources/?apiKey=E1pn6G0f4xL5kwMux4bjDlLUzv02lBB1EgI4gt1U')
      .then((r) => r.json())
      .then((res) => {
          console.log(res)
        setData(res);
      })
      .catch((err) => {
        console.log('Error', err);
      });
}, []);

return null
}

export default App;
