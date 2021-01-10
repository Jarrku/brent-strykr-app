//@ts-ignore
import { MenuListComponentProps } from 'react-select/lib/components/Menu';
import { FixedSizeList } from 'react-window';
//@ts-ignore
import { OptionProps } from 'react-select/lib/components/Option';
import Select, { components, createFilter } from 'react-select';
import React from 'react';

export const optimizeSelect = {
  components: {
    MenuList: OptimizedMenuList,
    Option: OptimizedOption,
  },
};

function OptimizedMenuList(props: MenuListComponentProps<SelectOption>) {
  const { options, children, maxHeight, getValue } = props;
  if (!children || !Array.isArray(children)) return null;

  const height = 35;
  const selectedValues = getValue() as SelectOption[];
  const initialOffset = selectedValues[0] ? options.indexOf(selectedValues[0]) * height : 0;

  return (
    <FixedSizeList
      width={''}
      itemSize={height}
      height={maxHeight}
      itemCount={children.length}
      initialScrollOffset={initialOffset}
    >
      {({ index, style }) => (
        <div className="option-wrapper" style={style}>
          {children[index]}
        </div>
      )}
    </FixedSizeList>
  );
}

function OptimizedOption(props: OptionProps<SelectOption>) {
  delete props.innerProps.onMouseMove;
  delete props.innerProps.onMouseOver;
  return <components.Option {...props}>{props.children}</components.Option>;
}

// SelectOption is specific to this example
// and may not work with other projects
type SelectOption = {
  value: string;
  label: string;
  [key: string]: string;
};

export function OptimizedSelect(props: React.ComponentProps<typeof Select>) {
  return (
    <Select {...props} filterOption={createFilter({ ignoreAccents: false })} components={optimizeSelect.components} />
  );
}
