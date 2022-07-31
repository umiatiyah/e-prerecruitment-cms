import React, { Component } from "react";
import AnswerService from "../../../services/answer.service";
import { Link } from "react-router-dom";
import Header from "../Header";
import Menu from "../Menu";
import Footer from "../Footer";
export default class ListAnswers extends Component {
  constructor(props) {
    super(props);
    this.retrieveAnswer = this.retrieveAnswer.bind(this);
    this.deleteAnswer = this.deleteAnswer.bind(this);
    this.state = {
      answers: [],
    };
  }

  componentDidMount() {
    this.retrieveAnswer();
  }

  retrieveAnswer() {
    AnswerService.getAll()
      .then((response) => {
        this.setState({
          answers: response.data,
        });
      })
      .catch((e) => {
      });
  }

  deleteAnswer(id) {
    AnswerService.delete(id)
      .then((response) => {
        alert(response.data.message);
        if (response.data.status === 200)
        {
          let updateAnswer = this.state.answers.filter((i) => i.id !== id);
          this.setState({ answers: updateAnswer });  
        }

        this.props.history.push("/answers");
      })
      .catch((e) => {
        alert(e);
      });
  }

  render() {
    const { answers } = this.state;

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
                        <h3 className="card-title ">Daftar Jawaban</h3>
                      </div>
                      <div className="col-sm-3">
                        <Link
                          to={"/answers/add"}
                          className="btn btn-block btn-success btn-xs"
                        >
                          Tambah Jawaban
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="card-body p-0">
                    <table className="table table-striped">
                      <thead>
                        <tr>
                          <th style={{ width: "10px" }}>#</th>
                          <th>Kriteria</th>
                          <th>Pertanyaan</th>
                          <th>Jawaban</th>
                          <th>Nilai</th>
                          <th>Status</th>
                          <th>Aksi</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.answers ? (
                          <>
                            {answers.map((answers, index) => (
                              <tr data-index={index}>
                                <td>{index+1}</td>
                                <td>{answers.category_value}</td>
                                <td>{answers.question_value}</td>
                                <td>{answers.answer_value}</td>
                                <td>{answers.score}</td>
                                <td>{answers.question_status}</td>
                                <td>
                                  <button
                                    className="btn btn-block btn-danger btn-xs mb-2"
                                    onClick={() =>
                                      this.deleteAnswer(answers.id)
                                    }
                                  >
                                    Hapus
                                  </button>
                                  <Link
                                    to={"/answers/" + answers.id}
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
