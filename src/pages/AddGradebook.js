import React from 'react'
import { useEffect,useState } from 'react'
import { selectTeachersWithoutGradebook,getTeacherStatus,fetchTeachersWithoutGradebook } from '../app/teacherSlice';
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux";
import { Link,useHistory } from 'react-router-dom';
import { selectAllGradebooks,getPostsStatus,fetchPosts,selectPageObject,fetchAddGradebook } from '../app/gradebookSlice';


function AddGradebook() {

  const dispatch = useDispatch();

  const allTeachers = useSelector(selectTeachersWithoutGradebook);
  const [gradebookName, setGradebookName] = useState('');
  const [selectedTeacher, setSelectedTeacher] = useState('');

  const history = useHistory();

  const postStatus = useSelector(getTeacherStatus);

  const gradebookStatus = useSelector(getPostsStatus);


  useEffect(() => {
    if (postStatus === 'idle') {
        dispatch(fetchTeachersWithoutGradebook())
    }

  }, [postStatus, dispatch,gradebookStatus])


  

  const handleTeacherChange = (e)=>{
    setSelectedTeacher(e.target.value)
  }

  const handleCreateGradebook = ()=>{
      dispatch(fetchAddGradebook({name:gradebookName, user_id:selectedTeacher}))
      history.push("/");
  }


  return (
    <div>
      <br />
      <form action="">
        <label htmlFor="naziv">Naziv:</label>
        <input 
          type="text" 
          id='naziv'
          value={gradebookName}
          onChange={(e) => setGradebookName(e.target.value)}
        />
        <br />
        {allTeachers.length > 0 ? (
          <select id="teacher" value={selectedTeacher} onChange={(e)=> handleTeacherChange(e)} >
            <option value="">Select a teacher</option>
            {allTeachers.map((teacher) => (
              <option key={teacher.id} value={teacher.id}>{teacher.first_name} {teacher.last_name}</option>
            ))}
          </select>
        ) : (
          <p>No teachers found</p>
        )}
        <br /><br />
        <button onClick={handleCreateGradebook} type='button'>Submit</button>
        
        <Link to="/">
          <button>Cancel</button>
        </Link>

      </form>
      <br />
    </div>
  )
}

export default AddGradebook