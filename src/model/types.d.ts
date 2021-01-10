export interface Ingredient {
  name: string;
  baseAmount: number;
  metric: string;
  kcal: number;
  protein: number;
  carbohydrates: number;
  fat: number;
}

export interface Mealplan {
  name: string;
  menus: Menu[];
  user: string;
}

export interface Menu {
  label: string;
  note: string;
  meals: Meal[];
}

export interface Meal {
  label: string;
  note: string;
  components: MealComponent[];
}

export interface MealComponent {
  ingredient: Ingredient;
  amount: number;
}
