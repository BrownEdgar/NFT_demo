
import Form from './components/Form/Form';
import NavBar from "./components/NavBar/NavBar";
import Home from './pages/Home/Home'
import { Route, Routes } from 'react-router-dom';
import "./App.css";
import SignUp from './pages/SignUp/SignUp';

function App() {


  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/add' element={<Form />} />
        <Route path='/sign-up' element={<SignUp />} />
      </Routes>
    </div>
  );
}

export default App;
