import type { ComboboxCustomOptionRendererArg } from '../context/useCombobox';
import React, { Children, type ReactElement, type ReactNode, isValidElement } from 'react';
import { getElementText } from '../../../../utils/element';
import style from '../components/combobox-option/comboboxOption.module.scss';
import { type ComboboxGroupItem, type ComboboxItem, type ComboboxOptionItem } from '../context/useCombobox';

function isGroup(item: ComboboxItem): item is ComboboxGroupItem {
  return 'options' in item;
}

function doesOptionMatch(
  option: ComboboxOptionItem,
  inputValue: string,
  customRenderer?: (arg: ComboboxCustomOptionRendererArg) => JSX.Element,
): boolean {
  if (customRenderer && option.customRendererData) {
    const rendered = customRenderer({
      customData: option.customRendererData,
      label: option.label,
    });
    const text = getElementText(rendered);
    return text.toLowerCase().includes(inputValue.toLowerCase());
  }
  return option.label.toLowerCase().includes(inputValue.toLowerCase());
}

function shouldOptionBeDisabled(
  option: ComboboxOptionItem,
  inputValue: string,
  customRenderer?: (arg: ComboboxCustomOptionRendererArg) => JSX.Element,
): boolean {
  return !doesOptionMatch(option, inputValue, customRenderer) || !!option.disabled;
}

function flattenGroupWithDisabled(
  group: ComboboxGroupItem,
  inputValue: string,
  customRenderer?: (arg: ComboboxCustomOptionRendererArg) => JSX.Element,
): (ComboboxOptionItem & { group?: string })[] {
  const groupOptions = group.options.map((opt) => ({
    ...opt,
    disabled: shouldOptionBeDisabled(opt, inputValue, customRenderer),
    group: group.label,
  }));
  const hasEnabled = groupOptions.some((opt) => !opt.disabled);
  return hasEnabled ? groupOptions : [];
}

function flattenItemsWithDisabled(
  items: ComboboxItem[],
  inputValue: string,
  customRenderer?: (arg: ComboboxCustomOptionRendererArg) => JSX.Element,
): (ComboboxOptionItem & { group?: string })[] {
  return items.flatMap((item) => {
    if (isGroup(item)) {
      return flattenGroupWithDisabled(item, inputValue, customRenderer);
    }
    return [{
      ...item,
      disabled: shouldOptionBeDisabled(item, inputValue, customRenderer),
      group: '',
    }];
  });
}

function shouldAddNewElement(
  allowNewElement: boolean,
  inputValue: string,
  flatItems: (ComboboxOptionItem & { group?: string })[],
  selectedValues: string[],
): boolean {
  const normalizedInput = inputValue.trim();
  return (
    allowNewElement &&
    normalizedInput !== '' &&
    !flatItems.some((opt) => opt.label === normalizedInput) &&
    !selectedValues.some((val) => val.trim() === normalizedInput)
  );
}

type GetFlatItemsOptions = {
  allowNewElement: boolean;
  selectedValues: string[];
  customRenderer?: (arg: ComboboxCustomOptionRendererArg) => JSX.Element;
};

function getFlatItemsWithDisabled(
  items: ComboboxItem[],
  inputValue: string,
  options: GetFlatItemsOptions,
): (ComboboxOptionItem & { group?: string; isNew?: boolean })[] {
  const { allowNewElement, selectedValues, customRenderer } = options;
  const baseItems = flattenItemsWithDisabled(items, inputValue, customRenderer);
  if (shouldAddNewElement(allowNewElement, inputValue, baseItems, selectedValues)) {
    return [
      {
        disabled: false,
        group: '',
        isNew: true,
        label: inputValue,
        value: inputValue,
      },
      ...baseItems,
    ];
  }
  return baseItems;
}

function highlightInElement(element: ReactNode, search: string): ReactNode {
  if (!search) {
    return element;
  }
  const regex = new RegExp(`(${search.replace(/[.*+?^${}()|[\\]\\]/g, '\\$&')})`, 'gi');

  if (typeof element === 'string' || typeof element === 'number') {
    const parts = element.toString().split(regex);
    return parts.map((part, i) =>
      regex.test(part)
        ? React.createElement('span', { className: style[ 'combobox-option--highlighted' ], key: i }, part)
        : part,
    );
  }
  if (!isValidElement(element)) {
    return element;
  }
  if (!('props' in element) || !element.props.children) {
    return element;
  }
  const children = (element as ReactElement<{ children: ReactNode }>).props.children;
  const highlighted = Children.map(children, (child) => highlightInElement(child, search));
  return React.cloneElement(element as ReactElement, undefined, highlighted);
}

export {
  isGroup,
  doesOptionMatch,
  shouldOptionBeDisabled,
  flattenGroupWithDisabled,
  flattenItemsWithDisabled,
  shouldAddNewElement,
  getFlatItemsWithDisabled,
  highlightInElement,
};
