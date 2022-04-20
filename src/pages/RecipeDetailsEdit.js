import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useFetch from "../useFetch";
import { url_recipes } from "../urls";
import classes from "./NewRecipe.module.css";


const RecipeDetailsEdit = () => {
    const { id } = useParams()

    const { data: recipeForEdit }  = useFetch(url_recipes + `${id}`)

    const [title, setTitle] = useState("");
    const [preparationTime, setPreparationTime] = useState("");
    const [directions, setDirections] = useState("");
    const [servingCount, setServingCount] = useState("");
    const [sideDish, setSideDish] = useState("");

    const [ingredient1Name, setIngredient1Name] = useState("");
    const [ingredient1Amount, setIngredient1Amount] = useState("");
    const [ingredient1AmountUnit, setIngredient1AmountUnit] = useState("");
    const [ingredient2Name, setIngredient2Name] = useState("");
    const [ingredient2Amount, setIngredient2Amount] = useState("");
    const [ingredient2AmountUnit, setIngredient2AmountUnit] = useState("");
    const [ingredient3Name, setIngredient3Name] = useState("");
    const [ingredient3Amount, setIngredient3Amount] = useState("");
    const [ingredient3AmountUnit, setIngredient3AmountUnit] = useState("");
    const [ingredient4Name, setIngredient4Name] = useState("");
    const [ingredient4Amount, setIngredient4Amount] = useState("");
    const [ingredient4AmountUnit, setIngredient4AmountUnit] = useState("");

    // using values of edited recipe as initial state, provided they exist
    useEffect(() => {
      if(recipeForEdit && recipeForEdit.title) {
       setTitle(recipeForEdit.title)};
      if(recipeForEdit && recipeForEdit.preparationTime){
       setPreparationTime(recipeForEdit.preparationTime)};
      if(recipeForEdit && recipeForEdit.directions){
       setDirections(recipeForEdit.directions)}
      if(recipeForEdit && recipeForEdit.servingCount){
        setServingCount(recipeForEdit.servingCount)}
      if(recipeForEdit && recipeForEdit.sideDish){
        setSideDish(recipeForEdit.sideDish)}
      if(recipeForEdit && recipeForEdit.ingredients[0]){
       setIngredient1Name(recipeForEdit.ingredients[0].name)
       setIngredient1Amount(recipeForEdit.ingredients[0].amount)
       setIngredient1AmountUnit(recipeForEdit.ingredients[0].amountUnit)}
      if(recipeForEdit && recipeForEdit.ingredients[1]){
       setIngredient2Name(recipeForEdit.ingredients[1].name)
       setIngredient2Amount(recipeForEdit.ingredients[1].amount)
       setIngredient2AmountUnit(recipeForEdit.ingredients[1].amountUnit)}
      if(recipeForEdit && recipeForEdit.ingredients[2]){
       setIngredient3Name(recipeForEdit.ingredients[2].name)
       setIngredient3Amount(recipeForEdit.ingredients[2].amount)
       setIngredient3AmountUnit(recipeForEdit.ingredients[2].amountUnit)}
      if(recipeForEdit && recipeForEdit.ingredients[3]){
       setIngredient4Name(recipeForEdit.ingredients[3].name)
       setIngredient4Amount(recipeForEdit.ingredients[3].amount)
       setIngredient4AmountUnit(recipeForEdit.ingredients[3].amountUnit)
      }
     }, [recipeForEdit])
  
    const navigate = useNavigate();
  
    const handleSubmit = (e) => {
            e.preventDefault();
              const recipe = {
                title: title,
                preparationTime: preparationTime,
                directions: directions,
                servingCount: servingCount,
                sideDish: sideDish,
                // problem: sending empty strings as values when ingredients are not filled in...
                ingredients: [{amountUnit: ingredient1AmountUnit, amount: ingredient1Amount, name: ingredient1Name}, 
                  {amountUnit: ingredient2AmountUnit, amount: ingredient2Amount, name: ingredient2Name}, 
                  {amountUnit: ingredient3AmountUnit, amount: ingredient3Amount, name: ingredient3Name},
                  {amountUnit: ingredient4AmountUnit, amount: ingredient4Amount, name: ingredient4Name}]
              };  
          
              fetch(url_recipes + id , {
                method: 'POST',
                headers: {
                  "Content-type": "application/json; charset=UTF-8",
                },
                body: JSON.stringify(recipe)})
                .then(response => response.json())
                .then(json => console.log('Posted!', json))
                .catch(error => console.log('Error message: ', error))
                .then(() => {navigate("/")} );
            
              }
  
    return ( recipeForEdit && <>
      <div className={classes.addnew}>
          <br />
          <br />
        <h2>Upravit recept</h2>
  
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          ></input>
          <input
          type="number" 
          placeholder="Doba přípravy (v minutách):"
            value={preparationTime}
            onChange={(e) => setPreparationTime(e.target.value)}
          ></input>
          <textarea
          rows="5"
          type="text" 
          placeholder="Postup"
            value={directions}
            onChange={(e) => setDirections(e.target.value)}
          ></textarea>
          <input
          type="number" 
          placeholder="Počet porcí"
          value={servingCount}
          onChange={(e) => setServingCount(e.target.value)}
          ></input>

          <input
          type="text"
          list ="sidedish" 
          placeholder="Příloha"
          value={sideDish}
          onChange={(e) => setSideDish(e.target.value)}
          ></input>
          <datalist id="sidedish">
        <option>brambory</option>
        <option>těstoviny</option>
        <option>pečivo</option>
        <option>rýže</option>
        <option>hranolky</option>
        </datalist>
          <div className={classes.ingredients}>
          <input
          type="text" 
          placeholder="Ingredience"
            value={ingredient1Name}
            onChange={(e) => setIngredient1Name(e.target.value)}
          ></input>
          <input
          type="number" 
          placeholder="Množství"
            value={ingredient1Amount}
            onChange={(e) => setIngredient1Amount(e.target.value)}
          ></input>
          <input
          type="text" 
          placeholder="Jednotka"
            value={ingredient1AmountUnit}
            onChange={(e) => setIngredient1AmountUnit(e.target.value)}
          ></input>
          </div>
          <div className={classes.ingredients2}>
          <input
          type="text" 
          placeholder="Ingredience"
            value={ingredient2Name}
            onChange={(e) => setIngredient2Name(e.target.value)}
          ></input>
          <input
          type="number" 
          placeholder="Množství"
            value={ingredient2Amount}
            onChange={(e) => setIngredient2Amount(e.target.value)}
          ></input>
          <input
          type="text" 
          placeholder="Jednotka"
            value={ingredient2AmountUnit}
            onChange={(e) => setIngredient2AmountUnit(e.target.value)}
          ></input>
          </div>
          <div className={classes.ingredients3}>
          <input
          type="text" 
          placeholder="Ingredience"
            value={ingredient3Name}
            onChange={(e) => setIngredient3Name(e.target.value)}
          ></input>
          <input
          type="number" 
          placeholder="Množství"
            value={ingredient3Amount}
            onChange={(e) => setIngredient3Amount(e.target.value)}
          ></input>
          <input
          type="text" 
          placeholder="Jednotka"
            value={ingredient3AmountUnit}
            onChange={(e) => setIngredient3AmountUnit(e.target.value)}
          ></input>
          </div>
          <div className={classes.ingredients4}>
          <input
          type="text" 
          placeholder="Ingredience"
            value={ingredient4Name}
            onChange={(e) => setIngredient4Name(e.target.value)}
          ></input>
          <input
          type="number" 
          placeholder="Množství"
            value={ingredient4Amount}
            onChange={(e) => setIngredient4Amount(e.target.value)}
          ></input>
          <input
          type="text" 
          placeholder="Jednotka"
            value={ingredient4AmountUnit}
            onChange={(e) => setIngredient4AmountUnit(e.target.value)}
          ></input>
          </div>
          <br/>
          <button>Upravit recept</button>
        </form>
  </div>
  </>
    );
  }
   
  export default RecipeDetailsEdit;