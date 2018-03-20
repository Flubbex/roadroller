import React, { Component } from 'react'

import {Route} from 'react-router'

import Hero             from '../hero'
import Tileset          from '../tileset'

import './bulma.css';

const Navbar =(props )=>(
  <nav className="breadcrumb is-centered is-marginless" aria-label="breadcrumbs">
      <ul>
        <li className={props.path==='/'?"is-active":""}><a href="/" aria-current="page">Home</a></li>
        <li className={props.path==='/new'?"is-active":""}><a href="/edit">Edit</a></li>
        <li className={props.path==='/remove'?"is-active":""}><a href="/new">New</a></li>
      </ul>
  </nav>
)

const renderMergedProps = (component, ...rest) => {
  const finalProps = Object.assign({}, ...rest);
  return (
    React.createElement(component, finalProps)
  );
}

const PropsRoute = ({ component, ...rest }) => {
  return (
    <Route {...rest} render={routeProps => {
      return renderMergedProps(component, routeProps, rest);
    }}/>
  );
}

class App extends Component {
  constructor(props)
  {
    super(props)
    this.state = {
      tiles: props.state.tiles,
      search: props.history.location.pathname.slice(1)
    }

  }
  render() {
    return (
      <div className="App">
        <Hero search={this.state.search} tiles={this.state.tiles}/>
        <Navbar path={this.props.history.location.pathname}/>
        <section className="section is-paddingless">
        <PropsRoute exact path="/" component={Tileset}
            tiles={this.state.tiles}
            filter={this.state.search}/>

        </section>

      </div>
    );
  }
}

export default App;
