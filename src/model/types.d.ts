export interface Ingredient {
  // id: string;
  name: string;
  baseAmount: number;
  metric: string;
  kcal: number;
  protein: number;
  carbohydrates: number;
  fat: number;
}

export interface Mealplan {
  id: string;
  name: string;
  menus: Menu[];
  user: string;
}

export interface Menu {
  id: string;
  label: string;
  note: string;
  meals: Meal[];
}

export interface Meal {
  id: string;
  label: string;
  note: string;
  components: MealComponent[];
}

export interface MealComponent {
  ingredient?: Ingredient;
  ingredientId: string;
  amount: number;
}
