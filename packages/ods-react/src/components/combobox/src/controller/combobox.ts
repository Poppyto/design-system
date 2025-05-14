import { type ComboboxItem } from '../context/combobox';

function isGroup(item: ComboboxItem): boolean {
  return !Object.prototype.hasOwnProperty.call(item, 'value');
}

export { isGroup };
