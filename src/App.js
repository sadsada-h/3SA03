import React from 'react';
import Event from './Event';
import Check from './Check';
import './App.css';
import _ from 'lodash';
import logo from './logo.jpg'

let message = 'World'
const prepareStateFromWord = (given_word) => {
  let word = given_word.toUpperCase()
  let chars = _.shuffle(Array.from(word))
  return {
    word,
    chars,
    counter: 1,
    guess: [],
    completed: false,
    check: 0
  }
}
class App extends React.Component {
  state = {
    show: false,
    give_up: false
  }
  state = prepareStateFromWord(message);
  click = (value) => {
    let guess = [...this.state.guess, value]
    this.setState({ guess })
    if (guess.length === this.state.chars.length) {
      if (guess.join('').toString() === this.state.word) {
        this.setState({ guess: [], completed: true })
      } else {
        this.setState({ guess: [], counter: this.state.counter + 1 })
      }
    }
  }
  show_name = () => {
    this.setState({
      show: !this.state.show
    })
    console.log(this.state.show)
  }

  reset = () => {
    this.setState({ check: this.state.check + 1, completed: false })
  }
  give_up = () => {
    this.setState({
      give_up: !this.state.give_up
    })
  }
  render() {
    let check = this.state.completed === false ? '' : <button className="button" onClick={this.reset}><h1>Play Again</h1></button>;
    let ans = this.state.completed === false ? '' : <h3 className="ans">This word is {message}</h3>;
    let checks = this.state.completed === false ? '' : <h1 className="win">You Win</h1>;

    return (
      <div>
        <div className="first">
          <div className="second">
            <div className="logo-area"><img className="logo" src={logo}></img></div>
            <div className="center-box">
              <div className="center-text">
                <div className="text1"><h1 className="text">Sadsada Handloon : 6035512059</h1></div>
              </div>
            </div>
            <div>
              {
                Array.from(this.state.chars).map((x, y) => (
                  <Event
                    value={x}
                    key={y}
                    click={this.click}
                    number={this.state.counter}
                    check={this.state.check}
                  />))
              }
              <div className="box">
                <h1 className="text">Let's play 10 Round</h1>
                {
                  Array.from(this.state.guess).map((x, y) => (
                    <Event
                      value={x}
                      key={y}
                      click={this.click}
                    />
                  ))
                }
                <div>
                  <Check check_count={this.state.counter} />
                </div>
                <div className="button-area">
                  {check}
                  {ans}
                  {checks}
                </div>
              </div>
            </div>
            <div className="center-text">
              <button className="button-show" onClick={this.give_up}>Hint</button>
              <h3>{this.state.give_up === true ? 'ลูกโลกอ่ะ ลูกโลก' : ''}</h3>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default App;