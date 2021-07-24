import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import MovieDetail from "../routes/MovieDetail";
import Home from "../routes/Home";
import Search from "../routes/Search";
import TV from "../routes/TV";
import Header from "./Header";
import TVDetail from "../routes/TVDetail";

const Routers = () => {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/tv" component={TV} exact />
          <Route path="/search" component={Search} exact />
          <Route path="/:id" exact component={MovieDetail} />
          <Route path="/tv/:id" exact component={TVDetail} />
          <Redirect from="*" to="/"></Redirect>
        </Switch>
      </BrowserRouter>
    </>
  );
};

export default Routers;
