import { Route, Switch } from "react-router-dom";
import "./App.css";
import CardDetail from "./components/CardDetail/CardDetail";
import Nav from "./components/Nav/Nav";
import Create from "./components/Create/Create";
import Cards from "./components/Cards/Cards";
import LandingPage from "./components/LandingPage/LandingPage";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <div>
          <Nav />
          <div className="switch">
            <Route exact path="/app" component={Cards} />
            <Route exact path="/app/gameDetail/:id" component={CardDetail} />
            <Route exact path="/app/create" component={Create} />
          </div>
        </div>
      </Switch>
    </div>
  );
}

export default App;
