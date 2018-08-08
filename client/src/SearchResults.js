import React from 'react'

const SearchResults = ({data, display, handler}) => {
  console.log(data)
  return (
    <ul className={`search-results${display ? ' show' : '' }`}>
      {
        data.map(song => (
          <li 
            className='search-result' 
            key={song.id}
            onClick={() => {
              console.log('hey')
              handler(song)
            }}>
            <img src={song.album.images[2].url} alt='album cover' />
            <h4 className='song-name'>{song.name}</h4>
            <h4 className='song-artist'>{song.artists[0].name}</h4>
          </li>
        ))
      }
    </ul>
  )
}

export default SearchResults