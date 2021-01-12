import { QueryObserverResult, useMutation, useQueries, useQuery, UseQueryOptions } from 'react-query';
import { queryClient } from 'queryClient';

import { mealApi, mealplanApi, MealplanApi, menuApi, MenuApi } from './api';
import { Meal } from 'model/types';

const MEALPLAN_QUERY_ID = 'mealplans';

export const useMealplans = () => useQuery(MEALPLAN_QUERY_ID, () => mealplanApi.getAll());
export const useMealplan = (id?: string, options?: UseQueryOptions<MealplanApi, unknown, MealplanApi>) =>
  useQuery([MEALPLAN_QUERY_ID, id], () => mealplanApi.get(id), options);

export const useMealplanMutation = () => {
  type Context = { previous: MealplanApi; updated: MealplanApi };

  const mutation = useMutation<void, unknown, MealplanApi, Context>((mealplan) => mealplanApi.update(mealplan), {
    onMutate: async (updatedMealplan) => {
      await queryClient.cancelQueries([MEALPLAN_QUERY_ID, updatedMealplan.id]);

      const previousMealplan = queryClient.getQueryData([MEALPLAN_QUERY_ID, updatedMealplan.id]);
      queryClient.setQueryData([MEALPLAN_QUERY_ID, updatedMealplan.id], updatedMealplan);

      return { previous: previousMealplan, updated: updatedMealplan } as Context;
    },
    onError: (err, newTodo, context) => {
      queryClient.setQueryData([MEALPLAN_QUERY_ID, context?.updated.id], context?.previous);
    },
    onSettled: (newTodo, err, mealplan) => {
      queryClient.invalidateQueries([MEALPLAN_QUERY_ID, mealplan.id]);
    },
  });

  return mutation;
};

export const MENU_QUERY_ID = 'menu';

export const useMenu = (id: string) => useQuery([MENU_QUERY_ID, id], () => menuApi.get(id));

export const useMenuMutation = () => {
  type Context = { previous: MenuApi; updated: MenuApi };

  const mutation = useMutation<void, unknown, MenuApi, Context>((menu) => menuApi.update(menu), {
    onMutate: async (updatedMenu) => {
      await queryClient.cancelQueries([MENU_QUERY_ID, updatedMenu.id]);

      const previousMenu = queryClient.getQueryData([MENU_QUERY_ID, updatedMenu.id]);
      queryClient.setQueryData([MENU_QUERY_ID, updatedMenu.id], updatedMenu);

      return { previous: previousMenu, updated: updatedMenu } as Context;
    },
    onError: (err, newTodo, context) => {
      queryClient.setQueryData([MENU_QUERY_ID, context?.updated.id], context?.previous);
    },
    onSettled: (newTodo, err, menu) => {
      queryClient.invalidateQueries([MENU_QUERY_ID, menu.id]);
    },
  });

  return mutation;
};

const MEAL_QUERY_ID = 'meal';

export const useMeal = (id: string) => useQuery([MEAL_QUERY_ID, id], () => mealApi.get(id));

export const useMultipleMeals = (ids: string[]) =>
  useQueries(
    ids.map((id) => ({
      queryKey: [MEAL_QUERY_ID, id],
      queryFn: () => mealApi.get(id),
    })),
  ) as QueryObserverResult<Meal, unknown>[];

export const useMealMutation = () => {
  type Context = { previous: Meal; updated: Meal };

  const mutation = useMutation<void, unknown, Meal, Context>((meal) => mealApi.update(meal), {
    onMutate: async (updatedMeal) => {
      await queryClient.cancelQueries([MEAL_QUERY_ID, updatedMeal.id]);

      const previousMeal = queryClient.getQueryData([MEAL_QUERY_ID, updatedMeal.id]);
      queryClient.setQueryData([MEAL_QUERY_ID, updatedMeal.id], updatedMeal);

      return { previous: previousMeal, updated: updatedMeal } as Context;
    },
    onError: (err, newTodo, context) => {
      queryClient.setQueryData([MEAL_QUERY_ID, context?.updated.id], context?.previous);
    },
    onSettled: (newTodo, err, meal) => {
      queryClient.invalidateQueries([MEAL_QUERY_ID, meal.id]);
    },
  });

  return mutation;
};

export const useCreateMealMutation = () => {
  type NewMeal = { label: string; note: string };

  const mutation = useMutation((meal: NewMeal) => mealApi.create(meal), {
    // onMutate: async (newTodo) => {
    //   await queryClient.cancelQueries('todos');

    //   // Snapshot the previous value
    //   const previousTodos = queryClient.getQueryData('todos');

    //   // Optimistically update to the new value
    //   queryClient.setQueryData('todos', (old) => [...old, newTodo]);

    //   // Return a context object with the snapshotted value
    //   return { previousTodos };
    // },
    // If the mutation fails, use the context returned from onMutate to roll back
    // onError: (err, newTodo, context) => {
    //   queryClient.setQueryData('todos', context.previousTodos);
    // },
    // Always refetch after error or success:
    onSettled: (data) => {
      data && queryClient.invalidateQueries([MEAL_QUERY_ID, data.id]);
    },
  });

  return mutation;
};
