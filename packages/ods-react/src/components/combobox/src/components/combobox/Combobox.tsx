import {
  type ComboboxValueChangeDetails,
  Combobox as VendorCombobox,
  createListCollection,
} from '@ark-ui/react/combobox';
import { type ComponentPropsWithRef, type FC, type JSX, forwardRef, useMemo, useState } from 'react';
import {
  type ComboboxCustomOptionRendererArg,
  type ComboboxItem,
  type ComboboxOptionItem,
  ComboboxProvider,
} from '../../context/useCombobox';
import { getFlatItemsWithDisabled } from '../../controller/combobox';

type ComboboxProp = Omit<ComponentPropsWithRef<'div'>, 'onSelect'> & {
  addNewElementLabel?: string;
  allowNewElement?: boolean;
  customOptionRenderer?: (arg: ComboboxCustomOptionRendererArg) => JSX.Element;
  defaultValue?: string[];
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
  value?: string[];
};

const Combobox: FC<ComboboxProp> = forwardRef(({
  addNewElementLabel,
  allowNewElement = true,
  children,
  className,
  customOptionRenderer,
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
  const [selectedValues, setSelectedValues] = useState<string[]>(value ?? defaultValue ?? []);

  const handleInputValueChange = (details: { inputValue: string }): void => {
    setInputValue(details.inputValue);
    onInputValueChange?.(details);
  };

  const flatItems = useMemo(() => {
    return getFlatItemsWithDisabled(items, inputValue, {
      allowNewElement,
      customRenderer: customOptionRenderer,
      selectedValues,
    });
  }, [items, inputValue, allowNewElement, selectedValues, customOptionRenderer]);

  const collection = useMemo(() =>
    createListCollection({
      groupBy: (item) => item.group || '',
      items: flatItems,
    }),
  [flatItems],
  );

  const handleValueChange = (details: ComboboxValueChangeDetails<ComboboxOptionItem>): void => {
    setSelectedValues(details.value);
    onValueChange?.(details);
  };

  return (
    <ComboboxProvider
      customOptionRenderer={ customOptionRenderer }
      highlightResults={ highlightResults }
      inputValue={ inputValue }
      noResultLabel={ noResultLabel }>
      <VendorCombobox.Root
        className={ className }
        collection={ collection }
        defaultValue={ defaultValue }
        disabled={ disabled }
        invalid={ invalid }
        loopFocus={ true }
        name={ name }
        onInputValueChange={ handleInputValueChange }
        onValueChange={ handleValueChange }
        positioning={ {
          gutter: -1,
          sameWidth: true,
        } }
        readOnly={ readOnly }
        ref={ ref }
        required={ required }
        value={ value }
        { ...props }>
        { children }
      </VendorCombobox.Root>
    </ComboboxProvider>
  );
});

Combobox.displayName = 'ComboboxOption';

export {
  Combobox,
  type ComboboxProp,
};
