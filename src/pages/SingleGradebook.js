import React from 'react'
import { useEffect,useState } from 'react'
import gradebookService from '../services/GradebookService';
import studentService from '../services/StudentService';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

function SingleGradebook() {

    const [data, setData] = useState([]);
    const { id } = useParams();
    const history = useHistory();

    const [reRender, setReRender] = useState(false);
    
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [imgUrl, setImgUrl] = useState('');

    const [invalidCredentials, setInvalidCredentials] = useState(false);
    const [errMessage, setErrMessage] = useState('');

    const loggedUser = localStorage.getItem("userId");


    const fetchGbData = async () => {
        if(data.length == 0){
          try {
            const result = await gradebookService.getSingleGradebook(id);
            setData(result);
          } catch (error) {
            
          }
        }
        
      };


    console.log(loggedUser)

    useEffect(() => {
      

  
      console.log(data)
  
      fetchGbData();
    }, [data,reRender]);
  
    
    

    const handleAddNewStudnent = ()=>{
      
      
      // console.log(id)

      const fetchData = async () => {
        
        try {

          const result = await studentService.addStudent({"first_name":firstName, "last_name":lastName,"img_url":imgUrl,"gradebook_id":id});
          console.log(result);

          setReRender(prevState => !prevState);

          history.push("/my-gradebook");
        } catch (err) {
          setInvalidCredentials(true);

          console.log(err.response.data.message)
          setErrMessage(err.response.data.message);
        }
        
      };
  
      fetchData();
      fetchGbData();

    }



    const handleDeleteGradebook = ()=>{
      gradebookService.delete(id);
    }


  
    return (
      <div>
        
        
        {data.name ? (
          <div>
            <h3>Ime Dnevnika: {data.name}</h3>
          </div>
  
          
        ) : (
          <div>Nema Dnevnika</div>
        )}
  
        {data.name ? (
          <h3>Ime Razrednog Staresine: {data.user.first_name} {data.user.last_name}</h3>
        ) : (
          <div>Loading...</div>
        )}
  
        {data.name ? (
          <div>
            <h3>Lista Ucenika:</h3>
      
            {data.students.length > 0 ? (
              <ul>
                {data.students.map((student) => (
                  <li key={student.id}>{student.first_name} {student.last_name}</li>
                ))}
              </ul>
            ) : (
              <div>Nema ucenika.</div>
            )}
        </div>
        ) : (
          <div>Loading...</div>
        )}

        
        {data && data.user && data.user.id == loggedUser && (
            
          <div>

            <form action="">

            <label htmlFor="fname">First Name:</label>
            <input 
              type="text" 
              id='fname'
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <br />

            <label htmlFor="lname">Last Name:</label>
            <input 
              type="text" 
              id='lname'
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />    
            <br />

            <label htmlFor="iurl">Image Url:</label>
            <input 
              type="text" 
              id='iurl'
              value={imgUrl}
              onChange={(e) => setImgUrl(e.target.value)}
            />   
            <br />

            {invalidCredentials && (
              <p style={{ color: "red" }}>{errMessage}</p>
            )}

            <button type='button' onClick={handleAddNewStudnent}>Add New Student</button>

            

        </form>

        <br />
        <button onClick={handleDeleteGradebook} >Delete Gradebook</button>

        </div>

        )}

        <br />

      </div>
    );
}

export default SingleGradebook