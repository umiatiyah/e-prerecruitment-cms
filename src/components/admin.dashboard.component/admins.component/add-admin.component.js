import React, { Component } from "react";
import Header from "../Header";
import Footer from "../Footer";
import Menu from "../Menu";
import AdminService from "../../../services/admin.service";

export default class AddAdmin extends Component {
  constructor(props) {
    super(props);
    this.onChangeAdminName = this.onChangeAdminName.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.saveAdmin = this.saveAdmin.bind(this);

    this.state = {
      name: "",
      email: "",
    };
  }

  onChangeAdminName(e) {
    this.setState({
      name: e.target.value,
    });
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value,
    });
  }


  saveAdmin() {
    AdminService.add(this.state.name, this.state.email)
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
                      <label htmlFor="adminName">Nama Admin</label>
                      <input
                        type="text"
                        className="form-control"
                        id="adminName"
                        required
                        value={this.state.name}
                        onChange={this.onChangeAdminName}
                        name="adminName"
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

                    <button
                      onClick={this.saveAdmin}
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
