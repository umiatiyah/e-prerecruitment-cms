import React, { Component } from "react";
import QuestionService from "../../../services/question.service";
import { Link } from "react-router-dom";
import Header from "../Header";
import Menu from "../Menu";
import Footer from "../Footer";
export default class ListQuestions extends Component {
  constructor(props) {
    super(props);
    this.retrieveQuestion = this.retrieveQuestion.bind(this);
    this.deleteQuestion = this.deleteQuestion.bind(this);
    this.state = {
      questions: [],
    };
  }

  componentDidMount() {
    this.retrieveQuestion();
  }

  retrieveQuestion() {
    QuestionService.getAll()
      .then((response) => {
        console.log("ress:: ",response);
        this.setState({
          questions: response.data,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  deleteQuestion(id) {
    QuestionService.delete(id)
      .then((response) => {
        alert(response.data.message);
        if (response.data.status === 200)
        {
          let updateQuestion = this.state.questions.filter((i) => i.id !== id);
          this.setState({ questions: updateQuestion });  
        }

        this.props.history.push("/questions");
      })
      .catch((e) => {
        alert(e);
      });
  }

  render() {
    const { questions } = this.state;

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
                        <h3 className="card-title ">Daftar Pertanyaan</h3>
                      </div>
                      <div className="col-sm-3">
                        <Link
                          to={"/questions/add"}
                          className="btn btn-block btn-success btn-xs"
                        >
                          Tambah Pertanyaan
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
                          <th>Status</th>
                          <th>Aksi</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.questions ? (
                          <>
                            {questions.map((questions, index) => (
                              <tr data-index={index}>
                                <td>{index+1}</td>
                                <td>{questions.category_name}</td>
                                <td>{questions.value}</td>
                                <td>{questions.is_active}</td>
                                <td>
                                  <button
                                    className="btn btn-block btn-danger btn-xs mb-2"
                                    onClick={() =>
                                      this.deleteQuestion(questions.id)
                                    }
                                  >
                                    Hapus
                                  </button>
                                  <Link
                                    to={"/questions/" + questions.id}
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
