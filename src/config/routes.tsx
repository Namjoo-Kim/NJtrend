import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from '../pages/Home';
import Home2 from '../pages/Home2';
import Home3 from '../pages/Home3';

import Welcome from '../pages/Welcome';
import Found404 from '../pages/Found404';
import Oauth from '../pages/Oauth';

import TopMenu_path from '../menu/TopMenu_path';

function App() {
  return (
    <BrowserRouter 
    // basename={process.env.PUBLIC_URL}
    >
      <Routes>
        <Route path='/' element={<Welcome />} />
        <Route path='/KaKaoLogin' element={<Oauth />} />
        <Route path='main/*' element={<TopMenu_path  />} />
        <Route path='*' element={<Found404 />} />
      </Routes>
    </BrowserRouter>
  );
}
  
  export default App;