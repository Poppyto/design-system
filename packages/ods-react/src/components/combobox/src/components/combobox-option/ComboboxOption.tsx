import { Combobox as VendorCombobox } from '@ark-ui/react/combobox';
import classNames from 'classnames';
import { type FC, type JSX } from 'react';
import { useCombobox } from '../../context/combobox';
import { type ComboboxOptionItem } from '../../context/combobox';
import style from './comboboxOption.module.scss';

export type ComboboxCustomOptionRendererArg = {
  label: string;
  customData?: Record<string, unknown>;
  highlightQuery?: string;
};

interface ComboboxOptionProp {
  className?: string;
  customOptionRenderer?: (arg: ComboboxCustomOptionRendererArg) => JSX.Element;
  item: ComboboxOptionItem;
}

function escapeRegExp(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function highlightLabel(label: string, query: string): JSX.Element {
  if (!query) {
    return <>{label}</>;
  }
  const safeQuery = escapeRegExp(query);
  const regex = new RegExp(`(${safeQuery})`, 'gi');
  const parts = label.split(regex);
  return <>{parts.map((part, i) =>
    regex.test(part)
      ? <span key={i} className={style['combobox-option__highlight']}>{part}</span>
      : part,
  )}</>;
}

const ComboboxOption: FC<ComboboxOptionProp> = ({
  className,
  customOptionRenderer,
  item,
}): JSX.Element => {
  const { highlightResults, query } = useCombobox();
  let content: JSX.Element | string;
  if (item.customRendererData?.isNew) {
    content = String(item.customRendererData.displayLabel);
  } else if (customOptionRenderer) {
    content = customOptionRenderer({
      customData: item.customRendererData,
      highlightQuery: highlightResults ? query : undefined,
      label: item.label,
    });
  } else if (highlightResults && query) {
    content = highlightLabel(item.label, query);
  } else {
    content = item.label;
  }
  return (
    <VendorCombobox.Item
      className={ classNames(
        style['combobox-option'],
        { [style['combobox-option--disabled']]: item.disabled },
        className,
      )}
      item={ item }>
      <VendorCombobox.ItemText>
        {content}
      </VendorCombobox.ItemText>
    </VendorCombobox.Item>
  );
};

ComboboxOption.displayName = 'ComboboxOption';

export {
  ComboboxOption,
  type ComboboxOptionProp,
};
