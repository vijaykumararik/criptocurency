
import { BrowserRouter, Route,  Routes } from 'react-router-dom';
import './App.css';
import Pricelisting from './components/Pricelisting';
import Details from './components/Details';

function App() {
  return (
    <div >
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Pricelisting/>}></Route>
        <Route path='/details/:id' element={<Details/>}></Route>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
