import React, { Component } from "react";
import CategoryService from "../../../services/category.service";
import { Link } from "react-router-dom";
import Footer from "../Footer";
import Header from "../Header";
import Menu from "../Menu";

export default class UpdateCategory extends Component {
  constructor(props) {
    super(props);
    this.onChangeCategoryName = this.onChangeCategoryName.bind(this);
    this.onChangeMinScore = this.onChangeMinScore.bind(this);
    this.onChangeDuration = this.onChangeDuration.bind(this);
    this.onChangeLimitQuestion = this.onChangeLimitQuestion.bind(this);
    this.getCategory = this.getCategory.bind(this);
    this.updateCategory = this.updateCategory.bind(this);

    this.state = {
      currentCategory: [],
      message: "",
    };
  }

  componentDidMount() {
    this.getCategory(this.props.match.params.id);
  }

  onChangeCategoryName(e) {
    const categoryName = e.target.value;

    this.setState(function (prevState) {
      return {
        currentCategory: {
          ...prevState.currentCategory,
          categoryName: categoryName,
        },
      };
    });
  }

  onChangeMinScore(e) {
    const min_score = e.target.value;

    this.setState((prevState) => ({
      currentCategory: {
        ...prevState.currentCategory,
        min_score: min_score,
      },
    }));
  }

  onChangeDuration(e) {
    const duration = e.target.value;

    this.setState((prevState) => ({
      currentCategory: {
        ...prevState.currentCategory,
        duration: duration,
      },
    }));
  }

  onChangeLimitQuestion(e) {
    const limit_question = e.target.value;

    this.setState((prevState) => ({
      currentCategory: {
        ...prevState.currentCategory,
        limit_question: limit_question,
      },
    }));
  }

  getCategory(id) {
    CategoryService.get(id)
      .then((response) => {
        this.setState({
          currentCategory: response.data,
        });
      })
      .catch((e) => {
      });
  }

  updateCategory() {
    CategoryService.update(this.props.match.params.id, this.state.currentCategory.name, this.state.currentCategory.min_score,
      this.state.currentCategory.duration, this.state.currentCategory.limit_question)
      .then((response) => {
        this.props.history.push("/categories");
        window.location.reload();
      })
      .catch((error) => {
        alert("sorry, something's wrong..");
      });
  }

  render() {
    const { currentCategory } = this.state;

    return (
      <div>
        <Header />
        <Menu />
        <section className="content-wrapper">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-12">
                <div className="edit-form">
                  <h4>Category</h4>
                  <form>
                    <div className="form-group">
                      <label htmlFor="name">Nama Kategori</label>
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        value={currentCategory.name}
                        onChange={this.onChangeCategoryName}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="min_score">Minimal Nilai</label>
                      <input
                        type="text"
                        className="form-control"
                        id="min_score"
                        value={currentCategory.min_score}
                        onChange={this.onChangeMinScore}
                      />
                    </div>
                    {/* <div className="form-group">
                      <label htmlFor="duration">Durasi Pengerjaan (minute)</label>
                      <input
                        type="text"
                        className="form-control"
                        id="duration"
                        value={currentCategory.duration}
                        onChange={this.onChangeDuration}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="limit_question">Batas Soal</label>
                      <input
                        type="text"
                        className="form-control"
                        id="limit_question"
                        value={currentCategory.limit_question}
                        onChange={this.onChangeLimitQuestion}
                      />
                    </div> */}
                  </form>

                  <button
                    type="submit"
                    className="btn btn-warning btn-sm mr-2"
                    onClick={this.updateCategory}
                  >
                    Update
                  </button>
                  <Link
                    to={"/categories"}
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
