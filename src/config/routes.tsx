import React, {useEffect} from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'

import Home from '../pages/Home'
import Welcome from '../pages/Welcome';
import Found404 from '../pages/Found404';

function App() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Welcome />} />
          <Route path='/Home' element={<Home />} />
          <Route path='*' element={<Found404 />} />
        </Routes>
      </BrowserRouter>
    );
  }
  
  export default App;