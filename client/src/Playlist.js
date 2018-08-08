import React from 'react'

const Playlist = ({data, handler}) => (
  <section className='playlist-outer'>
    <h1>Your Playlist</h1>
    <ul className='playlist'>
      {
        data.map(item => (
          <li key={item.song.id} 
            className='new-song'
            onClick={() => handler(item.song.id)} >
            <h3 className='playlist-song-name'>
              {item.song.name}
            </h3>
            <h3 className='playlist-song-artist'>
              {item.song.artists[0].name}
            </h3>
          </li>
        ))
      }
    </ul>
  </section>
)

export default Playlist