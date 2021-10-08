
import './App.css';
import React from "react";
import Form from './components/Form'
import DisplayData from './components/DisplayData'

import {BrowserRouter ,Route,  Switch} from 'react-router-dom';

function App() {
  return (
    <>
	<BrowserRouter>
    <Switch>

      <Route exact path="/" component={Form}/> 
      <Route exact path="/data" component={DisplayData}/> 
    
    </Switch>
	</BrowserRouter>

   </>
  )
}

export default App;
