import {BrowserRouter, Routes, Route} from 'react-router-dom'

// import Welcome from '../pages/Welcome';
import Welcome2 from '../pages/Welcome2';
import Found404 from '../pages/Found404';
import Oauth from '../pages/Oauth';

import MenuAll from './MenuAll';

function Router() {
  return (
    <BrowserRouter 
    // basename={process.env.PUBLIC_URL}
    >
      <Routes>
        <Route path='/' element={<Welcome2 />} />
        <Route path='/KaKaoLogin' element={<Oauth />} />
        <Route path='main/*' element={<MenuAll  />} />
        <Route path='*' element={<Found404 />} />
      </Routes>
    </BrowserRouter>
  );
}
  
  export default Router;