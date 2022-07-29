import React, { Component } from "react";
import QuestionService from "../../../services/question.service";
import CategoryService from "../../../services/category.service";
import { Link } from "react-router-dom";
import Footer from "../Footer";
import Header from "../Header";
import Menu from "../Menu";

export default class UpdateQuestion extends Component {
  constructor(props) {
    super(props);
    this.onChangeCategoryID = this.onChangeCategoryID.bind(this);
    this.onChangeQuestionValue = this.onChangeQuestionValue.bind(this);
    this.onChangeQuestionStatus = this.onChangeQuestionStatus.bind(this);
    this.getQuestion = this.getQuestion.bind(this);
    this.updateQuestion = this.updateQuestion.bind(this);

    this.state = {
      currentQuestion: [],
      categories: [],
      questionStatus: [{
        status:"Active",
        value:true
      },
      {
        status:"Inactive",
        value:false
      }
    ],
      status: "",
      statusBool: Boolean,
    };
  }

  componentDidMount() {
    this.getQuestion(this.props.match.params.id);
    this.retrieveCategory();
  }

  onChangeCategoryID(e) {
    const category_id = e.target.value;

    this.setState(function (prevState) {
      return {
        currentQuestion: {
          ...prevState.currentQuestion,
          category_id: category_id,
        },
      };
    });
  }

  onChangeQuestionValue(e) {
    const value = e.target.value;

    this.setState(function (prevState) {
      return {
        currentQuestion: {
          ...prevState.currentQuestion,
          value: value,
        },
      };
    });
  }

  onChangeQuestionStatus(e) {
    let status = e.target.value;
    if (status === "true" || status === "false") {
      status = JSON.parse(status)
    }
    this.setState(function (prevState) {
      return {
        currentQuestion: {
          ...prevState.currentQuestion,
          is_active: status,
        },
      };
    });
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

  getQuestion(id) {
    QuestionService.get(id)
      .then((response) => {
        this.setState({
          currentQuestion: response.data,
        });
        if (response.data.is_active) {
          this.setState({
            status: "Active",
            statusBool: true
          })
        }
        else
        {
          this.setState({
            status: "Inactive",
            statusBool: false
          })
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }

  updateQuestion() {
    QuestionService.update(this.props.match.params.id, this.state.currentQuestion.category_id, this.state.currentQuestion.value, this.state.currentQuestion.is_active)
      .then((response) => {
        this.props.history.push("/questions");
        window.location.reload();
      })
      .catch((error) => {
        alert("sorry, something's wrong..");
        console.log(error);
      });
  }

  render() {
    const { currentQuestion } = this.state;
    const { categories } = this.state;
    const { questionStatus } = this.state;

    return (
      <div>
        <Header />
        <Menu />
        <section className="content-wrapper">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-12">
                <div className="edit-form">
                  <h4>Pertanyaan</h4>
                  <form>
                    <div className="form-group">
                    <label htmlFor="categoryName">Kategori</label>
                      <select className="form-control" onChange={this.onChangeCategoryID}>
                        <option value={currentQuestion.category_id}>{currentQuestion.category_name}</option>
                        {this.state.categories ? (
                        <>
                        {categories.filter((i) => i.id !== currentQuestion.category_id).map((categories, index) => (
                        <option value={categories.id}>{categories.name}</option>
                        ))}
                        </>
                        ) : (
                        <option value="">Kategori Kosong</option>
                        )}
                      </select>
                    </div>
                    <div className="form-group">
                      <label htmlFor="value">Pertanyaan</label>
                      <input
                        type="text"
                        className="form-control"
                        id="value"
                        value={currentQuestion.value}
                        onChange={this.onChangeQuestionValue}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="status">Status</label>
                      <select className="form-control" onChange={this.onChangeQuestionStatus}>
                        <option value={this.state.statusBool}>{this.state.status}</option>
                        {this.state.questionStatus ? (
                        <>
                        {questionStatus.filter((i) => i.status !== this.state.status).map((questionStatus, index) => (
                        <option value={questionStatus.value}>{questionStatus.status}</option>
                        ))}
                        </>
                        ) : (
                        <option value="">Status Kosong</option>
                        )}
                      </select>
                    </div>
                  </form>

                  <button
                    type="submit"
                    className="btn btn-warning btn-sm mr-2"
                    onClick={this.updateQuestion}
                  >
                    Update
                  </button>
                  <Link
                    to={"/questions"}
                    className="btn btn-primary btn-sm"
                    type="submit"
                  >
                    Back
                  </Link>
                  <p>{this.state.message}</p>
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
