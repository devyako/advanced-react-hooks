import React, { useState, useCallback } from "react";
import IngredienList from "./IngredientList";
import IngredientForm from "./IngredientForm";
import ErrorModal from "../UI/ErrorModal";
import Search from "./Search";

const Ingredients = () => {
  const [userIngredients, setUserIngredients] = useState([]);
  const [isloading, setIsLoading] = useState(false);
  const [error, setError] = useState();

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
    })
      .then((response) => {
        setIsLoading(false);
        setUserIngredients((prevIngredient) =>
          prevIngredient.filter((ingredient) => ingredient.id !== id)
        );
      })
      .catch((error) => {
        setError("Something went wrong!");
      });
  };

  const filteredIngredientsHandler = useCallback((filteredIngredients) => {
    setUserIngredients(filteredIngredients);
  }, []);

  const clearError = () => {
    setError(null);
    setIsLoading(false);
  };

  return (
    <div className="App">
      {error && <ErrorModal onClose={clearError}>{error}</ErrorModal>}
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
