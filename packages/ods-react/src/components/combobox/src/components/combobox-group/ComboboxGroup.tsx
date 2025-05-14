import { Combobox as VendorCombobox } from '@ark-ui/react/combobox';
import classNames from 'classnames';
import { type FC, type JSX } from 'react';
import { type ComboboxCustomGroupRendererArg, type ComboboxGroupItem } from '../../context/combobox';
import { ComboboxOption, type ComboboxOptionProp } from '../combobox-option/ComboboxOption';
import style from './comboboxGroup.module.scss';

interface ComboboxGroupProp {
  customGroupRenderer?: (arg: ComboboxCustomGroupRendererArg) => JSX.Element;
  customOptionRenderer?: ComboboxOptionProp['customOptionRenderer'];
  item: ComboboxGroupItem;
}

const ComboboxGroup: FC<ComboboxGroupProp> = ({
  customGroupRenderer,
  customOptionRenderer,
  item,
}): JSX.Element => {
  return (
    <VendorCombobox.ItemGroup>
      <VendorCombobox.ItemGroupLabel className={ classNames(
        style['combobox-group'],
        { [style[ 'combobox-group--disabled']]: item.disabled },
      )}>
        {
          customGroupRenderer
            ? customGroupRenderer({
              customData: item.customRendererData,
              label: item.label,
            })
            : item.label
        }
      </VendorCombobox.ItemGroupLabel>
      {item.options.map((option) => (
        <ComboboxOption
          className={ style['combobox-group__option'] }
          customOptionRenderer={ customOptionRenderer }
          item={ option }
          key={ option.value }
        />
      ))}
    </VendorCombobox.ItemGroup>
  );
};

ComboboxGroup.displayName = 'ComboboxGroup';

export {
  ComboboxGroup,
  type ComboboxGroupProp,
};
