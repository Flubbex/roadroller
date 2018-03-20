import React,{Component} from 'react'
import Awesomplete from 'awesomplete'
import moment from 'moment'

import './searchbar.css';

class Clock extends Component {
    componentDidMount() {
      this.interval = window.setInterval(
        ()=>this.forceUpdate()
      ,60000)
    }
    shouldComponentUpdate(nextProps, nextState)
    {
      return false
    }
    componentWillUnmount() {
      window.clearInterval(this.interval)
    }

    render() {
        return (
          <div>
          <h1 className="title">
            {moment().format('h:mm a')}
          </h1>
          <h1 className="subtitle">
            {moment().format('MMMM Do YYYY')}
          </h1>
        </div>
      )
    }
}

class Hero extends Component {
  constructor(props){
    super(props)
    this.state = {
      value:props.search || "",
    }
  }

  componentDidMount() {
    new Awesomplete(document.getElementById('search'),{
      minChars: 1,
	    maxItems: 15,
      list: []
    });
  }

  render() {
    return (
    <section className="hero is-primary">
      <div className="hero-body">
        <Clock/>
      </div>

    <div className="hero-footer">
      <nav className="level">
        <input
          id="search"
          value={this.state.value}
          onChange={(e) => this.setState({value:e.target.value}) }
          placeholder="Search"
          className="level-item"
          />
      </nav>

    </div>

    </section>
    )
  }

}

export default Hero
