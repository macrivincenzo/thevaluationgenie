import { Switch, Route } from "wouter";
import Landing from "@/pages/landing";

function App() {
  return (
    <Switch>
      <Route path="/" component={Landing} />
      <Route component={() => <div>Page not found</div>} />
    </Switch>
  );
}

export default App;