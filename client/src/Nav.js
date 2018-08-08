import React from 'react'

const Nav = ({handler, value}) => (
  <nav>
    <div className='search'>
      <span className='fa fa-search'></span>
      <input type='text'
        value={value} 
        onChange={handler} />
    </div>
  </nav>
)

export default Nav