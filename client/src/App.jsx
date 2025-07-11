import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './App.css'
import { BrowserRouter ,Routes,Route} from 'react-router-dom'
import Home from './Pages/HomePage/Home';
import Error from './Pages/Error';

function App() {
 

  return (
   <BrowserRouter>
   <Routes>
    <Route path='/' element={<Home/>}/>
     <Route path='*' element={<Error/>}/>
   </Routes>
   </BrowserRouter>
  )
}

export default App
