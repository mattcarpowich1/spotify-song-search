import React, { Component } from 'react'
import Nav from './Nav.js'
import SearchResults from './SearchResults.js'
import Playlist from './Playlist.js'
import { post } from 'axios'

class App extends Component {

  constructor () {
    super()
    this.state = {
      search: '',
      results: [],
      playlist: [],
      show: false
    }

    this.handleChange = this.handleChange.bind(this)
    this.addSong = this.addSong.bind(this)
    this.upVoteSong = this.upVoteSong.bind(this)
  }

  componentDidMount () {
    let { search } = this.state
    const checker = setInterval(() => {
      const currentSearch = this.state.search
      if (currentSearch !== '') {
        if (currentSearch !== search) {
          post('http://localhost:3001/api/search', {
            value: currentSearch
          })
          .then(res => {
            search = currentSearch
            this.setState({
              show: true,
              results: res.data.tracks.items
            })
          })
          .catch(err => console.log(err))
        } 
      } else {
        this.setState({
          show: false
        })
      }
    }, 400)
  }

  handleChange (e) {
    const { value } = e.target
    const { results } = this.state
    this.setState({
      search: value
    })
  }

  addSong (song) {
    const { playlist } = this.state
    this.setState({
      playlist: [...playlist, {
        song,
        votes: 1
      }],
      show: false,
      search: ''
    })
  }

  upVoteSong (id) {
    const { playlist } = this.state
    this.setState({
      playlist: playlist
        .map(item => {
          if (item.song.id === id) {
            return {
              ...item,
              votes: item.votes + 1
            }
          } else {
            return item
          }
        })
        .sort((a, b) => {
          return b.votes - a.votes
        })
    })
  }

  render () {
    return (
      <div className='App'>
        <Nav 
          handler={this.handleChange}
          value={this.state.search} />
        <SearchResults
          display={this.state.search !== ''}
          handler={song => this.addSong(song)} 
          data={this.state.results} />
        <main>
          <Playlist 
            data={this.state.playlist} 
            handler={this.upVoteSong} />
        </main>
      </div>
    )
  }
}

export default App
