import React, { Component } from 'react';
import axios from 'axios'
// import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      data: null,
      quote: "",
      author: "",
      count: 0,
      colors: ['#e6194b', '#3cb44b', '#ffe119', '#4363d8', '#f58231', '#911eb4', '#46f0f0', '#f032e6', '#bcf60c', '#fabebe'],
      currcolor: ''
    }
    this.handleClick = this.handleClick.bind(this);
  }
  componentDidMount(){
    axios.get('https://cors-anywhere.herokuapp.com/http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=10')
    .then((response) => {
      this.setState({
        data: response.data,
        quote: response.data[0].content.slice(3, response.data[0].content.length-5),
        author: response.data[0].title,
        count: this.state.count+1,
        currcolor: this.state.colors[0]

      })
      console.log(response.data[0])
    })
  }
  handleClick(){
    this.setState({
      quote: this.state.data[this.state.count].content.slice(3, this.state.data[this.state.count].content.length-5),
      author: this.state.data[this.state.count].title,
      currcolor: this.state.colors[this.state.count],
      count: (this.state.count+1)%10
    })
  }
  render() {
    document.body.style = 'background:' + this.state.currcolor + ';';
      const pageStyle = {
        width: '100%',
        height: '100%',
        fontFamily: 'Arial',
        // padding: '5%'
      }
      const boxStyle = {
        marginRight: 'auto',
        marginLeft: 'auto',
        width: '50%',
        borderRadius: '4px',
        backgroundColor: 'white',
        padding: '2%', 
      }
      let quoteBox = {
        marginLeft: 'auto', 
        marginRight: 'auto',
        width: '50%',
        textAlign: 'center',
        padding: '20px'
      }
      return (
        <div style={pageStyle}>
          <div style={boxStyle}>
            <div style={quoteBox}>
              {this.state.quote}<br />
              <span style={{float: "right"}}>-{this.state.author}</span>
            </div>
            <div>
              <a href='https://twitter.com/login?lang=en' target="_blank"><button className="button" style={{backgroundColor: this.state.currcolor}}>Twitter</button></a>
              <a href='https://facebook.com/login?lang=en' target="_blank"><button className="button" style={{backgroundColor: this.state.currcolor}}>Facebook</button></a>              
              <button className="button" onClick={this.handleClick} style={{float: 'right', backgroundColor: this.state.currcolor}}>New Quote</button>
            </div>
          </div>
        </div>
      )
    }
}

export default App;
