import React,{Fragment} from 'react'
import ReactDOM from 'react-dom'

import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'

import createHistory from 'history/createBrowserHistory'

import { ConnectedRouter, routerReducer, routerMiddleware} from 'react-router-redux'

import App from './component'

import registerServiceWorker from './registerServiceWorker'

import WeatherTile from './tiles/weather'
import NoteTile    from './tiles/note'

import './index.css'

const history = createHistory()

const middleware = routerMiddleware(history)

const initialstate = (
  <Fragment>
    <WeatherTile location='enschede' appid='938e3ba16adc9854d8a321542a0d1499'/>
    <NoteTile/>
  </Fragment>
)

const store = createStore(
  combineReducers({
    tiles:function(state=initialstate,action){
      switch (action.type){
        case "create":
          return state.concat(action.tile)
        case "remove":
          return state.filter((e,i)=>i!==action.index)
        case "update":
          return state.map((e,i)=> i===action.index ? action.tile : e)
        default:
        return state;
      }
    },
    router: routerReducer
  }),
  applyMiddleware(middleware)
)

const Core = props => (
  <Provider store={store}>
     <ConnectedRouter history={history}>
        <App history={history} state={store.getState()}/>
      </ConnectedRouter>
    </Provider>
)

ReactDOM.render(<Core/>,document.getElementById('root'))

registerServiceWorker()
