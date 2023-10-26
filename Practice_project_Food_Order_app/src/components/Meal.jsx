import React, { useContext } from 'react';

import Button from './UI/Button';
import { URL } from '../api/meal-api';
import { currencyFormatter } from '../../../Working-forms-inputs/src/utils/formatter';
import CartContext from '../store/CartContext';

const Meal = ({ meal }) => {
  const context = useContext(CartContext);
  function handleAddMealToCart() {
    context.addItem(meal);
  }
  return (
    <li className="meal-item">
      <article>
        <img src={`${URL}/${meal.image}`} alt={meal.name} />

        <section>
          <h3>{meal.name}</h3>
          <p className="meal-item-price">
            {currencyFormatter.format(meal.price)}
          </p>
          <p className="meal-item-description">{meal.description}</p>
        </section>
        <div className="meal-item-actions">
          <Button onClick={handleAddMealToCart}>Add to Cart</Button>
        </div>
      </article>
    </li>
  );
};

export default Meal;
