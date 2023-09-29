import './App.css';
import {
  Route,
  Routes,
  BrowserRouter
} from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/notes/noteState';
import Alert from './components/Alert';

// import NoteState from './context/notes/Notestate';

function App() {
  return (
    <>
      <NoteState>
        <BrowserRouter>
          <Navbar />
          <Alert message = "This is iNotebook"/>
          <div className="container">
            <Routes>
              <Route exact path="/" element={<Home />}>
              </Route>
              <Route exact path="/about" element={<About />} >
              </Route>
            </Routes>
          </div>
        </BrowserRouter>
      </NoteState>
    </>
  );
}

export default App;
