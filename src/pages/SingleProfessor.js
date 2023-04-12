import React from 'react'
import { useEffect,useState } from 'react'
import { getSingleTeacher,fetchSingleTeacher } from '../app/teacherSlice';
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux";
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

function SingleProfessor() {

  const dispatch = useDispatch();

  const singleTeacher = useSelector(getSingleTeacher);
  let currId = singleTeacher.id


  const { id } = useParams();

  console.log(singleTeacher)


  useEffect(() => {

    if(currId != id){
        dispatch(fetchSingleTeacher(id))
        console.log(singleTeacher)
    }

    }, [dispatch, id])

    return (
        <div>
          {singleTeacher && singleTeacher ? (
            <div>
              {singleTeacher && singleTeacher.gradebooks && singleTeacher.gradebooks.name ? (
                <Link to={`/gradebooks/${singleTeacher.gradebooks.id}`}>
                    <h3>Ime Dnevnika: {singleTeacher.gradebooks.name}</h3>
                </Link>
              ) : (
                <h3>Nema Dnevnika</h3>
              )}

              {singleTeacher && singleTeacher.first_name && singleTeacher.first_name &&
                <h3>
                    Professor: {singleTeacher.first_name} {singleTeacher.last_name}
                </h3>
              }

              {singleTeacher && singleTeacher.gradebooks && singleTeacher.gradebooks.students ? (
                <h3>Broj Ucenika: {singleTeacher.gradebooks.students.length}</h3>
              ) : (
                <h3>Nema Ucenika</h3>
              )}

            </div>
          ) : (
            <div>No data to display.</div>
          )}
        </div>
      );
}

export default SingleProfessor