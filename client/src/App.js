import './App.css';
import {BrowserRouter as Router , Routes , Route } from "react-router-dom"


import SavedRecipes from './pages/saved-recipes';


//Import Pages
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Home from './pages/Home/home';
import CreateRecipe from './pages/CreateRecipe/CreateRecipe';
import Auth from './pages/auth';
//Import Components
import { Navbar } from './components/Navbar/Navbar';

function App() {
  return (
    <div className="App">
        <Router>
          <Navbar />
          <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/auth' element={<Auth/>}/>
            <Route path='/login' element={<Login/>} /> 
            <Route path='/register' element={<Register/>} /> 
            <Route path='/create-recipe' element={<CreateRecipe/>}/>
            <Route path='/saved-recipe' element={<SavedRecipes/>}/>
          </Routes>
        </Router>
    </div>
  );
}

export default App;
