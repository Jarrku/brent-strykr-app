import { Meal, MealComponent } from '@/model/types';

export function round(number: number) {
  return Math.round(number * 100) / 100;
}

export function getNutrientValue({ amount, ingredient }: MealComponent) {
  if (!ingredient) throw new Error('shouldnt happen');

  const multiplier = amount / ingredient.baseAmount;

  return {
    carbohydrates: round(ingredient.carbohydrates * multiplier),
    fat: round(ingredient.fat * multiplier),
    kcal: round(ingredient.kcal * multiplier),
    protein: round(ingredient.protein * multiplier),
  };
}

export function getMealTotals(components: MealComponent[]) {
  return components.reduce(
    (acc, component) => {
      const { carbohydrates, fat, kcal, protein } = getNutrientValue(component);

      acc.carbohydrates = round(acc.carbohydrates + carbohydrates);
      acc.fat = round(acc.fat + fat);
      acc.kcal = round(acc.kcal + kcal);
      acc.protein = round(acc.protein + protein);
      return acc;
    },
    {
      carbohydrates: 0,
      fat: 0,
      kcal: 0,
      protein: 0,
    },
  );
}

export function getMenuTotal(meals: Meal[]) {
  return meals
    .map((meal) => getMealTotals(meal.components))
    .reduce(
      (acc, total) => {
        acc.carbohydrates = round(acc.carbohydrates + total.carbohydrates);
        acc.fat = round(acc.fat + total.fat);
        acc.kcal = round(acc.kcal + total.kcal);
        acc.protein = round(acc.protein + total.protein);

        return acc;
      },
      { carbohydrates: 0, fat: 0, kcal: 0, protein: 0 },
    );
}
