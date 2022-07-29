import React, { Component } from "react";
import HistoryService from "../../../services/history.service";
import Header from "../Header";
import Menu from "../Menu";
import Footer from "../Footer";
export default class ListHistory extends Component {
  constructor(props) {
    super(props);
    this.retrieveHistory = this.retrieveHistory.bind(this);
    this.state = {
      histories: [],
    };
  }

  componentDidMount() {
    this.retrieveHistory();
  }

  retrieveHistory() {
    HistoryService.getAll()
      .then((response) => {
        this.setState({
          histories: response.data,
        });
        console.log("history",response);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    const { histories } = this.state;

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
                        <h3 className="card-title ">History</h3>
                      </div>
                    </div>
                  </div>
                  <div className="card-body p-0">
                    <table className="table table-striped">
                      <thead>
                        <tr>
                          <th style={{ width: "10px" }}>#</th>
                          <th>Kategori</th>
                          <th>Pertanyaan</th>
                          <th>Jawaban</th>
                          <th>User</th>
                          <th>NIK</th>
                          <th>Tanggal</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.histories ? (
                          <>
                            {histories.map((histories, index) => (
                              <tr data-index={index}>
                                <td>{index+1}</td>
                                <td>{histories.category_value}</td>
                                <td>{histories.question_value}</td>
                                <td>{histories.answer_value}</td>
                                <td>{histories.user}</td>
                                <td>{histories.nik_user}</td>
                                <td>{histories.created_at}</td>
                              </tr>
                            ))}
                          </>
                        ) : (
                          <tr>
                            <td colspan="7" className="text-center">
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
