import React, { useState } from "react";
import IngredienList from "./IngredientList";
import IngredientForm from "./IngredientForm";
import Search from "./Search";

const Ingredients = () => {
  const [userIngredients, setUserIngredients] = useState([]);

  const addIngredientHandler = (ingredient) => {
    setUserIngredients((prevIngredient) => [
      ...prevIngredient,
      { id: Math.random().toString(), ...ingredient },
    ]);
  };

  const deleteIngredientHandler = (id) => {
    setUserIngredients((prevIngredient) =>
      prevIngredient.filter((ingredient) => ingredient.id !== id)
    );
  };

  return (
    <div className="App">
      <IngredientForm onAddIngredient={addIngredientHandler} />

      <section>
        <Search />
        <IngredienList
          ingredients={userIngredients}
          onRemoveItem={deleteIngredientHandler}
        />
      </section>
    </div>
  );
};

export default Ingredients;
