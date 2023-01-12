import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  // Redirect,
} from "react-router-dom";
import StackOverflow from "./components/blockvoice";
import Header from "./components/Header";
import AddQuestion from "./components/AddQuestion";
import ViewQuestion from "./components/ViewQuestion";


function App() {


  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
          <Route exact path="/" component={StackOverflow} />
          <Route exact path="/add-question" component={AddQuestion} />
          <Route exact path="/question/:id/:title" component={ViewQuestion} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
