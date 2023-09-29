import React from 'react';
import RecipeForm from './recipe components/Form';
import ViewRecipes from './recipe components/ViewRecipes';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<RecipeForm />} />
          <Route path="ViewRecipes" element={<ViewRecipes/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
