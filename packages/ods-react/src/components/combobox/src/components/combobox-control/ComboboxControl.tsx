import { Combobox as VendorCombobox, useComboboxContext } from '@ark-ui/react/combobox';
import classNames from 'classnames';
import { type ComponentPropsWithRef, type FC, type JSX, forwardRef, useContext } from 'react';
import { Input } from '../../../../input/src';
import { ComboboxContext } from '../../context/combobox';
import style from './comboboxControl.module.scss';

interface ComboboxControlProp extends ComponentPropsWithRef<'button'> {
  clearable?: boolean;
  loading?: boolean;
  placeholder?: string;
}

const ComboboxControl: FC<ComboboxControlProp> = forwardRef(({
  className,
  clearable = false,
  loading = false,
  placeholder,
  ...props
}, ref): JSX.Element | null => {
  const context = useComboboxContext();
  const { placement } = useContext(ComboboxContext);
  if (!context) {
    console.warn('ComboboxControl must be used within a Combobox component');
    return null;
  }
  const { collection, setValue, setInputValue } = context;

  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === 'Enter') {
      const hasHighlighted = !!document.querySelector('[role="option"][data-highlighted]');
      if (!hasHighlighted) {
        event.preventDefault();
        event.stopPropagation();
      }
    }
  };

  const handleClear = (): void => {
    setValue && setValue([]);
    setInputValue && setInputValue('');
  };

  return (
    <VendorCombobox.Control
      className={ classNames(
        style['combobox-control'],
        placement?.startsWith('bottom') && style['combobox-control--open-bottom'],
        placement?.startsWith('top') && style['combobox-control--open-top'],
      ) }
    >
      <VendorCombobox.Trigger
        className={ classNames(style['combobox-control-trigger'], className) }
        data-empty={ collection.size === 0 }
        ref={ ref }
        { ...props }>
        <VendorCombobox.Input asChild>
          <Input
            className={ style['combobox-control-input'] }
            clearable={ clearable }
            loading={ loading }
            onKeyDown={ handleInputKeyDown }
            onClear={ handleClear }
            placeholder={ placeholder }
          />
        </VendorCombobox.Input>
      </VendorCombobox.Trigger>
    </VendorCombobox.Control>
  );
});

ComboboxControl.displayName = 'ComboboxControl';

export {
  ComboboxControl,
  type ComboboxControlProp,
};
