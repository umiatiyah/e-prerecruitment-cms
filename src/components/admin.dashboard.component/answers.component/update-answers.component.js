import React, { Component } from "react";
import QuestionService from "../../../services/question.service";
import AnswerService from "../../../services/answer.service";
import { Link } from "react-router-dom";
import Footer from "../Footer";
import Header from "../Header";
import Menu from "../Menu";

export default class UpdateAnswer extends Component {
  constructor(props) {
    super(props);
    this.onChangeQuestionID = this.onChangeQuestionID.bind(this);
    this.onChangeAnswerValue = this.onChangeAnswerValue.bind(this);
    this.onChangeScore = this.onChangeScore.bind(this);
    this.getAnswer = this.getAnswer.bind(this);
    this.updateAnswer = this.updateAnswer.bind(this);

    this.state = {
      currentAnswer: [],
      questions: [],
    };
  }

  componentDidMount() {
    this.getAnswer(this.props.match.params.id);
    this.retrieveQuestion();
  }

  onChangeQuestionID(e) {
    const question_id = e.target.value;

    this.setState(function (prevState) {
      return {
        currentAnswer: {
          ...prevState.currentAnswer,
          question_id: question_id,
        },
      };
    });
  }

  onChangeAnswerValue(e) {
    const value = e.target.value;

    this.setState(function (prevState) {
      return {
        currentAnswer: {
          ...prevState.currentAnswer,
          value: value,
        },
      };
    });
  }

  onChangeScore(e) {
    const score = e.target.value;

    this.setState(function (prevState) {
      return {
        currentAnswer: {
          ...prevState.currentAnswer,
          score: score,
        },
      };
    });
  }

  retrieveQuestion() {
    QuestionService.getAll()
      .then((response) => {
        this.setState({
          questions: response.data,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  getAnswer(id) {
    AnswerService.get(id)
      .then((response) => {
        this.setState({
          currentAnswer: response.data,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  updateAnswer() {
    AnswerService.update(this.props.match.params.id, this.state.currentAnswer.question_id, this.state.currentAnswer.value, this.state.currentAnswer.score)
      .then((response) => {
        this.props.history.push("/answers");
        window.location.reload();
      })
      .catch((error) => {
        alert("sorry, something's wrong..");
        console.log(error);
      });
  }

  render() {
    const { currentAnswer } = this.state;
    const { questions } = this.state;

    return (
      <div>
        <Header />
        <Menu />
        <section className="content-wrapper">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-12">
                <div className="edit-form">
                  <h4>Jawaban</h4>
                  <form>
                    <div className="form-group">
                    <label htmlFor="categoryName">Pertanyaan</label>
                      <select className="form-control" onChange={this.onChangeQuestionID}>
                        <option value={currentAnswer.question_id}>{currentAnswer.question_value}</option>
                        {this.state.questions ? (
                        <>
                        {questions.filter((i) => i.id !== currentAnswer.question_id && i.is_active === "Active").map((questions, index) => (
                        <option value={questions.id}>{questions.value}</option>
                        ))}
                        </>
                        ) : (
                        <option value="">Pertanyaan Kosong</option>
                        )}
                      </select>
                    </div>
                    <div className="form-group">
                      <label htmlFor="value">Jawaban</label>
                      <input
                        type="text"
                        className="form-control"
                        id="value"
                        value={currentAnswer.value}
                        onChange={this.onChangeAnswerValue}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="score">Nilai</label>
                      <input
                        type="number"
                        className="form-control"
                        id="score"
                        value={currentAnswer.score}
                        onChange={this.onChangeScore}
                      />
                    </div>
                  </form>

                  <button
                    type="submit"
                    className="btn btn-warning btn-sm mr-2"
                    onClick={this.updateAnswer}
                  >
                    Update
                  </button>
                  <Link
                    to={"/answers"}
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
