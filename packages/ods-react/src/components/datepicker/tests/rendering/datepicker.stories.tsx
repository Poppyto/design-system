import { Datepicker } from '../../src';

export default {
  component: Datepicker,
  title: 'Tests rendering',
};

export const customStyle = () => (
  <Datepicker
    data-testid="custom-style"
    style={{ height: '42px' }} />
);

export const render = () => (
  <Datepicker data-testid="render" />
);
