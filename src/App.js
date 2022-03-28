import './App.css';
import Home from './components/Home';
import Login from './components/Login';
// import {Routes, Route} from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


function App() {
  return (
    <>
    <div className="App">
      <Routes>
        <Route path = 'Login' element = {<Login />}></Route>
       <Route path = 'Home' element = {<Home />}></Route>
       <Route path = '*' element = {<Login />}></Route>

      </Routes>
{/* <Login /> */}
{/* <Home /> */}
    </div>
    </>
  );
}

export default App;
