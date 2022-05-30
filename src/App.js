
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Suspense } from 'react';
import Login from './pages/Login'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './App.css';

function App() {
  return (
    <Router>

      <Routes>

        <Route exact path="/" element={
          <Suspense fallback={<div>Loading...</div>}>
            <Login />
          </Suspense>
        } />

        
      </Routes>

    </Router>
  );
}

export default App;
