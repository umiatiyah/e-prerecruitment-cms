import React, { Component } from "react";
import Header from "../Header";
import Footer from "../Footer";
import Menu from "../Menu";
import UserService from "../../../services/users.service";

export default class AddUser extends Component {
  constructor(props) {
    super(props);
    this.onChangeUserName = this.onChangeUserName.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangeNIK = this.onChangeNIK.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.saveUser = this.saveUser.bind(this);

    this.state = {
      name: "",
      email: "",
      nik: "",
      password: "",
    };
  }

  onChangeUserName(e) {
    this.setState({
      name: e.target.value,
    });
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value,
    });
  }

  onChangeNIK(e) {
    this.setState({
      nik: e.target.value,
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value,
    });
  }

  saveUser() {
    UserService.add(this.state.name, this.state.email, this.state.nik, this.state.password)
      .then((response) => {
        this.props.history.push("/users");
        window.location.reload();
      })
      .catch((error) => {
        alert("sorry, something's wrong..");
        console.log(error);
      });
  }

  render() {
    return (
      <div>
        <Header />
        <Menu />
        <section className="content-wrapper">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-12">
                <div className="submit-form">
                  <div>
                    <div className="form-group">
                      <label htmlFor="userName">Nama User</label>
                      <input
                        type="text"
                        className="form-control"
                        id="userName"
                        required
                        value={this.state.name}
                        onChange={this.onChangeUserName}
                        name="userName"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <input
                        type="text"
                        className="form-control"
                        id="email"
                        required
                        value={this.state.email}
                        onChange={this.onChangeEmail}
                        name="email"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="nik">NIK</label>
                      <input
                        type="text"
                        className="form-control"
                        id="nik"
                        required
                        value={this.state.nik}
                        onChange={this.onChangeNIK}
                        name="nik"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="password">Password</label>
                      <input
                        type="password"
                        className="form-control"
                        id="password"
                        required
                        value={this.state.password}
                        onChange={this.onChangePassword}
                        name="password"
                      />
                    </div>

                    <button
                      onClick={this.saveUser}
                      className="btn btn-block btn-success btn-sm"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    );
  }
}
