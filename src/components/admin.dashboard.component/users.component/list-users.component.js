import React, { Component } from "react";
import UserService from "../../../services/users.service";
import { Link } from "react-router-dom";
import Header from "../Header";
import Menu from "../Menu";
import Footer from "../Footer";
export default class ListUser extends Component {
  constructor(props) {
    super(props);
    this.retrieveUser = this.retrieveUser.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
    this.state = {
      users: [],
    };
  }

  componentDidMount() {
    this.retrieveUser();
  }

  retrieveUser() {
    UserService.getAll()
      .then((response) => {
        this.setState({
          users: response.data,
        });
        console.log("USERS::",response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  deleteUser(id) {
    UserService.delete(id)
      .then((response) => {
        alert(response.data.message);
        if (response.data.status === 200)
        {
          let updateUser = this.state.users.filter((i) => i.id !== id);
          this.setState({ users: updateUser });  
        }

        this.props.history.push("/users");
      })
      .catch((e) => {
        alert(e);
      });
  }

  render() {
    const { users } = this.state;

    return (
      <div>
        <Header />
        <Menu />
        <section className="content-wrapper">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-12">
                <div className="card">
                  <div className="card-header">
                    <div className="row">
                      <div className="col-sm-9">
                        <h3 className="card-title ">Daftar User</h3>
                      </div>
                      <div className="col-sm-3">
                        <Link
                          to={"/users/add"}
                          className="btn btn-block btn-success btn-xs"
                        >
                          Tambah User
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="card-body p-0">
                    <table className="table table-striped">
                      <thead>
                        <tr>
                          <th style={{ width: "10px" }}>#</th>
                          <th>Nama User</th>
                          <th>NIK</th>
                          <th>Email</th>
                          <th>Aksi</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.users ? (
                          <>
                            {users.map((users, index) => (
                              <tr data-index={index}>
                                <td>{index+1}</td>
                                <td>{users.name}</td>
                                <td>{users.nik}</td>
                                <td>{users.email}</td>
                                <td>
                                  <button
                                    className="btn btn-block btn-danger btn-xs mb-2"
                                    onClick={() =>
                                      this.deleteUser(users.id)
                                    }
                                  >
                                    Hapus
                                  </button>
                                  <Link
                                    to={"/users/" + users.id}
                                    className="btn btn-block btn-warning btn-xs"
                                  >
                                    Edit
                                  </Link>
                                </td>
                              </tr>
                            ))}
                          </>
                        ) : (
                          <tr>
                            <td colspan="5" className="text-center">
                              Data Kosong
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
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
