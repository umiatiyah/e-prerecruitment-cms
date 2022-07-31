import React, { Component } from "react";
import UserService from "../../../services/users.service";
import { Link } from "react-router-dom";
import Footer from "../Footer";
import Header from "../Header";
import Menu from "../Menu";

export default class UpdateUser extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangeNIK = this.onChangeNIK.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.getUser = this.getUser.bind(this);
    this.updateUser = this.updateUser.bind(this);

    this.state = {
      currentUser: [],
    };
  }

  componentDidMount() {
    this.getUser(this.props.match.params.id);
  }

  onChangeName(e) {
    const name = e.target.value;

    this.setState(function (prevState) {
      return {
        currentUser: {
          ...prevState.currentUser,
          name: name,
        },
      };
    });
  }

  onChangeEmail(e) {
    const email = e.target.value;

    this.setState((prevState) => ({
      currentUser: {
        ...prevState.currentUser,
        email: email,
      },
    }));
  }

  onChangeNIK(e) {
    const nik = e.target.value;

    this.setState(function (prevState) {
      return {
        currentUser: {
          ...prevState.currentUser,
          nik: nik,
        },
      };
    });
  }

  onChangePassword(e) {
    const password = e.target.value;

    this.setState(function (prevState) {
      return {
        currentUser: {
          ...prevState.currentUser,
          password: password,
        },
      };
    });
  }

  getUser(id) {
    UserService.get(id)
      .then((response) => {
        this.setState({
          currentUser: response.data,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  updateUser() {
    UserService.update(this.props.match.params.id, this.state.currentUser.name, this.state.currentUser.email, this.state.currentUser.nik, this.state.currentUser.password)
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
    const { currentUser } = this.state;

    return (
      <div>
        <Header />
        <Menu />
        <section className="content-wrapper">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-12">
                <div className="edit-form">
                  <h4>Admin</h4>
                  <form>
                    <div className="form-group">
                      <label htmlFor="name">Nama User</label>
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        value={currentUser.name}
                        onChange={this.onChangeName}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <input
                        type="text"
                        className="form-control"
                        id="email"
                        value={currentUser.email}
                        onChange={this.onChangeEmail}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="nik">NIK</label>
                      <input
                        type="text"
                        className="form-control"
                        id="nik"
                        value={currentUser.nik}
                        onChange={this.onChangeNIK}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="password">Password</label>
                      <input
                        type="text"
                        className="form-control"
                        id="password"
                        value={currentUser.password}
                        onChange={this.onChangePassword}
                      />
                    </div>
                  </form>

                  <button
                    type="submit"
                    className="btn btn-warning btn-sm mr-2"
                    onClick={this.updateUser}
                  >
                    Update
                  </button>
                  <Link
                    to={"/users"}
                    className="btn btn-primary btn-sm"
                    type="submit"
                  >
                    Back
                  </Link>
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
