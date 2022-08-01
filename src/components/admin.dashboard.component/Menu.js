import React, { Component } from "react";
import { Link } from "react-router-dom";
import AuthService from "../../services/auth.service";

export default class Menu extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
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
    const { currentUser } = this.state;
    return (
      <aside className="main-sidebar sidebar-light-primary elevation-4">
        {/* Brand Logo */}
        <a href="/dashboard" className="brand-link">
          <img
            src="/assets/dist/img/AdminLTELogo.png"
            alt="AdminLTE Logo"
            className="brand-image img-circle elevation-3"
            style={{ opacity: ".8" }}
          />
          <span className="brand-text font-weight-light">e-prerecruitment</span>
        </a>
        {/* Sidebar */}
        <div className="sidebar">
          {/* Sidebar user panel (optional) */}
          <div className="user-panel mt-3 pb-3 mb-3 d-flex">
            <div className="image">
              <img
                src="/assets/dist/img/user5-128x128.jpg"
                className="img-circle elevation-2"
                alt="User"
              />
            </div>
            {currentUser ? (
              <div className="info">
                <a href="/dashboard" className="d-block">
                  {currentUser.name}
                </a>
              </div>
            ) : (
              <div className="info">
                <a href="/login" className="d-block">
                  admin
                </a>
              </div>
            )}
          </div>
          {/* Sidebar Menu */}
          <nav className="mt-2">
            <ul
              className="nav nav-pills nav-sidebar flex-column"
              data-widget="treeview"
              role="menu"
              data-accordion="false"
            >
              {/* Add icons to the links using the .nav-icon class
           with font-awesome or any other icon font library */}
              <li className="nav-item ">
                <a href="#" className="nav-link">
                  <i class="nav-icon fas fa-user"></i>
                  <p>
                    Admin
                    <i className="right fas fa-angle-left" />
                  </p>
                </a>
                <ul className="nav nav-treeview">
                  <li className="nav-item">
                    <Link to="/admins" className="nav-link active">
                      <i class="nav-icon fas fa-table"></i>
                      <p>Daftar Admin</p>
                    </Link>
                  </li>
                </ul>
                <ul className="nav nav-treeview">
                  <li className="nav-item">
                    <Link to="/admins/add" className="nav-link active">
                      <i class="nav-icon fas fa-edit"></i>
                      <p>Tambah Admin</p>
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="nav-item ">
                <a href="#" className="nav-link">
                  <i class="nav-icon fas fa-users"></i>
                  <p>
                    User
                    <i className="right fas fa-angle-left" />
                  </p>
                </a>
                <ul className="nav nav-treeview">
                  <li className="nav-item">
                    <Link to="/users" className="nav-link active">
                      <i class="nav-icon fas fa-table"></i>
                      <p>Daftar User</p>
                    </Link>
                  </li>
                </ul>
                <ul className="nav nav-treeview">
                  <li className="nav-item">
                    <Link to="/users/add" className="nav-link active">
                      <i class="nav-icon fas fa-edit"></i>
                      <p>Tambah User</p>
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="nav-item ">
                <a href="#" className="nav-link">
                  <i class="nav-icon fas fa-images"></i>
                  <p>
                    Kriteria
                    <i className="right fas fa-angle-left" />
                  </p>
                </a>
                <ul className="nav nav-treeview">
                  <li className="nav-item">
                    <Link to="/categories" className="nav-link active">
                      <i class="nav-icon fas fa-table"></i>
                      <p>Daftar Kriteria</p>
                    </Link>
                  </li>
                </ul>
                <ul className="nav nav-treeview">
                  <li className="nav-item">
                    <Link to="/categories/add" className="nav-link active">
                      <i class="nav-icon fas fa-edit"></i>
                      <p>Tambah Kriteria</p>
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="nav-item ">
                <a href="#" className="nav-link">
                  <i class="nav-icon fas fa-images"></i>
                  <p>
                    Pertanyaan
                    <i className="right fas fa-angle-left" />
                  </p>
                </a>
                <ul className="nav nav-treeview">
                  <li className="nav-item">
                    <Link to="/questions" className="nav-link active">
                      <i class="nav-icon fas fa-table"></i>
                      <p>Daftar Pertanyaan</p>
                    </Link>
                  </li>
                </ul>
                <ul className="nav nav-treeview">
                  <li className="nav-item">
                    <Link to="/questions/add" className="nav-link active">
                      <i class="nav-icon fas fa-edit"></i>
                      <p>Tambah Pertanyaan</p>
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="nav-item ">
                <a href="#" className="nav-link">
                  <i className="nav-icon fas fa-images" />
                  <p>
                    Jawaban
                    <i className="right fas fa-angle-left" />
                  </p>
                </a>
                <ul className="nav nav-treeview">
                  <li className="nav-item">
                    <Link to="/answers" className="nav-link active">
                      <i className="nav-icon fas fa-table" />
                      <p>Daftar Jawaban</p>
                    </Link>
                  </li>
                </ul>
                <ul className="nav nav-treeview">
                  <li className="nav-item">
                    <Link to="/answers/add" className="nav-link active">
                      <i className="nav-icon fas fa-edit" />
                      <p>Tambah Jawaban</p>
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="nav-item ">
                <a href="/history" className="nav-link">
                  <i className="nav-icon fas fa-images" />
                  <p>Riwayat Tes</p>
                </a>
              </li>
              <li className="nav-item ">
                <a href="/valuation" className="nav-link">
                  <i className="nav-icon fas fa-images" />
                  <p>
                    Keterangan Bobot User
                  </p>
                </a>
              </li>
              <li className="nav-item ">
                <a href="/result" className="nav-link">
                  <i className="nav-icon fas fa-images" />
                  <p>Hasil Tes</p>
                </a>
              </li>
            </ul>
          </nav>
          {/* /.sidebar-menu */}
        </div>
        {/* /.sidebar */}
      </aside>
    );
  }
}
