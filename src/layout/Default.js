import React from 'react'
import Header from './Header'
import Footer from './Footer'

function Default( { children , isAuthenticated, setIsAuthenticated } ) {
  return (
    <div>
        <h1>Grradebooks</h1>
        <Header isAuthenticated= {isAuthenticated} setIsAuthenticated={setIsAuthenticated}/>
        { children }
        <Footer/>
    </div>
  )
}

export default Default