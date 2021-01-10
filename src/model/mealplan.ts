import create from 'zustand';
import { combine, persist } from 'zustand/middleware';
import produce from 'immer';

import { Mealplan } from './types';
import ingredients from '../ingredients.json';

const mealplan: Mealplan = {
  name: 'Eerste plan',
  menus: [
    {
      label: 'Menu Ma/Woe/Vrij',
      note: 'Menu voor workout days',
      meals: [
        //       {
        //         label: 'Maaltijd Ochtend 8u',
        //         note: 'Genoeg water drinken',
        //         components: [
        //           {
        //             amount: 2,
        //             ingredient: ingredients[0],
        //           },
        //           {
        //             amount: 2,
        //             ingredient: ingredients[1],
        //           },
        //           {
        //             amount: 2,
        //             ingredient: ingredients[2],
        //           },
        //           {
        //             amount: 2,
        //             ingredient: ingredients[3],
        //           },
        //         ],
        //       },
        //       {
        //         label: 'Maaltijd Middag 12u',
        //         note: 'Pintje mag',
        //         components: [
        //           {
        //             amount: 2,
        //             ingredient: ingredients[0],
        //           },
        //           {
        //             amount: 2,
        //             ingredient: ingredients[1],
        //           },
        //           {
        //             amount: 2,
        //             ingredient: ingredients[2],
        //           },
        //           {
        //             amount: 2,
        //             ingredient: ingredients[3],
        //           },
        //         ],
        //       },
        //       {
        //         label: 'Maaltijd Namiddag 16u',
        //         note: 'Nu terug flink zijn',
        //         components: [
        //           {
        //             amount: 2,
        //             ingredient: ingredients[0],
        //           },
        //           {
        //             amount: 2,
        //             ingredient: ingredients[1],
        //           },
        //           {
        //             amount: 2,
        //             ingredient: ingredients[2],
        //           },
        //           {
        //             amount: 2,
        //             ingredient: ingredients[3],
        //           },
        //         ],
        //       },
      ],
    },
  ],
  user: 'Simon',
};

const model = combine({ mealplan, ingredients }, (set) => ({
  set: (fn: (state: { mealplan: Mealplan }) => void) => set(produce(fn)),
}));

export const useMealplan = create(persist(model, { name: 'food-storage', onRehydrateStorage: () => (state) => {} }));
