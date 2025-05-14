import { type ComboboxValueChangeDetails, Combobox as VendorCombobox, createListCollection } from '@ark-ui/react/combobox';
import { type ComponentPropsWithRef, type FC, type JSX, forwardRef, useMemo, useState } from 'react';
import { ComboboxContext } from '../../context/combobox';
import { type ComboboxGroupItem, type ComboboxItem, type ComboboxOptionItem } from '../../context/combobox';
import { isGroup } from '../../controller/combobox';

type ComboboxProp = Omit<ComponentPropsWithRef<'div'>, 'onSelect'> & {
  addNewElementLabel?: string;
  allowNewElement?: boolean;
  defaultValue?: string;
  disabled?: boolean;
  highlightResults?: boolean;
  invalid?: boolean;
  items: ComboboxItem[];
  name?: string;
  noResultLabel?: string;
  onInputValueChange?: (details: { inputValue: string }) => void;
  onValueChange?: (details: ComboboxValueChangeDetails<ComboboxOptionItem>) => void;
  readOnly?: boolean;
  required?: boolean;
  value?: string;
};

function filterItems(items: ComboboxItem[], query: string): ComboboxItem[] {
  if (!query) {
    return items;
  }
  const lowerQuery = query.toLowerCase();
  return items
    .map((item) => {
      if (isGroup(item)) {
        const group = item as ComboboxGroupItem;
        const filteredOptions = group.options.filter((opt) =>
          opt.label.toLowerCase().includes(lowerQuery),
        );
        return filteredOptions.length > 0 ? { ...group, options: filteredOptions } : null;
      }
      const option = item as ComboboxOptionItem;
      return option.label.toLowerCase().includes(lowerQuery) ? option : null;
    })
    .filter((item): item is ComboboxItem => item !== null);
}

function hasExactMatch(items: ComboboxItem[], query: string): boolean {
  const lowerQuery = query.trim().toLowerCase();
  return items.some((item) =>
    isGroup(item)
      ? (item as ComboboxGroupItem).options.some((opt) => opt.label.toLowerCase() === lowerQuery || opt.value.toLowerCase() === lowerQuery)
      : (item as ComboboxOptionItem).label.toLowerCase() === lowerQuery || (item as ComboboxOptionItem).value.toLowerCase() === lowerQuery,
  );
}

const Combobox: FC<ComboboxProp> = forwardRef(({
  addNewElementLabel = 'Add ',
  allowNewElement = true,
  children,
  className,
  defaultValue,
  disabled = false,
  highlightResults = false,
  invalid,
  items = [],
  name,
  noResultLabel = 'No results found',
  onInputValueChange,
  onValueChange,
  readOnly = false,
  required,
  value,
  ...props
}, ref): JSX.Element => {
  const [inputValue, setInputValue] = useState('');
  const [placement, setPlacement] = useState('bottom-start');

  const filteredItems = useMemo(() => {
    const filtered = filterItems(items, inputValue);
    const showAdd = allowNewElement && inputValue.trim() && !hasExactMatch(items, inputValue);
    const addOption = showAdd
      ? [{ customRendererData: { displayLabel: `${addNewElementLabel}${inputValue}` , isNew: true }, label: inputValue, value: inputValue }]
      : [];
    if (filtered.length === 0) {
      return [...addOption, { disabled: true, label: noResultLabel, value: '__noresult__' }];
    }
    return [...addOption, ...filtered];
  }, [items, inputValue, noResultLabel, allowNewElement, addNewElementLabel]);

  const collection = useMemo(() => {
    const options: ComboboxOptionItem[] = [];
    filteredItems.forEach((item) => {
      if (isGroup(item)) {
        options.push(...(item as ComboboxGroupItem).options);
      } else {
        options.push(item as ComboboxOptionItem);
      }
    });
    return createListCollection<ComboboxOptionItem>({ items: options });
  }, [filteredItems]);

  const defaultValues = useMemo(() => defaultValue ? [defaultValue] : [], [defaultValue]);
  const controlledValue = useMemo(() => value ? [value] : [], [value]);

  const handleInputValueChange = (details: { inputValue: string }): void => {
    setInputValue(details.inputValue);
    onInputValueChange?.(details);
  };

  const handleValueChange = (details: ComboboxValueChangeDetails<ComboboxOptionItem>): void => {
    const selected = details.items?.[0];
    if (allowNewElement && selected?.customRendererData?.isNew) {
      setInputValue(selected.value);
      onValueChange?.({ ...details, items: [{ label: selected.value, value: selected.value }], value: [selected.value] });
      return;
    }
    if (details.value) {
      const found = collection.items.find((opt: ComboboxOptionItem) => opt.value === details.value[0]);
      setInputValue(found ? found.label : details.value[0]);
    }
    onValueChange?.(details);
  };

  return (
    <ComboboxContext.Provider value={{ filteredItems, highlightResults, placement, query: inputValue, setPlacement }}>
      <VendorCombobox.Root
        className={ className }
        collection={ collection }
        defaultValue={ defaultValues }
        disabled={ disabled }
        invalid={ invalid }
        loopFocus={ true }
        inputBehavior="autocomplete"
        name={ name }
        onValueChange={ handleValueChange }
        onInputValueChange={ handleInputValueChange }
        positioning={{
          gutter: -1,
          sameWidth: true,
        }}
        readOnly={ readOnly }
        ref={ ref }
        required={ required }
        value={ value !== undefined ? controlledValue : undefined }
        { ...props }>
        {children}
      </VendorCombobox.Root>
    </ComboboxContext.Provider>
  );
});

Combobox.displayName = 'ComboboxOption';

export {
  Combobox,
  type ComboboxProp,
};
