import React, { Component } from "react";
import Header from "../Header";
import Footer from "../Footer";
import Menu from "../Menu";
import CategoryService from "../../../services/category.service";

export default class AddCategory extends Component {
  constructor(props) {
    super(props);
    this.onChangeCategoryName = this.onChangeCategoryName.bind(this);
    this.onChangeMinScore = this.onChangeMinScore.bind(this);
    this.onChangeDuration = this.onChangeDuration.bind(this);
    this.onChangeLimitQuestion = this.onChangeLimitQuestion.bind(this);
    this.saveCategory = this.saveCategory.bind(this);

    this.state = {
      name: "",
      min_score: 0,
      duration: 0,
      limit_question:0,
    };
  }

  onChangeCategoryName(e) {
    this.setState({
      name: e.target.value,
    });
  }

  onChangeMinScore(e) {
    this.setState({
      min_score: e.target.value,
    });
  }

  onChangeDuration(e) {
    this.setState({
      duration: e.target.value,
    });
  }

  onChangeLimitQuestion(e) {
    this.setState({
      limit_question: e.target.value,
    });
  }


  saveCategory() {
    
    CategoryService.add(this.state.name, this.state.min_score,
      this.state.duration, this.state.limit_question)
      .then((response) => {
        this.props.history.push("/categories");
        window.location.reload();
      })
      .catch((error) => {
        alert("sorry, something's wrong..");
        console.log(error);
      });
  }

  render() {
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
                      <label htmlFor="categoryName">Nama Kategori</label>
                      <input
                        type="text"
                        className="form-control"
                        id="categoryName"
                        required
                        value={this.state.name}
                        onChange={this.onChangeCategoryName}
                        name="categoryName"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="min_score">Nilai Minimal</label>
                      <input
                        type="text"
                        className="form-control"
                        id="min_score"
                        required
                        value={this.state.min_score}
                        onChange={this.onChangeMinScore}
                        name="min_score"
                      />
                    </div>

                    {/* <div className="form-group">
                      <label htmlFor="duration">Durasi</label>
                      <input
                        type="text"
                        className="form-control"
                        id="duration"
                        required
                        value={this.state.duration}
                        onChange={this.onChangeDuration}
                        name="duration"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="limit_question">Batas Pertanyaan</label>
                      <input
                        type="text"
                        className="form-control"
                        id="limit_question"
                        required
                        value={this.state.limit_question}
                        onChange={this.onChangeLimitQuestion}
                        name="limit_question"
                      />
                    </div> */}
                    <button
                      onClick={this.saveCategory}
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
