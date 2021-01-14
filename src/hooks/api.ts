import { Mealplan, Menu, Meal, Ingredient } from 'model/types';
import { v4 as uuidv4 } from 'uuid';

import { get, set, createStore, update, values, del } from 'idb-keyval';

import ingredients from '../ingredients.json';

const mealplanStore = createStore('mealplan-db', 'mealplan-store');

export type MealplanApi = Omit<Mealplan, 'menus'> & { menus: string[] };

const fetchMealPlans = async () => {
  //@ts-ignore
  const results = (await values(mealplanStore)) as MealplanApi[];

  if (results.length === 0) {
    const menuId = uuidv4();
    await updateMenu({ id: menuId, label: 'Testmenu', note: 'Notitie', meals: [] });
    const mealplan = getDefaultMealplan(menuId);

    await set(mealplan.id, mealplan, mealplanStore);
    //@ts-ignore
    return (await values(mealplanStore)) as MealplanApi[];
  }

  return results;
};

const fetchMealPlan = (mealplanId?: string) => {
  if (!mealplanId) throw new Error('Passed empty mealplanId to idb get fn');
  return get(mealplanId, mealplanStore) as Promise<MealplanApi>;
};

const updateMealPlan = (mealplan: MealplanApi) => update(mealplan.id, () => mealplan, mealplanStore);

export const mealplanApi = {
  get: fetchMealPlan,
  getAll: fetchMealPlans,
  update: updateMealPlan,
};

const menuStore = createStore('menu-db', 'menu-store');

export type MenuApi = Omit<Menu, 'meals'> & { meals: string[] };

const fetchMenu = (menuId: string) => get(menuId, menuStore) as Promise<MenuApi>;
const updateMenu = (menu: MenuApi) => update(menu.id, () => menu, menuStore);
export const menuApi = {
  get: fetchMenu,
  update: updateMenu,
};

const mealStore = createStore('meal-db', 'meal-store');

const fetchMeal = async (mealId: string) => {
  const meal = (await get(mealId, mealStore)) as Meal;

  meal.components = meal.components.map((c) => {
    c.ingredient = fetchIngredient(c.ingredientId);
    return c;
  });

  return meal;
};

const updateMeal = (meal: Meal) => update(meal.id, () => meal, mealStore);
const deleteMeal = (mealId: string) => del(mealId, mealStore);
const createMeal = async (data: { label: string; note: string }) => {
  const id = uuidv4();
  await set(id, { ...data, id, components: [] }, mealStore);
  return fetchMeal(id);
};

export const mealApi = {
  get: fetchMeal,
  update: updateMeal,
  del: deleteMeal,
  create: createMeal,
};

const ingredientMap = new Map<string, Ingredient>();
ingredients.forEach((i) => ingredientMap.set(i.name, i));

export function fetchIngredient(name: string) {
  return ingredientMap.get(name);
}

// TODO initialization

function getDefaultMealplan(menuId: string) {
  return {
    id: uuidv4(),
    name: 'Eerste plan',
    user: 'Simon',
    menus: [menuId],
  };
}

// const DEFAULT_MEALPLAN: Mealplan = {
//   id: uuidv4(),
//   name: 'Eerste plan',
//   user: 'Simon',
//   menus: [
//     {
//       id: uuidv4(),
//       label: 'Menu Ma/Woe/Vrij',
//       note: 'Menu voor workout days',
//       meals: [
//         {
//           id: uuidv4(),
//           label: 'Maaltijd Ochtend 8u',
//           note: 'Genoeg water drinken',
//           components: [],
//         },
//         {
//           id: uuidv4(),
//           label: 'Maaltijd Middag 12u',
//           note: 'Pintje mag',
//           components: [],
//         },
//         {
//           id: uuidv4(),
//           label: 'Maaltijd Namiddag 16u',
//           note: 'Nu terug flink zijn',
//           components: [],
//         },
//       ],
//     },
//   ],
// };
