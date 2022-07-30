import React, { Component } from "react";
import ResultService from "../../../services/result.service";
import Header from "../Header";
import Menu from "../Menu";
import Footer from "../Footer";
export default class ListResult extends Component {
  constructor(props) {
    super(props);
    this.retrieveResult = this.retrieveResult.bind(this);
    this.state = {
      results: [],
    };
  }

  componentDidMount() {
    this.retrieveResult();
  }

  retrieveResult() {
    ResultService.getAll()
      .then((response) => {
        this.setState({
          results: response.data,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    const { results } = this.state;

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
                        <h3 className="card-title ">Results</h3>
                      </div>
                    </div>
                  </div>
                  <div className="card-body p-0">
                    <table className="table table-striped">
                      <thead>
                        <tr>
                          <th style={{ width: "10px" }}>#</th>
                          <th>User</th>
                          <th>NIK</th>
                          <th>Result</th>
                          <th>Tanggal</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.results ? (
                          <>
                            {results.map((results, index) => (
                              <tr data-index={index}>
                                <td>{index+1}</td>
                                <td>{results.user}</td>
                                <td>{results.nik_user}</td>
                                <td>{results.result}</td>
                                <td>{results.created_at}</td>
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
