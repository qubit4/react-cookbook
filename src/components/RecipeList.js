import { useState } from "react"; 
import { Link } from "react-router-dom";
import useFetch from "../useFetch";
import { url_recipes } from "../urls";
import classes from "./RecipeList.module.css";


const RecipeList = () =>{

  const { data: recipes, error, isPending  } = useFetch(url_recipes);
  const [searchText, setSearchText] = useState('');

  const normal = (string) => {
      return string.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();};

        
  return (
      <>
      {error && <div className={classes.error}><h1>Stala se chyba...</h1>
            <br />
            <Link to="/" >Zpět na Recepty</Link></div>}
      {isPending && <div className={classes.center}><h1>Čekejte prosím...</h1> </div>}  

      <div className={classes.home}>
      <input
          type="text"
          value={searchText}
          bg="white"
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Hledat recept"
          size={10}/>

      <div className="card-column">
      {recipes && recipes.filter((recipe) =>normal(recipe.title).includes(normal(searchText)),)
            .sort((a, b) => a.preparationTime - b.preparationTime).map(recipe => (
            <div>
            <div className={classes.card}>
            <div className="card w-80 mb-2 text-center">
            <div className="card-header">{recipe.title}</div>
            <div className="card-body">
            <p className="card-text">Doba přípravy: {recipe.preparationTime} minut</p>
            <Link to={`recipes/${recipe._id}`} ><div className="row justify-content-center"><button type="button" class="btn btn-light">Celý recept</button></div></Link>
            </div>
            </div>
            </div>
        </div>))}
        </div>
        </div>
        </>
    )
}

export default RecipeList;
