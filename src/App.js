import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    let month = this.getCurrentMonth();
    let year = this.getCurrentYear();
    this.state = {
      month: month,
      year: year
    }
    this.handleClickNext = this.handleClickNext.bind(this);
    this.handleClickPrev = this.handleClickPrev.bind(this);
  }

  getCurrentMonth() {
    var date = new Date();
    return date.getMonth();
  }

  getCurrentYear() {
    var date = new Date();
    return date.getFullYear();
  }

  handleClickNext() {
    let newMonth = this.state.month + 1;
    let newState = { month: newMonth, year: this.state.year};
    this.setState(newState);
  }

  handleClickPrev() {
    let newMonth = this.state.month - 1;
    let newState = { month: newMonth, year: this.state.year};
    this.setState(newState);
  }

  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Month month={this.state.month} year={this.state.year} 
          handleClickNext={this.handleClickNext}  handleClickPrev = {this.handleClickPrev }/>
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

class Square extends React.Component {

  render() {
    return (
      <button className="square">
        {this.props.value}
      </button>
    );
  }
}

class Month extends React.Component {

  constructor(props) {
    super(props);
    let temp = this.generateCalendar(this.props.month);
    this.state = {
      value: temp,
      month: this.props.month
    }
    this.handleClickPrev = this.handleClickPrev.bind(this);
    this.handleClickNext = this.handleClickNext.bind(this);
  }

  renderSquare(i, j) {
    return <Square value={this.state.value[i][j]} index={i} />;
  }

  handleClickPrev(index) {
    this.props.handleClickPrev();
    let newTemp = this.generateCalendar(this.state.month - 1);
    this.setState({value: newTemp, month: this.state.month - 1});
  }

  handleClickNext(index) {
    this.props.handleClickNext();
    let newTemp = this.generateCalendar(this.state.month + 1);
    this.setState({value: newTemp,  month: this.state.month + 1});
  }

  generateCalendarRow(j) {
    let calendarRow = [];
    for (let i = 0; i < 7; i++) {
      calendarRow.push(this.renderSquare(j, i));
    }
    return calendarRow;
  }

  generateCalendarRowFirst() {
    const dayOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    let calendarRow = [];
    for (let i = 0; i < 7; i++) {
      calendarRow.push(<div className="days">{dayOfWeek[i]}</div>);
    }
    return calendarRow;
  }

  getStartDay(month) {
    var date = new Date(this.props.year, month, 1);
    return date.getDay();
  }

  getEndDay(month) {
    var date = new Date(this.props.year, month, 1);
    var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    return lastDay.getDate() + 1;
  }

  getCurrentMonthName(month) {
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'Spetember', 'October', 'November', 'December'];
    return months[month];
  }

  generateCalendar(month) {
    let temp = [];
    let day = 1;
    let fill = false;
    for (let i = 0; i < 5; i++) {
      temp[i] = [];
      for (let j = 0; j < 7; j++) {
        if ((i + (i + 1) * j) === this.getStartDay(month) || fill) {
          temp[i][j] = (day);
          day++;
          if (day === this.getEndDay(month)) {
            break;
          }
          fill = true;
        }
      }
      if (day === this.getEndDay(month)) {
        break;
      }
    }
    return temp;
  }
getCalendarView(){
  const calendar = [];
  calendar.push(this.generateCalendarRowFirst());
  for (let i = 0; i < 5; i++) {
    calendar.push(
      <div className="board-row">
        {this.generateCalendarRow(i)}
      </div>
    );
  }
  return calendar;
}
  render() {
    const status = 'Calendar for month: ';
    
    return (
      <div>
        <div className="status">{status} <button onClick={this.handleClickPrev}> &lt; </button> {this.getCurrentMonthName(this.state.month)} <button onClick={this.handleClickNext}> &gt; </button></div>
        <div>
          {this.getCalendarView()}
        </div>
      </div>
    );
  }
}

export default App;
