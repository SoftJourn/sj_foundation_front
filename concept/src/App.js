import React, { Component } from 'react';
import './App.css';
import $ from 'jquery';
import Nav from './components/nav';
import Project from './components/project';

class App extends Component {

  constructor() {
    super();
    this.state = {
      projects: [],
      dataUrl: 'http://localhost:8082/wp-json/wp/v2/projects'
    };
  }

  componentDidMount() {
    $.ajax({
      url: 'http://localhost:8080/wp-json/wp/v2/projects',
      dataType: 'json',
      cache: false,
      beforeSend: function ( xhr ) {
        xhr.setRequestHeader( 'X-WP-Nonce', window.wpApiSettings.nonce );
      },
      success: function(data) {
        this.setState({projects: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  }

  render() {
    console.log(this.state.projects)
    return (
      <div>
        <div className="container projects">
          <div className="row">
            {this.state.projects.map(value => {
              return (
                <Project
                  title={value.title.rendered}
                  shortDescription={value.excerpt.rendered}
                />
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
