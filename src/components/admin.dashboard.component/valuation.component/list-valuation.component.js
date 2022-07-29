import React, { Component } from "react";
import ValuationService from "../../../services/valuation.service";
import Header from "../Header";
import Menu from "../Menu";
import Footer from "../Footer";
export default class ListValuation extends Component {
  constructor(props) {
    super(props);
    this.retrieveValuation = this.retrieveValuation.bind(this);
    this.state = {
      valuations: [],
    };
  }

  componentDidMount() {
    this.retrieveValuation();
  }

  retrieveValuation() {
    ValuationService.getAll()
      .then((response) => {
        this.setState({
          valuations: response.data,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    const { valuations } = this.state;

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
                          <th>User</th>
                          <th>NIK</th>
                          <th>Result</th>
                          <th>Tanggal</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.valuations ? (
                          <>
                            {valuations.map((valuations, index) => (
                              <tr data-index={index}>
                                <td>{index+1}</td>
                                <td>{valuations.user}</td>
                                <td>{valuations.nik_user}</td>
                                <td>{valuations.result}</td>
                                <td>{valuations.created_at}</td>
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
