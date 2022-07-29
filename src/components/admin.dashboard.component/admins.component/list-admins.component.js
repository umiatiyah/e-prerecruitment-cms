import React, { Component } from "react";
import AdminService from "../../../services/admin.service";
import { Link } from "react-router-dom";
import Header from "../Header";
import Menu from "../Menu";
import Footer from "../Footer";
export default class ListAdmin extends Component {
  constructor(props) {
    super(props);
    this.retrieveAdmin = this.retrieveAdmin.bind(this);
    this.deleteAdmin = this.deleteAdmin.bind(this);
    this.state = {
      admins: [],
    };
  }

  componentDidMount() {
    this.retrieveAdmin();
  }

  retrieveAdmin() {
    AdminService.getAll()
      .then((response) => {
        this.setState({
          admins: response.data,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  deleteAdmin(id) {
    AdminService.delete(id)
      .then((response) => {
        alert(response.data.message);
        if (response.data.status === 200)
        {
          let updateAdmin = this.state.admins.filter((i) => i.id !== id);
          this.setState({ admins: updateAdmin });  
        }

        this.props.history.push("/admins");
      })
      .catch((e) => {
        alert(e);
      });
  }

  render() {
    const { admins } = this.state;

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
                        <h3 className="card-title ">Daftar Admin</h3>
                      </div>
                      <div className="col-sm-3">
                        <Link
                          to={"/admins/add"}
                          className="btn btn-block btn-success btn-xs"
                        >
                          Tambah Admin
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="card-body p-0">
                    <table className="table table-striped">
                      <thead>
                        <tr>
                          <th style={{ width: "10px" }}>#</th>
                          <th>Nama Admin</th>
                          <th>Email</th>
                          <th>Aksi</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.admins ? (
                          <>
                            {admins.map((admins, index) => (
                              <tr data-index={index}>
                                <td>{index+1}</td>
                                <td>{admins.name}</td>
                                <td>{admins.email}</td>
                                <td>
                                  <button
                                    className="btn btn-block btn-danger btn-xs mb-2"
                                    onClick={() =>
                                      this.deleteAdmin(admins.id)
                                    }
                                  >
                                    Hapus
                                  </button>
                                  <Link
                                    to={"/admins/" + admins.id}
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
                            <td colspan="4" className="text-center">
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
