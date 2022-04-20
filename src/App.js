import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/layout/Layout';
import NewRecipe from './pages/NewRecipe';
import RecipeDetails from './pages/RecipeDetails';
import NotFound from './pages/NotFound';
import RecipeList from './components/RecipeList';
import RecipeDetailsEdit from './pages/RecipeDetailsEdit';

const App = () => {

  return ( 
    <div>
    <Layout> 
      <Routes>
      <Route path="/" element={<RecipeList />} />
        <Route path="/recipes/:id" element={<RecipeDetails />}/>  
        <Route path="/recipes/edit/:id" element={<RecipeDetailsEdit />}/>
        <Route path="/new-recipe" element={<NewRecipe />}/>
        <Route path="*" element={<NotFound />}/>
      </Routes>
    </Layout>
   </div>);
}

export default App;
