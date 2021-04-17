import "./App.scss";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import Registration from "./components/Registration";
import Navigation from "./components/Nav";
import Profile from "./components/Profile";
import { GlobalProvider } from "./context/GlobalState";
import { Dashboard } from "./components/Dashboard";

function App() {
  return (
    <GlobalProvider>
      <div className="App">
        <Router>
          <Navigation />
          <Switch>
            <Route path="/home" exact component={Home} />
            <Route path="/register" exact component={Registration} />
            <Route path="/profile" exact component={Profile} />
            <Route path="/dashboard" exact component={Dashboard} />
          </Switch>
        </Router>
      </div>
    </GlobalProvider>
  );
}

export default App;
