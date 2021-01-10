import { useMealplan } from 'model/mealplan';
import { Ingredient } from 'model/types';
import { useMemo } from 'react';
import 'twin.macro';
import { OptimizedSelect } from './Select';

interface NormalizedIngredients {
  [x: string]: Ingredient[] | undefined;
}

export function IngredientPicker({
  onSelect,
  className,
}: {
  onSelect: (ingredient: Ingredient) => void;
  className?: string;
}) {
  const ingredients = useMealplan((state) => state.ingredients);
  const mapped = useMemo(() => ingredients.map((i) => ({ label: i.name, value: i })), [ingredients]);

  return (
    <div className={className}>
      <OptimizedSelect
        classNamePrefix="select"
        onChange={(value) => {
          //@ts-ignore
          onSelect(value.value);
        }}
        placeholder="Kies ingredient..."
        isSearchable={true}
        name="color"
        options={mapped}
      />
    </div>
  );
}

function getFirstLetter(str: string) {
  return str.charAt(0).toLowerCase();
}

function useFilteredIngredients(input: string) {
  const ingredients = useMealplan((state) => state.ingredients);

  const normalizedItems = useMemo(() => {
    return ingredients.reduce<NormalizedIngredients>((acc, ingredient) => {
      const letter = getFirstLetter(ingredient.name);

      if (!acc[letter]) acc[letter] = [];

      acc[letter]?.push(ingredient);

      return acc;
    }, {});
  }, [ingredients]);

  const resolvedItems = useMemo(() => {
    const letter = getFirstLetter(input);
    if (letter === '') return [];

    const searchItems = normalizedItems[letter];
    if (!searchItems) return [];

    const items = [];

    for (let item of searchItems) {
      if (item.name.toLowerCase().startsWith(input)) {
        items.push({ value: item, label: item.name });

        if (items.length === 10) break;
      }
    }

    return items;
  }, [input, normalizedItems]);

  return resolvedItems;
}
