import React, { useState, useCallback } from "react";
import IngredienList from "./IngredientList";
import IngredientForm from "./IngredientForm";
import Search from "./Search";

const Ingredients = () => {
  const [userIngredients, setUserIngredients] = useState([]);
  const [isloading, setIsLoading] = useState(false);

  const addIngredientHandler = (ingredient) => {
    setIsLoading(true);
    fetch("https://react-hooks-eb9cc.firebaseio.com/ingredients.json", {
      method: "POST",
      body: JSON.stringify(ingredient),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        setIsLoading(false);
        return response.json();
      })
      .then((responseData) => {
        setUserIngredients((prevIngredient) => [
          ...prevIngredient,
          { id: responseData.name, ...ingredient },
        ]);
      });
  };

  const deleteIngredientHandler = (id) => {
    setIsLoading(true);
    fetch(`https://react-hooks-eb9cc.firebaseio.com/ingredients/${id}.json`, {
      method: "DELETE",
    }).then((response) => {
      setIsLoading(false);
      setUserIngredients((prevIngredient) =>
        prevIngredient.filter((ingredient) => ingredient.id !== id)
      );
    });
  };

  const filteredIngredientsHandler = useCallback((filteredIngredients) => {
    setUserIngredients(filteredIngredients);
  }, []);

  return (
    <div className="App">
      <IngredientForm
        onAddIngredient={addIngredientHandler}
        isLoading={isloading}
      />

      <section>
        <Search onLoadIngredients={filteredIngredientsHandler} />

        <IngredienList
          ingredients={userIngredients}
          onRemoveItem={deleteIngredientHandler}
        />
      </section>
    </div>
  );
};

export default Ingredients;
