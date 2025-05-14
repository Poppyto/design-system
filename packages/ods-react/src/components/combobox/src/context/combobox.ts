import { createContext, useContext } from 'react';

export type ComboboxOptionItem = {
  label: string;
  value: string;
  disabled?: boolean;
  customRendererData?: Record<string, unknown>;
};

export type ComboboxCustomItemRendererArg = {
  customData?: Record<string, unknown>;
  text: string;
};

export type ComboboxGroupItem = {
  customRendererData?: Record<string, unknown>;
  disabled?: boolean;
  label: string;
  options: ComboboxOptionItem[];
};

export type ComboboxItem = ComboboxOptionItem | ComboboxGroupItem;

export interface ComboboxContextType {
  filteredItems: ComboboxItem[];
  highlightResults: boolean;
  query: string;
  placement?: string;
  setPlacement?: (placement: string) => void;
}

export const ComboboxContext = createContext<ComboboxContextType>({
  filteredItems: [],
  highlightResults: false,
  placement: 'bottom-start',
  query: '',
  setPlacement: () => {},
});

export function useCombobox(): ComboboxContextType {
  return useContext(ComboboxContext);
}

export type ComboboxCustomGroupRendererArg = {
  label: string;
  customData?: Record<string, unknown>;
};