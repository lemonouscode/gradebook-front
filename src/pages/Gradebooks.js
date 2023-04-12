import { useEffect,useState } from 'react';
import gradebookService from '../services/GradebookService'
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux";
import { gradebookAdded } from '../app/gradebookSlice';
import { selectAllGradebooks,getPostsStatus,fetchPosts,selectPageObject } from '../app/gradebookSlice';
import { Link } from 'react-router-dom';

function Gradebooks() {

  const dispatch = useDispatch();
 
  const [hasMore, setHasMore] = useState(true);
  const [filterGradebok,setFilterGradebook] = useState('');

  const gradebooks = useSelector(selectAllGradebooks);
  const postStatus = useSelector(getPostsStatus);
  const pageObject = useSelector(selectPageObject);
 


  const [isShown, setIsShown] = useState(false);


  const filteredGradebooks = gradebooks.filter((gradebook) =>
      gradebook.name.toLowerCase().includes(filterGradebok.toLowerCase())
  );

  // console.log(filteredGradebooks)

  const handleClick = event => {

    setIsShown(true);

  };

  const handleFilterButton = (e)=>{

    setFilterGradebook(e.target.value)
    if(e.target.value.length == 0){
      setIsShown(false);
    }

  }

  useEffect(() => {
      if (postStatus === 'idle') {
          dispatch(fetchPosts())
      }
      // console.log(gradebooks)


  }, [postStatus, dispatch])


  const loadMore = () => {
    
    let currentPage = pageObject.current_page;
    let lastPage = pageObject.last_page

    if(currentPage == lastPage){
      //DIsable button here
      setHasMore(false)
    }
    else{
      currentPage++;
      dispatch(fetchPosts(currentPage))
    }
    
  };

  

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
      {gradebooks.length > 0 ? (
        <>
          {isShown == false ? gradebooks.map((gradebook) => (
            <div key={gradebook.id}>
              <h3>
                Naziv Dnevnika:{" "}
                <Link to={`/gradebooks/${gradebook.id}`}>{gradebook.name}</Link>
              </h3>
              <h4>
                Ime i Prezime Razrednog Starešine:{" "}
                {gradebook.user ? (
                  <Link to={`/teachers/${gradebook.user.id}`}>
                    {gradebook.user.first_name} {gradebook.user.last_name}
                  </Link>
                ) : (
                  "Nema Razrednog Starešine"
                )}
              </h4>
              <p>Vreme Kreiranja: {gradebook.created_at}</p>
              <hr /><br />
            </div>
          ))
          : (
            <div>
              {isShown && filteredGradebooks.map((gradebook) => (
                <div key={gradebook.id}>
                <h3>
                  Naziv Dnevnika:{" "}
                  <Link to={`/gradebooks/${gradebook.id}`}>{gradebook.name}</Link>
                </h3>
                <h4>
                  Ime i Prezime Razrednog Starešine:{" "}
                  {gradebook.user ? (
                    <Link to={`/teachers/${gradebook.user.id}`}>
                      {gradebook.user.first_name} {gradebook.user.last_name}
                    </Link>
                  ) : (
                    "Nema Razrednog Starešine"
                  )}
                </h4>
                <p>Vreme Kreiranja: {gradebook.created_at}</p>
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

export default Gradebooks