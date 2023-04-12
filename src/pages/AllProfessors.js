import React from 'react'
import { useEffect,useState } from 'react'
import { selectAllGradebooks,getPostsStatuss,fetchTeachers,selectPageObject } from '../app/teacherSlice';
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux";
import { Link } from 'react-router-dom';

function AllProfessors() {

  const dispatch = useDispatch();

  const allTeachers = useSelector(selectAllGradebooks);

  const postStatus = useSelector(getPostsStatuss);
  const pageObject = useSelector(selectPageObject);

  const [isShown, setIsShown] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [filterGradebok,setFilterGradebook] = useState('');

  const filteredGradebooks = allTeachers.filter((gradebook) =>
      gradebook.first_name.toLowerCase().includes(filterGradebok.toLowerCase())
  );

  const handleClick = event => {

    setIsShown(true);

  };

  const handleFilterButton = (e)=>{

    setFilterGradebook(e.target.value)
    if(e.target.value.length == 0){
      setIsShown(false);
    }

  }

  const loadMore = () => {
    
    let currentPage = pageObject.current_page;
    let lastPage = pageObject.last_page

    if(currentPage == lastPage){
      //DIsable button here
      setHasMore(false)
    }
    else{
      currentPage++;
      dispatch(fetchTeachers(currentPage))
    }
    
  };

  useEffect(() => {
    if (postStatus === 'idle') {
        dispatch(fetchTeachers())
    }

    // console.log(allTeachers)


}, [postStatus, dispatch])



return (
  <div>
    <h1>Gradebooks:</h1>
    <div>
      <label htmlFor="filterData">Filter</label>
        <input 
          type="text"
          id='filterData'
          value={filterGradebok}
          onChange={(e)=>handleFilterButton(e)}
        />
        <button onClick={handleClick} >Filter</button>
    </div>
    {allTeachers.length > 0 ? (
      <>
        {isShown == false ? allTeachers.map((gradebook) => (
          <div key={gradebook.id}>
            <img style={ {width:'200px'} } src={gradebook.image_url ? gradebook.image_url : 'Image not found'} alt="image not found" />
            <Link to={`/teachers/${gradebook.id}`}>
              <h3>Profesor: {gradebook.first_name} {gradebook.last_name}</h3>
            </Link>
            <h4>Naziv Dnevnika: {gradebook.gradebooks ? gradebook.gradebooks.name : 'Professor Available'}</h4>
            <hr /><br />
          </div>
        ))
        : (
          <div>
            {isShown && filteredGradebooks.map((gradebook) => (
              <div key={gradebook.id}>
                <img style={ {width:'200px'} } src={gradebook.image_url ? gradebook.image_url : 'Image not found'} alt="image not found" />
            <Link to={`/teachers/${gradebook.id}`}>
              <h3>Profesor: {gradebook.first_name} {gradebook.last_name}</h3>
            </Link>
            <h4>Naziv Dnevnika: {gradebook.gradebooks ? gradebook.gradebooks.name : 'Professor Available'}</h4>
            <hr /><br />
              </div>
            ))}
          </div>
        )
        }
        {hasMore && (
          <button onClick={loadMore}>Load More</button>
        )}
      </>
    ) : (
      <p>Nije Kreiran Nijedan Dnevnik.</p>
    )}
  </div>
);

}




export default AllProfessors