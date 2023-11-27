import { BrowserRouter, Routes, Route } from 'react-router-dom'

// pages 
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Recipe from './pages/Recipe'

import Numbers from './pages/Numbers'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className='pages'>
          <Routes>
            {/* <Route 
              path='/:cat'  
              element={<Home />}
            /> */}
            <Route 
              path='/'  
              element={<Home />}
            />
            <Route
              path='/Lars'
              element={<Numbers />}
            />
            <Route
              path='/recipe/:id'
              element={<Recipe />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
