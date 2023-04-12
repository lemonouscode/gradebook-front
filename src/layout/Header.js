import React from 'react'
import { Link, useHistory } from 'react-router-dom';
import authService from '../services/AuthService';

function Header( {isAuthenticated, setIsAuthenticated}) {

  const history = useHistory();

  const handleLogout = async () => {
  
    await authService.logout();
    setIsAuthenticated(false);
    history.push('/login');
    

  }

  return (
    <div>
        {isAuthenticated == true ?  
        <div style={{ display:"flex", gap:"20px" }}>
          <Link to='/'>GradeBooks</Link>
          <Link to='/teachers'>All Professors</Link>
          <Link to='/my-gradebook'>My Gradebook</Link>
          <Link to='/gradebooks/create'>Add Gradebook</Link>

          <Link to='/'>
            <button onClick={()=>handleLogout()} >Logout</button>
          </Link>
          
        </div>
        
       : <div>
        <Link to='/login'>Login</Link>
        <Link to='/register'>Register</Link>

        </div>} 
    </div>
  )
}

export default Header