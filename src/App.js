import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import "./App.css";

import AuthService from "./services/auth.service";

import Login from "./components/login.component";
import BoardAdmin from "./components/board-admin.component";

import ListAdmin from "./components/admin.dashboard.component/admins.component/list-admins.component";
import AddAdmin from "./components/admin.dashboard.component/admins.component/add-admin.component";
import UpdateAdmin from "./components/admin.dashboard.component/admins.component/update-admin.component";
import Profile from "./components/admin.dashboard.component/admins.component/profile.component";

import ListUser from "./components/admin.dashboard.component/users.component/list-users.component";
import AddUser from "./components/admin.dashboard.component/users.component/add-user.component";
import UpdateUser from "./components/admin.dashboard.component/users.component/update-user.component";

import ListCategory from "./components/admin.dashboard.component/categories.component/list-categories.component";
import AddCategory from "./components/admin.dashboard.component/categories.component/add-categories.component";
import UpdateCategory from "./components/admin.dashboard.component/categories.component/update-categories.component";

import ListQuestion from "./components/admin.dashboard.component/questions.component/list-questions.component";
import AddQuestion from "./components/admin.dashboard.component/questions.component/add-question.component";
import UpdateQuestion from "./components/admin.dashboard.component/questions.component/update-question.component";

import ListAnswer from "./components/admin.dashboard.component/answers.component/list-answers.component";
import AddAnswer from "./components/admin.dashboard.component/answers.component/add-answers.component";
import UpdateAnswer from "./components/admin.dashboard.component/answers.component/update-answers.component";

import ListHistory from "./components/admin.dashboard.component/history.component/list-history.component";
import ListValuation from "./components/admin.dashboard.component/valuation.component/list-valuation.component";
import ListResult from "./components/admin.dashboard.component/result.component/list-result.component";

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showAdminBoard: false,
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
      });
    }
  }

  logOut() {
    AuthService.logout();
  }

  render() {

    return (
      <div className="wrapper">
        <div>
          <Switch>
            <Route exact path={["/", "/login"]} component={Login} />
            <Route path="/dashboard" component={BoardAdmin} />

            <Route exact path="/admins" component={ListAdmin} />
            <Route exact path="/admins/add" component={AddAdmin} />
            <Route path="/admins/:id" component={UpdateAdmin} />
            <Route path="/profile" component={Profile} />

            <Route exact path="/users" component={ListUser} />
            <Route exact path="/users/add" component={AddUser} />
            <Route path="/users/:id" component={UpdateUser} />

            <Route exact path="/categories" component={ListCategory} />
            <Route exact path="/categories/add" component={AddCategory} />
            <Route path="/categories/:id" component={UpdateCategory} />

            <Route exact path="/questions" component={ListQuestion} />
            <Route exact path="/questions/add" component={AddQuestion} />
            <Route path="/questions/:id" component={UpdateQuestion} />

            <Route exact path="/answers" component={ListAnswer} />
            <Route exact path="/answers/add" component={AddAnswer} />
            <Route path="/answers/:id" component={UpdateAnswer} />

            <Route exact path="/history" component={ListHistory} />
            <Route exact path="/valuation" component={ListValuation} />
            <Route exact path="/result" component={ListResult} />

            <Redirect exact from="/" to="/login" />
            <Route path="/login" component={Login} />
          </Switch>
        </div>
        {/* <Footer /> */}
      </div>
    );
  }
}

export default App;
