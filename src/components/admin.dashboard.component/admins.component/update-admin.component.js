import React, { Component } from "react";
import AdminService from "../../../services/admin.service";
import { Link } from "react-router-dom";
import Footer from "../Footer";
import Header from "../Header";
import Menu from "../Menu";

export default class UpdateAdmin extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.getAdmin = this.getAdmin.bind(this);
    this.updateAdmin = this.updateAdmin.bind(this);

    this.state = {
      currentAdmin: [],
    };
  }

  componentDidMount() {
    this.getAdmin(this.props.match.params.id);
  }

  onChangeName(e) {
    const name = e.target.value;

    this.setState(function (prevState) {
      return {
        currentAdmin: {
          ...prevState.currentAdmin,
          name: name,
        },
      };
    });
  }

  onChangeEmail(e) {
    const email = e.target.value;

    this.setState((prevState) => ({
      currentAdmin: {
        ...prevState.currentAdmin,
        email: email,
      },
    }));
  }

  onChangePassword(e) {
    const password = e.target.value;

    this.setState((prevState) => ({
      currentAdmin: {
        ...prevState.currentAdmin,
        password: password,
      },
    }));
  }

  getAdmin(id) {
    AdminService.get(id)
      .then((response) => {
        this.setState({
          currentAdmin: response.data,
        });
        console.log(response.data.id);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  updateAdmin() {
    AdminService.update(this.props.match.params.id, this.state.currentAdmin.name, this.state.currentAdmin.email, this.state.currentAdmin.password)
      .then((response) => {
        this.props.history.push("/admins");
        window.location.reload();
      })
      .catch((error) => {
        alert("sorry, something's wrong..");
        console.log(error);
      });
  }

  render() {
    const { currentAdmin } = this.state;

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
                      <label htmlFor="name">Nama Admin</label>
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        value={currentAdmin.name}
                        onChange={this.onChangeName}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <input
                        type="text"
                        className="form-control"
                        id="email"
                        value={currentAdmin.email}
                        onChange={this.onChangeEmail}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="password">Password</label>
                      <input
                        type="password"
                        className="form-control"
                        id="password"
                        value={currentAdmin.password}
                        onChange={this.onChangePassword}
                      />
                    </div>
                  </form>

                  <button
                    type="submit"
                    className="btn btn-warning btn-sm mr-2"
                    onClick={this.updateAdmin}
                  >
                    Update
                  </button>
                  <Link
                    to={"/admins"}
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
