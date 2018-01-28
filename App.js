import React, { Component } from 'react';
import axios from 'axios';
import './ui-toolkit/css/nm-cx/main.css';
import './App.css';

const movieApi = 'http://www.omdbapi.com/?apikey=a72899a7&t='


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      enteredMovie: '',
      movieFound: false,
      year: '',
      director: '',
      plot: ''

    };


    this.handleOnClick = this.handleOnClick.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);

  }

  handleOnChange({ target }) {

    this.setState({ enteredMovie: target.value });
  }

  handleOnClick(e) {
    axios.get(movieApi + this.state.enteredMovie)
      .then((response) => {
        const data = response.data;

        data.Response === 'True' ?  this.setState({
          year: data.Year, director: data.Director, plot: data.Plot,
          movieFound: true, enteredMovie: ''
        })
          :  this.setState({
            movieFound: false, year: '', director: '', plot: '',
            enteredMovie: 'Movie Not Foiund'
          });

      })
  }

  render() {



    return (
      <div className="row">
        <div class="small-3 small-centered columns">
          <h1>Movie Data</h1>
        </div>
        <div className='small-6 large-centered columns'>

          <div className='row padding-vert-large'>
            <input onChange={this.handleOnChange} type="text" value={this.state.enteredMovie} placeholder="Enter Movie Title" />
            <button onClick={this.handleOnClick}>Search</button>
          </div>
          {this.state.movieFound === true &&
            <div className="row padding-vert-large padding-horiz-xlarge">
            <div className="row padding-vert-large padding-horiz-xlarge">Year: {this.state.year}</div>
              <div className="row padding-vert-large padding-horiz-xlarge">Director: {this.state.director}</div>
              <div className="row padding-vert-large padding-horiz-xlarge">Plot: {this.state.plot}</div>
            </div>
          }
        </div>
      </div>
    );
  }
}

export default App;
