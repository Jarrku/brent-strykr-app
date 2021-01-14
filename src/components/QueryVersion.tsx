import { Fragment, useMemo, useState } from 'react';
import Head from 'next/head';
import tw from 'twin.macro';
import produce from 'immer';

import { IngredientPicker } from '@/components/IngredientPicker';
import { PencilButton } from '@/components/PencilButton';
import { TrashButton } from '@/components/TrashButton';
import { PlusIcon } from '@/components/icons/PlusIcon';
import { Ingredient } from '@/model/types';
import { getMealTotals, getMenuTotal, getNutrientValue } from '@/utils';

import {
  useCreateMealMutation,
  useMeal,
  useMealMutation,
  useMealplan,
  useMealplans,
  useMenu,
  useMenuMutation,
  useMultipleMeals,
} from '@/hooks';

function MealUI({ mealId, menuId }: { mealId: string; menuId: string }) {
  const meal = useMeal(mealId);
  const menu = useMenu(menuId);
  const mutation = useMealMutation();
  const menuMutation = useMenuMutation();

  if (!meal.data || !menu.data) return null;

  return (
    <div>
      <div tw="flex justify-between items-center">
        <MealTitle mealId={mealId} />
        <TrashButton
          tw="print:hidden"
          onClick={() => {
            const result = produce(menu.data, (draft) => {
              const index = draft.meals.findIndex((meal) => meal === mealId);
              if (index !== -1) draft.meals.splice(index, 1);
            });

            menuMutation.mutate(result);
          }}
        />
      </div>
      <div>
        <textarea
          name="meal-note"
          rows={2}
          tw="print:hidden shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border-gray-300 rounded-md"
          placeholder="Notitie.."
          value={meal.data.note}
          onChange={({ currentTarget }) => {
            const result = produce(meal.data, (draft) => {
              draft.note = currentTarget.value;
            });

            mutation.mutate(result);
          }}
        ></textarea>
        <p tw="hidden print:block">{meal.data.note}</p>
      </div>
      <MealItems mealId={mealId} />
    </div>
  );
}

function MealItems({ mealId }: { mealId: string }) {
  const meal = useMeal(mealId);
  const mutation = useMealMutation();
  const [newItemAmount, setNewItemAmount] = useState(100);
  const [selectedIngredient, setSelectedIngredient] = useState<Ingredient | null>(null);

  const addIngredient = () => {
    if (!selectedIngredient || !meal.data) return;

    const result = produce(meal.data, (draft) => {
      draft.components.push({
        ingredient: selectedIngredient,
        ingredientId: selectedIngredient.name,
        amount: newItemAmount,
      });
    });

    mutation.mutate(result);
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

  if (!meal.data) return null;

  const totals = getMealTotals(meal.data.components);

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
      {meal.data.components.map((component, componentIdx) => {
        const { kcal, protein, carbohydrates, fat } = getNutrientValue(component);

        if (!component.ingredient) throw new Error('shouldnt happen');

        return (
          <Fragment key={component.ingredientId}>
            <span tw="col-span-3">{component.ingredient.name}</span>
            <input
              tw="print:hidden"
              type="number"
              value={component.amount}
              min={1}
              onChange={({ currentTarget }) => {
                const amount = Number.isNaN(currentTarget.valueAsNumber) ? 0 : currentTarget.valueAsNumber;

                const result = produce(meal.data, (draft) => {
                  draft.components[componentIdx].amount = amount;
                });

                mutation.mutate(result);
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
                const result = produce(meal.data, (draft) => {
                  draft.components.splice(componentIdx, 1);
                });

                mutation.mutate(result);
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

function MealTitle({ mealId }: { mealId: string }) {
  const [editTitle, setEditTitle] = useState(false);
  const meal = useMeal(mealId);
  const mutation = useMealMutation();

  if (!meal.data) return null;

  return (
    <div>
      <h4 css={[editTitle && tw`hidden print:block`]}>
        {meal.data.label} <PencilButton tw="print:hidden" onClick={() => setEditTitle(true)} />
      </h4>
      <input
        type="text"
        tw="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 hidden w-full sm:text-sm border-gray-300 rounded-md"
        css={[editTitle && tw`block print:hidden`]}
        value={meal.data.label}
        onKeyPress={({ key }) => key === 'Enter' && setEditTitle(false)}
        onChange={({ currentTarget }) => {
          const result = produce(meal.data, (draft) => {
            draft.label = currentTarget.value;
          });

          mutation.mutate(result);
        }}
      />
    </div>
  );
}

function MenuTitle({ menuId }: { menuId: string }) {
  const menu = useMenu(menuId);
  const mutation = useMenuMutation();

  const [editTitle, setEditTitle] = useState(false);

  if (!menu.data) return null;

  return (
    <div>
      <h2 css={[editTitle && tw`hidden print:block`]}>
        {menu.data?.label} <PencilButton tw="print:hidden" onClick={() => setEditTitle(true)} />
      </h2>
      <input
        type="text"
        tw="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 hidden w-full sm:text-sm border-gray-300 rounded-md"
        css={[editTitle && tw`block print:hidden`]}
        value={menu.data?.label}
        onKeyPress={({ key }) => key === 'Enter' && setEditTitle(false)}
        onChange={({ currentTarget }) => {
          const result = produce(menu.data, (draft) => {
            draft.label = currentTarget.value;
          });
          mutation.mutate(result);
        }}
      />
    </div>
  );
}

function MenuUI({ menuId }: { menuId: string }) {
  const menu = useMenu(menuId);
  const mutation = useMenuMutation();
  const createMeal = useCreateMealMutation();

  if (menu.data === undefined) return null;

  return (
    <div>
      <div tw="flex justify-between items-center">
        <MenuTitle menuId={menuId} />
        <button
          tw="print:hidden inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={() => window.print()}
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
          value={menu.data.note}
          onChange={({ currentTarget }) => {
            const result = produce(menu.data, (draft) => {
              draft.note = currentTarget.value;
            });
            mutation.mutate(result);
          }}
        ></textarea>
        <p tw="hidden print:block">{menu.data.note}</p>
      </div>
      <h3>Maaltijden</h3>
      {menu.data.meals.map((mealId) => (
        <MealUI key={mealId} mealId={mealId} menuId={menuId} />
      ))}
      <button
        type="button"
        tw="print:hidden inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        onClick={() => {
          createMeal.mutateAsync({ label: 'Maaltijd ' + (menu.data.meals.length + 1), note: '' }).then(({ id }) => {
            const menuResult = produce(menu.data, (draft) => {
              draft.meals.push(id);
            });

            mutation.mutate(menuResult);
          });
        }}
      >
        Maaltijd Toevoegen
        <PlusIcon tw="ml-3 -mr-1 h-5 w-5" />
      </button>
      <h3>Totalen</h3>
      <MenuTotal mealIds={menu.data.meals} />
    </div>
  );
}

function getTotals(meals: ReturnType<typeof useMultipleMeals>) {
  if (!meals.every((s) => s.isSuccess)) return null;

  const res = meals.map((s) => s.data!);
  return getMenuTotal(res);
}

function MenuTotal({ mealIds }: { mealIds: string[] }) {
  const meals = useMultipleMeals(mealIds);
  const totals = getTotals(meals);

  if (!totals) return null;

  return (
    <div tw="mt-2 grid gap-2 grid-cols-ingredient-row items-center">
      <span tw="font-bold col-start-6">KCAL</span>
      <span tw="font-bold">EIW</span>
      <span tw="font-bold">KH</span>
      <span tw="font-bold">Vet</span>
      <span tw="font-bold col-start-6">{totals.kcal}</span>
      <span tw="font-bold">{totals.protein}</span>
      <span tw="font-bold">{totals.carbohydrates}</span>
      <span tw="font-bold">{totals.fat}</span>
      <span tw="invisible col-start-10 print:hidden inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
        ADD
      </span>
    </div>
  );
}

export default function Home() {
  const mealplans = useMealplans();
  const mealplanId = mealplans.data?.[0].id;
  const mealplan = useMealplan(mealplanId, { enabled: !!mealplanId });

  return (
    <div>
      <Head>
        <title>Brent Strykr App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div tw="prose max-w-screen-lg p-4 mx-auto">
        {mealplan.data && mealplan.data.menus.map((menuId) => <MenuUI key={menuId} menuId={menuId} />)}
      </div>
      {/* <div tw="hidden print:block">TODO print preview</div> */}
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
