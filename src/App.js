import {BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";
import {CreateForm} from "./components/CreateForm";
import {List} from "./components/List";


function App() {
  return (
    <div className="App">
      <Router>
       <Switch>
           <Route exact path="/">
               <Redirect to="/employee"/>
           </Route>
         <Route exact path="/employee/create" component={CreateForm}/>
         <Route exact path="/employee" component={List}/>
       </Switch>
      </Router>
    </div>
  );
}

export default App;
