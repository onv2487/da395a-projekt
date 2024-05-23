import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import SavedRecipes from './pages/SavedRecipes';
import './App.css';


function App() {
  <Router>
    <Header />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/saved" component={SavedRecipes} />
    </Switch>
  </Router>
}

export default App;
