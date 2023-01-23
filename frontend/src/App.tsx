// Description: This is the main component of the application. It is the parent of all other components.

// Import Styles
import './assets/styles/App.scss';

// Import Pages
import Home from './pages/Home';
import Error from './pages/Error';

// Import Components
import {BrowserRouter, Routes, Route} from 'react-router-dom';


function App() {
 return (
  <BrowserRouter>
  <Routes>
      <Route path="/" element={<Home/>}/>

      {/* When no route has been found */}
      <Route path="*" element={<Error/>}/>
  </Routes>
</BrowserRouter>
 )
}

export default App;
