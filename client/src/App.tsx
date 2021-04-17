import "./App.scss";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navigation from "./components/Nav";
import { GlobalProvider } from "./context/GlobalState";
import { Dashboard } from "./components/Dashboard";
import { CompareAQI } from "./components/CompareAQI";
import AQIComparer from "./components/AQIComparer";
import TableView from "./components/TableView";

function App() {
  return (
    <GlobalProvider>
      <div className="App">
        <Router>
          <Navigation />
          <Switch>
            <Route path="/dashboard" exact component={TableView} />
            <Route path="/dashboard/:city" component={Dashboard} />
            <Route path="/compareAQI" exact component={AQIComparer} />
            <Route path="/compareAQI/:city1/:city2" component={CompareAQI} />
          </Switch>
        </Router>
      </div>
    </GlobalProvider>
  );
}

export default App;
