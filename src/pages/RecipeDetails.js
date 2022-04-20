import React from 'react';
import { useNavigate, useParams, Link } from "react-router-dom";
import useFetch from '../useFetch';
import { url_recipes } from '../urls';
import classes from "./RecipeDetails.module.css";


const RecipeDetails = () =>{
  const { id } = useParams()
  const { data: recipe, error, isPending }  = useFetch(url_recipes + `/${id}`)
  const navigate = useNavigate()


  // parsing recipe directions based on capital letters and returning a list of individual lines...
  // problematic because data are sometimes capitalized sometimes not, sometimes include wrong numbering
  // but difficult to remove wrong numbering because data includes also valid number of minutes etc. 
  const directions_stripped = recipe && recipe.directions && (recipe.directions).split(/(?=[A-Z])/)
  let directions_html = []
  for (let i = 1; directions_stripped && i < directions_stripped.length; i++) {
    directions_html.push(<li>{directions_stripped[i]}</li>)
  }


  function handleDelete() {
      fetch(url_recipes + id, 
         {method: 'DELETE'})
      .then(response => response.text())
      .then(json => console.log("Deleted!", json))
      .catch(error => console.log('Error message: ', error))
      .then(() => {navigate("/")} );
  }

  
return (
  <>
  {error && <div className={classes.error}><h1 >Stala se chyba...</h1>
            <br />
            <Link to="/" >Zpět na Recepty</Link></div>}
  {isPending && <div><h1>Čekejte prosím...</h1></div>}

  {recipe &&
  <div className={classes.details}>
        <div className="card bg-light mb-3">
        <div className="card-header text-uppercase">{recipe.title}</div>
        <div className="card-body">
        <p className="card-text">Postup:</p>
        <ul className="card-text">{directions_html}</ul>
        <hr/>
        {recipe.sideDish && <p className="card-text">Příloha: {recipe.sideDish}</p>}
        {recipe.servingCount && <p className="card-text">Počet porcí: {recipe.servingCount}</p>}
        <p className="card-text">Doba přípravy: {recipe.preparationTime} minut</p>
        <hr />
        <p className="card-text">Naposledy upraveno: {recipe.lastModifiedDate.substring(0,10)}</p>
        </div>
        </div>
       
      
        {recipe.ingredients[0] && recipe.ingredients.map(ingredient => 
        <div className="card bg-light mb-3">
        <div className="card-body">
        <p className="card-text">{ingredient.name} {ingredient.amount} {ingredient.amountUnit}</p>
        </div>
        </div>
        )}
        
        <Link to={{pathname: `/recipes/edit/${recipe._id}`}}><button className={classes.button1}>Upravit recept</button></Link>
        <button className={classes.button2} data-toggle="modal" data-target="#myModal">Smazat recept</button>
    </div>
 }

{/* modal window for delete button */}
<div className={classes.details}>
<div class="modal fade" id="myModal" role="dialog" aria-labelledby="myModalLabel">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-body">
        Opravdu smazat tento recept?
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">Zpět</button>
        <button type="button" class="btn btn-primary" data-dismiss="modal" onClick={handleDelete}>Smazat</button>
      </div>
    </div>
  </div>
</div>
</div>

  </>)}


export default RecipeDetails;
