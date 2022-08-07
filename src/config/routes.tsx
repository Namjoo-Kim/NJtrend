import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from '../pages/Home';
import Welcome from '../pages/Welcome';
import Found404 from '../pages/Found404';

function App() {
    return (
      // <BrowserRouter>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Routes>
          <Route path='/' element={<Welcome />} />
          <Route path='/Home' element={<Home />} />
          <Route path='/Home2' element={<Home />} />
          <Route path='/Home3' element={<Home />} />
          <Route path='*' element={<Found404 />} />
        </Routes>
      </BrowserRouter>
    );
  }
  
  export default App;