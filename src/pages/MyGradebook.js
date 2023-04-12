import React from 'react'
import { useEffect,useState } from 'react'
import gradebookService from '../services/GradebookService';
import { Link } from 'react-router-dom';


function MyGradebook() {


  const [data, setData] = useState([]);
  const [btnLink, setBtnLink] = useState('');

  

  useEffect(() => {
    
    const fetchData = async () => {
      if(data.length == 0){
        try {
          const result = await gradebookService.getGradebooksAndTeacher();
          setData(result);
          // console.log(result)
          setBtnLink(`gradebooks/${result.gradebooks.id}/students/create`);
        } catch (error) {
          
        }
      }
      
    };

    // console.log(data)

    fetchData();
  }, [data]);

  // (‘/gradebooks/:id/students/create’)

  return (
    <div>
      <br />
      <Link to={btnLink} >
            <button>Add New Students</button>
          </Link>
      {data.gradebooks ? (
        <div>
          <h3>Ime Dnevnika: {data.gradebooks.name}</h3>
        </div>

        
      ) : (
        <div>Loading...</div>
      )}

      {data.gradebooks ? (
        <h3>Ime Razrednog Staresine: {data.first_name} {data.last_name}</h3>
      ) : (
        <div>Loading...</div>
      )}

      {data.gradebooks ? (
        <div>
          <h3>Lista Ucenika:</h3>
    
          {data.gradebooks.students.length > 0 ? (
            <ul>
              {data.gradebooks.students.map((student) => (
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

    </div>
  );


}

export default MyGradebook