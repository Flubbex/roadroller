import React from 'react'
import {Tile} from '../component/tileset';

import './note.css'

class NoteTile extends Tile {
  create(props){
    return {
      title: props.title||"New Note",
      content: props.content||<p className="note">
        <textarea></textarea>
        </p>
    }
  }
}
export default NoteTile
