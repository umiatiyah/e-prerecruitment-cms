import React, { Component } from "react";
import CategoryService from "../../../services/category.service";
import { Link } from "react-router-dom";
import Header from "../Header";
import Menu from "../Menu";
import Footer from "../Footer";
export default class ListCategory extends Component {
  constructor(props) {
    super(props);
    this.retrieveCategory = this.retrieveCategory.bind(this);
    this.deleteCategory = this.deleteCategory.bind(this);
    this.state = {
      categories: [],
    };
  }

  componentDidMount() {
    this.retrieveCategory();
  }

  retrieveCategory() {
    CategoryService.getAll()
      .then((response) => {
        this.setState({
          categories: response.data,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  deleteCategory(id) {
    CategoryService.delete(id)
      .then((response) => {
        alert(response.data.message);
        if (response.data.status === 200)
        {
          let updateCategory = this.state.categories.filter((i) => i.id !== id);
          this.setState({ categories: updateCategory });  
        }

        this.props.history.push("/categories");
      })
      .catch((e) => {
        alert(e);
      });
  }

  render() {
    const { categories } = this.state;

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
                        <h3 className="card-title ">Daftar Kategori</h3>
                      </div>
                      <div className="col-sm-3">
                        <Link
                          to={"/categories/add"}
                          className="btn btn-block btn-success btn-xs"
                        >
                          Tambah Kategori
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="card-body p-0">
                    <table className="table table-striped">
                      <thead>
                        <tr>
                          <th style={{ width: "10px" }}>#</th>
                          <th>Nama Kategori</th>
                          <th>Nilai Minimal</th>
                          {/* <th>Durasi</th>
                          <th>Batas Pertanyaan</th> */}
                          <th>Aksi</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.categories ? (
                          <>
                            {categories.map((categories, index) => (
                              <tr data-index={index}>
                                <td>{index+1}</td>
                                <td>{categories.name}</td>
                                <td>{categories.min_score}</td>
                                {/* <td>{categories.duration}</td>
                                <td>{categories.limit_question}</td> */}
                                <td>
                                  <button
                                    className="btn btn-block btn-danger btn-xs mb-2"
                                    onClick={() =>
                                      this.deleteCategory(categories.id)
                                    }
                                  >
                                    Hapus
                                  </button>
                                  <Link
                                    to={"/categories/" + categories.id}
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
