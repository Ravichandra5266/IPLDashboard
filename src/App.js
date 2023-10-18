import IPLDashboard from "./Components/IPLDashboard";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import TeamDetails from "./Components/TeamDetails";
const App = () => (
  <Switch>
    <Route exact path="/" component={IPLDashboard} />
    <Route path="/teams/:id" component={TeamDetails} />
  </Switch>
);

export default App;
