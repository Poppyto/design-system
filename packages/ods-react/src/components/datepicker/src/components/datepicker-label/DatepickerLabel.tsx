import { DatePicker } from '@ark-ui/react/date-picker';
import classNames from 'classnames';
import { type ComponentPropsWithRef, type FC, type JSX, forwardRef } from 'react';
import style from './datepickerLabel.module.scss';

interface DatepickerLabelProp extends ComponentPropsWithRef<'label'> {}

const DatepickerLabel: FC<DatepickerLabelProp> = forwardRef(({
  children,
  className,
  ...props
}, ref): JSX.Element => {
  return (
    <DatePicker.Label
      className={ classNames(style['datepicker-label'], className) }
      ref={ ref }
      { ...props }>
      { children }
    </DatePicker.Label>
  );
});

DatepickerLabel.displayName = 'DatepickerLabel';

export {
  DatepickerLabel,
  type DatepickerLabelProp,
};
