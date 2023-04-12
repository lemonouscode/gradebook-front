import { Switch } from 'react-router-dom'
import  Default  from './layout/Default'
import Login from './pages/Login'
import Register from './pages/Register'
import Gradebooks from './pages/Gradebooks'
import AddGradebook from './pages/AddGradebook'
import AllProfessors from './pages/AllProfessors'
import MyGradebook from './pages/MyGradebook'
import PrivateRoute from './components/PrivateRoute'
import PublicRoute from './components/PublicRoute'
import { useState } from 'react'
import SingleProfessor from './pages/SingleProfessor'
import AddNewStudents from './pages/AddNewStudents'
import SingleGradebook from './pages/SingleGradebook'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token")
  );

  return (
    <div>

      <Default isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated}>
        <Switch>

        //LOGIN  
        <PublicRoute exact path="/login">
            <Login
              onLogin={() => {
                setIsAuthenticated(true);
              }}
            />
          </PublicRoute>

        //REGISTER
          <PublicRoute exact path="/register">
            <Register
              onRegister={() => {
                setIsAuthenticated(true);
              }}
            />
          </PublicRoute>

          <PrivateRoute exact path='/' component={Gradebooks}/>
          <PrivateRoute path='/gradebooks/create' component={AddGradebook}/>
          <PrivateRoute exact path='/teachers' component={AllProfessors}/>
          <PrivateRoute path='/my-gradebook' component={MyGradebook}/>
          
          <PrivateRoute exact path="/teachers/:id">
            <SingleProfessor />
          </PrivateRoute>


          <PrivateRoute exact path="/gradebooks/:id/students/create">
            <AddNewStudents />
          </PrivateRoute>

          <PrivateRoute path="/gradebooks/:id/">
            <SingleGradebook />
          </PrivateRoute>


        </Switch>
      </Default>
    </div>
  );
}

export default App;

