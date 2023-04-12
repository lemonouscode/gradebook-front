import React, { useState } from 'react'
import studentService from '../services/StudentService';
import { useParams,useHistory } from 'react-router-dom';


function AddNewStudents() {

    const history = useHistory();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [imgUrl, setImgUrl] = useState('');
    const { id } = useParams();

    const [invalidCredentials, setInvalidCredentials] = useState(false);
    const [errMessage, setErrMessage] = useState('');

    const handleAddNewStudnent = ()=>{
      
      
      // console.log(id)

      const fetchData = async () => {
        
        try {
          const result = await studentService.addStudent({"first_name":firstName, "last_name":lastName,"img_url":imgUrl,"gradebook_id":id});
          // console.log(result);
          history.push("/my-gradebook");
        } catch (err) {
          setInvalidCredentials(true);
          
          console.log(err.response.data.message)
          setErrMessage(err.response.data.message);
        }
        
      };
  
      fetchData();

    }

  return (
    <div>
        <h1>ADD NEW STUDENTS</h1>
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
    </div>
  )
}

export default AddNewStudents