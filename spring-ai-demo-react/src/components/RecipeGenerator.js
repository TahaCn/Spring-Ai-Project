import React, { useState } from "react";

function RecipeGenerator() {

  const [ingredients, setIngredients] = useState("");
  const [recipe, setRecipe] = useState("");
  const [cuisine, setCuisine] = useState("any");
  const [dietaryRestrictions, setDietaryRestrictions] = useState("");

  const generateRecipe = async () => {
    try {
      const response = await fetch(`http://localhost:8081/recipe-creator?ingredients=${ingredients}&dietaryRestrictions=${dietaryRestrictions}&cuisine=${cuisine}`);
      const data = await response.text();
      console.log(data);
      setRecipe(data); 
    } catch (error) {
      console.error("Error fetching recipe response:", error);
    
    }
  };

  return(
    <div>
      <h2>Generate Recipe</h2>
      <input
        type="text"
        value={ingredients}
        onChange={(e) => setIngredients(e.target.value)}
        placeholder="Enter ingredients (comma separated)"
      />
      <input
        type="text"
        value={cuisine}
        onChange={(e) => setCuisine(e.target.value)}
        placeholder="Enter cuisine (e.g., Italian, Mexican)"
      />
      <input
        type="text"
        value={dietaryRestrictions}
        onChange={(e) => setDietaryRestrictions(e.target.value)}
        placeholder="Enter dietary restrictions (e.g., vegan, gluten-free)"
      />
      <button onClick={generateRecipe}>Generate Recipe</button>

      <div className="output">
        <pre className="recipe-text">{recipe}</pre>
      </div>
    </div>);
}

export default RecipeGenerator;