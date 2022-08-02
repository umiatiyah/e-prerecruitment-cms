import React, { Component } from "react";
import CategoryService from "../../../services/category.service";
import Header from "../Header";
import Menu from "../Menu";
import Footer from "../Footer";
export default class ListBobotCategory extends Component {
  constructor(props) {
    super(props);
    this.retrieveBobotCategory = this.retrieveBobotCategory.bind(this);
    this.state = {
      categories: [],
    };
  }

  componentDidMount() {
    this.retrieveBobotCategory();
  }

  retrieveBobotCategory() {
    CategoryService.getBobotCategory()
      .then((response) => {
        this.setState({
          categories: response.data,
        });
      })
      .catch((e) => {
        console.log(e);
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
                        <h3 className="card-title ">Valuation</h3>
                      </div>
                    </div>
                  </div>
                  <div className="card-body p-0">
                    <table className="table table-striped">
                      <thead>
                        <tr>
                          <th style={{ width: "10px" }}>#</th>
                          <th>Category</th>
                          <th>Bobot</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.categories ? (
                          <>
                            {categories.map((categories, index) => (
                              <tr data-index={index}>
                                <td>{index+1}</td>
                                <td>{categories.value}</td>
                                <td>{categories.bobot}</td>
                              </tr>
                            ))}
                          </>
                        ) : (
                          <tr>
                            <td colspan="3" className="text-center">
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
