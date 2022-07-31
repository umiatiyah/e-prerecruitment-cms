import React, { Component } from "react";
import Header from "../Header";
import Footer from "../Footer";
import Menu from "../Menu";
import CategoryService from "../../../services/category.service";
import QuestionService from "../../../services/question.service";

export default class AddQuestion extends Component {
  constructor(props) {
    super(props);
    this.onChangeCategoryID = this.onChangeCategoryID.bind(this);
    this.onChangeValueQuestion = this.onChangeValueQuestion.bind(this);
    this.onChangeStatus = this.onChangeStatus.bind(this);
    this.saveQuestion = this.saveQuestion.bind(this);

    this.state = {
      categories: [],
      category_id: 0,
      value: "",
      is_active: true,
    };
  }

  componentDidMount() {
    this.retrieveCategory();
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

  onChangeCategoryID(e) {
    this.setState({
      category_id: e.target.value,
    });
  }

  onChangeValueQuestion(e) {
    this.setState({
      value: e.target.value,
    });
  }

  onChangeStatus(e) {
    let status = e.target.value
    if (status === "true" || status === "false") {
      status = JSON.parse(status)
    }
    this.setState({
      is_active: status,
    });
  }

  saveQuestion() {
    QuestionService.add(this.state.category_id, this.state.value, this.state.is_active)
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
    const { categories } = this.state;
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
                      <label htmlFor="categoryName">Kriteria</label>
                      <select className="form-control" onChange={this.onChangeCategoryID}>
                        <option>Pilih Kriteria</option>
                        {this.state.categories ? (
                        <>
                        {categories.map((categories, index) => (
                        <option value={categories.id}>{categories.name}</option>
                        ))}
                        </>
                        ) : (
                        <option value="">Kriteria Kosong</option>
                        )}
                      </select>
                    </div>

                    <div className="form-group">
                      <label htmlFor="value">Deskripsi Pertanyaan</label>
                      <input
                        type="text"
                        className="form-control"
                        id="value"
                        required
                        value={this.state.value}
                        onChange={this.onChangeValueQuestion}
                        name="value"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="status">Status</label>
                      <select className="form-control" onChange={this.onChangeStatus}>
                        <option>Pilih Status</option>
                        <option value={true}>Active</option>
                        <option value={false}>Inactive</option>
                      </select>
                    </div>
                    <button
                      onClick={this.saveQuestion}
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
