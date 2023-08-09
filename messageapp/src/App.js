
import './App.css';
import Teacher from './components/Teacher';
import Parent from './components/Parent';
import Home from './components/Home';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";


function App() {
  return (
    <>

    <Router>
  
         <Routes>
            <Route exact path='/' element={<Home/>}/>
            <Route exact path='/teacher' element={<Teacher/>}/>
            <Route exact path='/parent' element={<Parent/>}/>
         </Routes>

         </Router>
      </>

  );
}

export default App;
