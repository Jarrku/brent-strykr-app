import { IngredientPicker } from 'components/IngredientPicker';
import { PencilButton } from 'components/PencilButton';
import { TrashButton } from 'components/TrashButton';
import { current } from 'immer';
import { Ingredient, Meal, MealComponent, Menu } from 'model/types';
import Head from 'next/head';
import { Fragment, useMemo, useState } from 'react';
import tw from 'twin.macro';

import { useMealplan } from '../model/mealplan';

// function safeAddition(num1: number, num2: number) {
//   const factor = Math.pow(10, 2);
//   const result = (Math.round(num1 * factor) + Math.round(num2 * factor)) / factor;
//   return result;
// }

function round(number: number) {
  return Math.round(number * 100) / 100;
}

function getNutrientValue({ amount, ingredient }: MealComponent) {
  if (!ingredient) throw new Error('shouldnt happen');

  const multiplier = amount / ingredient.baseAmount;

  return {
    carbohydrates: round(ingredient.carbohydrates * multiplier),
    fat: round(ingredient.fat * multiplier),
    kcal: round(ingredient.kcal * multiplier),
    protein: round(ingredient.protein * multiplier),
  };
}

function getMealTotals(components: MealComponent[]) {
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

function getMenuTotal(menu: Menu) {
  return menu.meals
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

function MealUI({ menuIdx, mealIdx }: { menuIdx: number; mealIdx: number }) {
  const mealNote = useMealplan((state) => state.mealplan.menus[menuIdx].meals[mealIdx].note);
  const set = useMealplan((state) => state.set);

  return (
    <div>
      <div tw="flex justify-between items-center">
        <MealTitle menuIdx={menuIdx} mealIdx={mealIdx} />
        <TrashButton
          tw="print:hidden"
          onClick={() => {
            set((state) => void delete state.mealplan.menus[menuIdx].meals[mealIdx]);
          }}
        />
      </div>
      <div>
        <textarea
          name="meal-note"
          rows={2}
          tw="print:hidden shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border-gray-300 rounded-md"
          placeholder="Notitie.."
          value={mealNote}
          onChange={({ currentTarget }) =>
            set((state) => {
              state.mealplan.menus[menuIdx].meals[mealIdx].note = currentTarget.value;
            })
          }
        ></textarea>
        <p tw="hidden print:block">{mealNote}</p>
      </div>
      <MealItems menuIdx={menuIdx} mealIdx={mealIdx} />
    </div>
  );
}

function MealItems({ menuIdx, mealIdx }: { menuIdx: number; mealIdx: number }) {
  const components = useMealplan((state) => state.mealplan.menus[menuIdx].meals[mealIdx].components);
  const set = useMealplan((state) => state.set);

  const totals = getMealTotals(components);

  const [newItemAmount, setNewItemAmount] = useState(100);
  const [selectedIngredient, setSelectedIngredient] = useState<Ingredient | null>(null);

  const addIngredient = () => {
    if (!selectedIngredient) return;
    set(
      (state) =>
        void state.mealplan.menus[menuIdx].meals[mealIdx].components.push({
          ingredient: selectedIngredient,
          ingredientId: selectedIngredient.name,
          amount: newItemAmount,
        }),
    );

    setNewItemAmount(100);
  };

  const previewMetrics = useMemo(
    () =>
      selectedIngredient &&
      getNutrientValue({
        amount: newItemAmount,
        ingredient: selectedIngredient,
        ingredientId: selectedIngredient.name,
      }),
    [newItemAmount, selectedIngredient],
  );

  return (
    <div tw="mt-2 grid gap-2 grid-cols-ingredient-row items-center">
      {/* HEADER  */}
      <span tw="col-span-3 font-bold">Naam</span>
      <span tw="col-span-1 font-bold">Hoeveelheid</span>
      <span tw="font-bold justify-self-center print:invisible">Eenheid</span>
      <span tw="font-bold">KCAL</span>
      <span tw="font-bold">EIW</span>
      <span tw="font-bold">KH</span>
      <span tw="font-bold">Vet</span>
      {/* ITEMS */}
      {components.map((component, componentIdx) => {
        const { kcal, protein, carbohydrates, fat } = getNutrientValue(component);

        if (!component.ingredient) throw new Error('shouldnt happen');

        return (
          <Fragment>
            <span tw="col-span-3">{component.ingredient.name}</span>
            <input
              tw="print:hidden"
              type="number"
              value={component.amount}
              min={1}
              onChange={({ currentTarget }) => {
                console.log(component.amount);
                set((state) => {
                  const amount = Number.isNaN(currentTarget.valueAsNumber) ? 0 : currentTarget.valueAsNumber;
                  state.mealplan.menus[menuIdx].meals[mealIdx].components[componentIdx].amount = amount;
                });
              }}
            />

            <span tw="justify-self-center print:col-span-2 print:justify-self-start">
              <span tw="hidden print:inline-block">
                {component.amount} {component.ingredient.metric}
              </span>
              <span tw="print:hidden">{component.ingredient.metric}</span>
            </span>
            <span>{kcal}</span>
            <span>{protein}</span>
            <span>{carbohydrates}</span>
            <span>{fat}</span>
            <TrashButton
              tw="print:hidden justify-self-center"
              onClick={() => {
                set((state) => {
                  delete state.mealplan.menus[menuIdx].meals[mealIdx].components[componentIdx];
                });
              }}
            />
          </Fragment>
        );
      })}
      {/* NEW ITEM ROW PREVIEW */}
      <IngredientPicker tw="col-span-3 print:hidden" onSelect={(ingredient) => setSelectedIngredient(ingredient)} />
      <input
        tw="print:hidden"
        type="number"
        min={0}
        value={newItemAmount}
        onKeyPress={(e) => e.key === 'Enter' && addIngredient()}
        onChange={({ currentTarget }) => {
          const amount = Number.isNaN(currentTarget.valueAsNumber) ? 0 : currentTarget.valueAsNumber;
          setNewItemAmount(amount);
        }}
      />
      <span tw="justify-self-center text-gray-400 print:hidden">
        <span>{selectedIngredient?.metric}</span>
      </span>
      <span tw="text-gray-400 print:hidden">{previewMetrics?.kcal}</span>
      <span tw="text-gray-400 print:hidden">{previewMetrics?.protein}</span>
      <span tw="text-gray-400 print:hidden">{previewMetrics?.carbohydrates}</span>
      <span tw="text-gray-400 print:hidden">{previewMetrics?.fat}</span>

      <button
        tw="col-start-10 cursor-pointer print:hidden inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        css={[!selectedIngredient && tw`text-gray-400 cursor-not-allowed`]}
        onClick={() => addIngredient()}
      >
        ADD
      </button>
      {/* DIVIDER */}
      <span tw="col-span-full  border-gray-400 border-t-2"></span>
      {/* TOTALS */}
      <span tw="col-span-5">Totaal</span>
      <span tw="font-bold">{totals.kcal}</span>
      <span tw="font-bold">{totals.protein}</span>
      <span tw="font-bold">{totals.carbohydrates}</span>
      <span tw="font-bold">{totals.fat}</span>
    </div>
  );
}

function MealTitle({ menuIdx, mealIdx }: { menuIdx: number; mealIdx: number }) {
  const [editTitle, setEditTitle] = useState(false);
  const mealLabel = useMealplan((state) => state.mealplan.menus[menuIdx].meals[mealIdx].label);
  const set = useMealplan((state) => state.set);

  return (
    <div>
      <h4 css={[editTitle && tw`hidden print:block`]}>
        {mealLabel} <PencilButton tw="print:hidden" onClick={() => setEditTitle(true)} />
      </h4>
      <input
        type="text"
        tw="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 hidden w-full sm:text-sm border-gray-300 rounded-md"
        css={[editTitle && tw`block print:hidden`]}
        value={mealLabel}
        onKeyPress={({ key }) => key === 'Enter' && setEditTitle(false)}
        onChange={({ currentTarget }) =>
          set((state) => {
            state.mealplan.menus[menuIdx].meals[mealIdx].label = currentTarget.value;
          })
        }
      />
    </div>
  );
}

function MenuTitle({ menuIdx }: { menuIdx: number }) {
  const [editTitle, setEditTitle] = useState(false);
  const menuLabel = useMealplan((state) => state.mealplan.menus[menuIdx].label);
  const set = useMealplan((state) => state.set);

  return (
    <div>
      <h2 css={[editTitle && tw`hidden print:block`]}>
        {menuLabel} <PencilButton tw="print:hidden" onClick={() => setEditTitle(true)} />
      </h2>
      <input
        type="text"
        tw="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 hidden w-full sm:text-sm border-gray-300 rounded-md"
        css={[editTitle && tw`block print:hidden`]}
        value={menuLabel}
        onKeyPress={({ key }) => key === 'Enter' && setEditTitle(false)}
        onChange={({ currentTarget }) =>
          set((state) => {
            state.mealplan.menus[menuIdx].label = currentTarget.value;
          })
        }
      />
    </div>
  );
}

function MenuUI({ menuIdx }: { menuIdx: number }) {
  const menu = useMealplan((state) => state.mealplan.menus[menuIdx]);
  const set = useMealplan((state) => state.set);

  const totals = getMenuTotal(menu);
  return (
    <div>
      <div tw="flex justify-between items-center">
        <MenuTitle menuIdx={menuIdx} />
        {/* <h2>{menu.label}</h2> */}
        <button
          tw="print:hidden inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={() => print()}
        >
          Print
        </button>
      </div>
      <div>
        <textarea
          name="menu-note"
          rows={2}
          tw="print:hidden shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border-gray-300 rounded-md"
          placeholder="Notitie.."
          value={menu.note}
          onChange={({ currentTarget }) =>
            set((state) => {
              state.mealplan.menus[menuIdx].note = currentTarget.value;
            })
          }
        ></textarea>
        <p tw="hidden print:block">{menu.note}</p>
      </div>
      <h3>Maaltijden</h3>
      {menu.meals.map((_, mealIdx) => (
        <MealUI menuIdx={menuIdx} mealIdx={mealIdx} />
      ))}
      <button
        type="button"
        tw="print:hidden inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        onClick={() => {
          set(
            (state) =>
              void state.mealplan.menus[menuIdx].meals.push({
                id: `${Date.now()}`,
                label: 'Maaltijd ' + (menu.meals.length + 1),
                components: [],
                note: '',
              }),
          );
        }}
      >
        Maaltijd Toevoegen
        <svg
          tw="ml-3 -mr-1  h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      </button>
      <h3>Totalen</h3>
      <div tw="mt-2 grid gap-2 grid-cols-ingredient-row items-center">
        <span tw="font-bold col-start-6">KCAL</span>
        <span tw="font-bold">EIW</span>
        <span tw="font-bold">KH</span>
        <span tw="font-bold">Vet</span>
        {/* VALUES */}
        <span tw="font-bold col-start-6">{totals.kcal}</span>
        <span tw="font-bold">{totals.protein}</span>
        <span tw="font-bold">{totals.carbohydrates}</span>
        <span tw="font-bold">{totals.fat}</span>
        <span tw="invisible col-start-10 print:hidden inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          ADD
        </span>
      </div>
    </div>
  );
}

const isSSR = typeof window === 'undefined';

export default function Home() {
  const menus = useMealplan((state) => state.mealplan.menus);

  return (
    <div>
      <Head>
        <title>Brent Strykr</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div tw="prose max-w-screen-lg p-4 mx-auto">
        {/* <h1>
          Mealplan: {mealplan.name} - Voor: {mealplan.user}
        </h1> */}
        {!isSSR && menus?.map((_, menuIdx) => <MenuUI menuIdx={menuIdx} />)}
      </div>
    </div>
  );
}

// TODO: add SSG when data is on server
// export async function getStaticProps() {
//   const queryClient = new QueryClient()

//   await queryClient.prefetchQuery(['posts', 10], () => fetchPosts(10))

//   return {
//     props: {
//       dehydratedState: dehydrate(queryClient),
//     },
//   }
// }
