import React, { Component } from 'react'

class Tile extends Component {
  constructor(props){
    super(props)
    this.state = this.create ? this.create(props) : {
      title:   props && props.title ? props.title : "Untitled Tile",
      content: props && props.content
                ? props.content.map
                ? props.content.map((paragraph)=><p>paragraph</p>)
                : props.content
              : "Something went wrong while loading this tile"
    }
  }

  render() {
      return (
      <div className="tile is-child notification box">
        <h1 className="title">{this.state.title}</h1>
        <div className="content">
          {this.state.content}
        </div>
      </div>
    )
  }

}

const empty_tileset = (
  <section className="section">
    <p>No tiles loaded! Go add some (!help tiles)</p>
  </section>
)
class Tileset extends Component {
  constructor(props){
    super(props)
    this.state = {
      filter: props.filter || "",
      tiles: props.tiles   || empty_tileset
    }
  }
  render(){
    return (
      <div className="tile is-ancestor">
        <div className="tile is-parent">
          { this.state.tiles }
        </div>
      </div>
    )
  }
}

export default Tileset
export {Tile}
