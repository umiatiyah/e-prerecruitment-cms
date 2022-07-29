import React, { Component } from "react";
import Header from "../Header";
import Footer from "../Footer";
import Menu from "../Menu";
import QuestionService from "../../../services/question.service";
import AnswerService from "../../../services/answer.service";

export default class AddAnswer extends Component {
  constructor(props) {
    super(props);
    this.onChangeQuestionID = this.onChangeQuestionID.bind(this);
    this.onChangeValueAnswer = this.onChangeValueAnswer.bind(this);
    this.onChangeScore = this.onChangeScore.bind(this);
    this.saveAnswer = this.saveAnswer.bind(this);

    this.state = {
      questions: [],
      question_id: 0,
      value: "",
      score: 0,
    };
  }

  componentDidMount() {
    this.retrieveQuestion();
  }

  retrieveQuestion() {
    QuestionService.getAll()
      .then((response) => {
        this.setState({
          questions: response.data,
        });
        console.log("RESS::",response.data);
      })
      .catch((e) => {
      });
  }

  onChangeQuestionID(e) {
    this.setState({
      question_id: e.target.value,
    });
  }

  onChangeValueAnswer(e) {
    this.setState({
      value: e.target.value,
    });
  }

  onChangeScore(e) {
    this.setState({
      score: e.target.value,
    });
  }

  saveAnswer() {
    AnswerService.add(this.state.question_id, this.state.value, this.state.score)
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
    const { questions } = this.state;
    return (
      <div>
        <Header />
        <Menu />
        <section className="content-wrapper">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-12">
                <div className="submit-form">
                  <div>
                    <div className="form-group">
                      <label htmlFor="questionValue">Pertanyaan</label>
                      <select className="form-control" onChange={this.onChangeQuestionID}>
                        <option>Pilih Pertanyaan</option>
                        {this.state.questions ? (
                        <>
                        {questions.filter(k=>k.is_active==="Active").map((questions, index) => (
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
                        required
                        value={this.state.value}
                        onChange={this.onChangeValueAnswer}
                        name="value"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="score">Score</label>
                      <input
                        type="number"
                        className="form-control"
                        id="score"
                        required
                        value={this.state.score}
                        onChange={this.onChangeScore}
                        name="score"
                      />
                    </div>
                    <button
                      onClick={this.saveAnswer}
                      className="btn btn-block btn-success btn-sm"
                    >
                      Submit
                    </button>
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
