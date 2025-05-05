import { DatePicker, useDatePickerContext } from '@ark-ui/react/date-picker';
import { useFieldContext } from '@ark-ui/react/field';
import classNames from 'classnames';
import { type ComponentPropsWithRef, type FC, type JSX, forwardRef } from 'react';
import { ICON_NAME, Icon } from '../../../../icon/src';
import { Input } from '../../../../input/src';
import style from './datepickerControl.module.scss';

interface DatepickerControlProp extends ComponentPropsWithRef<'input'> {
  clearable?: boolean,
  loading?: boolean,
}

const DatepickerControl: FC<DatepickerControlProp> = forwardRef(({
  className,
  clearable,
  loading,
  ...props
}, ref): JSX.Element => {
  const { getInputProps, open, setOpen } = useDatePickerContext();
  const formFieldContext = useFieldContext();
  const { disabled, readOnly } = getInputProps();

  function onControlClick(): void {
    if (!disabled && !readOnly) {
      setOpen(true);
    }
  }

  return (
    <DatePicker.Control
      className={ classNames(style['datepicker-control'], className) }
      onClick={ onControlClick }>
      <DatePicker.Input
        asChild
        className={ classNames(
          style['datepicker-control__input'],
          { [style['datepicker-control__input--open']]: open },
        )}
        ref={ ref }
        { ...props }>
        <Input
          clearable={ clearable }
          loading={ loading }
          required={ formFieldContext?.required } />
      </DatePicker.Input>

      <Icon
        className={ style['datepicker-control__icon'] }
        name={ ICON_NAME.calendar } />
    </DatePicker.Control>
  );
});

DatepickerControl.displayName = 'DatepickerControl';

export {
  DatepickerControl,
  type DatepickerControlProp,
};
