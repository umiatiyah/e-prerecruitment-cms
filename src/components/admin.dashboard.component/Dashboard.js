import React, { Component } from "react";
import DashboardService from "../../services/dashboard.service";
export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.count = this.count.bind(this);
    this.state = {
      count_admin: 0,
      count_user: 0,
      count_category: 0,
      count_question: 0,
      count_answer: 0,
    };
  }

  componentDidMount() {
    this.count();
  }

  count() {
    DashboardService.count()
      .then((response) => {
        this.setState({
          count_admin: response.data.count_admin,
          count_user: response.data.count_user,
          count_category: response.data.count_category,
          count_question: response.data.count_question,
          count_answer: response.data.count_answer,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    return (
      <div className="content-wrapper">
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1 className="m-0">Dashboard</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <a href="#">Home</a>
                  </li>
                  <li className="breadcrumb-item active">Dashboard</li>
                </ol>
              </div>
            </div>
          </div>
        </div>

        <section className="content">
          <div className="container-fluid">
            <div className="row">
            
            <div className="col-lg-6 col-12">
                <div className="small-box bg-info">
                  <div className="inner">
                    <h3>{this.state.count_admin}</h3>
                    <p>Admin</p>
                  </div>
                  <div className="icon">
                    <i className="ion ion-ios-person"></i>
                  </div>
                  <a href="/products" className="small-box-footer">
                    More info <i className="fas fa-arrow-circle-right"></i>
                  </a>
                </div>
              </div>
            
              <div className="col-lg-6 col-12">
                <div className="small-box bg-primary">
                  <div className="inner">
                    <h3>{this.state.count_user}</h3>
                    <p>User</p>
                  </div>
                  <div className="icon">
                    <i className="ion ion-ios-people"></i>
                  </div>
                  <a href="/products" className="small-box-footer">
                    More info <i className="fas fa-arrow-circle-right"></i>
                  </a>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-4 col-8">
                <div className="small-box bg-danger">
                  <div className="inner">
                    <h3>{this.state.count_category}</h3>
                    <p>Kategori</p>
                  </div>
                  <div className="icon">
                    <i className="ion ion-document"></i>
                  </div>
                  <a href="/categories" className="small-box-footer">
                    More info <i className="fas fa-arrow-circle-right"></i>
                  </a>
                </div>
              </div>
            
              <div className="col-lg-4 col-8">
                <div className="small-box bg-warning">
                  <div className="inner">
                    <h3>{this.state.count_question}</h3>
                    <p>Pertanyaan</p>
                  </div>
                  <div className="icon">
                    <i className="ion ion-document-text"></i>
                  </div>
                  <a href="/products" className="small-box-footer">
                    More info <i className="fas fa-arrow-circle-right"></i>
                  </a>
                </div>
              </div>
            
              <div className="col-lg-4 col-8">
                <div className="small-box bg-success">
                  <div className="inner">
                    <h3>{this.state.count_answer}</h3>
                    <p>Jawaban</p>
                  </div>
                  <div className="icon">
                    <i className="ion ion-clipboard"></i>
                  </div>
                  <a href="/products" className="small-box-footer">
                    More info <i className="fas fa-arrow-circle-right"></i>
                  </a>
                </div>
              </div>

            </div>
          </div>
        </section>
      </div>
    );
  }
}
