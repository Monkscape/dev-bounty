import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom'
import './App.css';
import BountyManager from './BountyManager';
import Button from 'antd/es/button';

function App() {
  return (
    <Router>
      <div className="App">
        <BountyManager />
        <Button type="primary">test</Button>
      </div>
    </Router>
  );
}

export default App;
