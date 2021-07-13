import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Home from "../routes/Home";
import Search from "../routes/Search";
import TV from "../routes/TV";
import Header from "./Header";

const Routers = () => {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/tv" component={TV} />
          <Route path="/search" component={Search} />
          <Redirect from="*" to="/"></Redirect>
        </Switch>
      </BrowserRouter>
    </>
  );
};

export default Routers;
