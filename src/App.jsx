import React, {useState, useEffect} from 'react';
// import Home from './components/Home';
import './App.css';
//import Index from './pages/Index';
import { Switch, Route } from "react-router-dom";
import  { Index}  from "./pages/Index";
import  { UpComing}  from "./pages/UpComing";
import  { NowPlaying}  from "./pages/NowPlaying";
import  { ListMovie}  from "./pages/ListMovie";
import { Detail } from "./components/Detail";
import HalGenre from './pages/HalGenre';
import HalSearching from './pages/HalSearching';

export function App() {
  return(
    <main>
      <Switch>
        <Route path="/" component={Index} exact />
        <Route path="/movie/:id" component={Detail} />
        <Route path="/genre/:id" component={HalGenre} />
        <Route path="/search/:id" component={HalSearching} />
        <Route path="/UpComing" component={UpComing} />
        <Route path="/NowPlaying" component={NowPlaying} />
        <Route path="/ListMovie" component={ListMovie} />
      </Switch>
    </main>
  );
}

export default App;
