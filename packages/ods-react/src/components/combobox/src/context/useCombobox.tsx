import { type ReactNode, createContext, useContext } from 'react';

interface ComboboxContextType {
  customOptionRenderer?: (arg: ComboboxCustomOptionRendererArg) => JSX.Element;
  highlightResults?: boolean;
  noResultLabel?: string;
}

type ComboboxCustomGroupRendererArg = {
  label: string;
  customData?: Record<string, unknown>;
};

type ComboboxCustomOptionRendererArg = {
  label: string;
  customData?: Record<string, unknown>;
};

type ComboboxGroupItem = {
  customRendererData?: Record<string, unknown>;
  disabled?: boolean;
  label: string;
  options: ComboboxOptionItem[];
};

type ComboboxItem = ComboboxOptionItem | ComboboxGroupItem;

type ComboboxOptionItem = {
  label: string;
  value: string;
  disabled?: boolean;
  customRendererData?: Record<string, unknown>;
  /** @internal */
  isNew?: boolean;
  /** @internal */
  isInGroup?: boolean;
};

interface ComboboxProviderProps {
  children: ReactNode;
  customOptionRenderer?: (arg: ComboboxCustomOptionRendererArg) => JSX.Element;
  highlightResults?: boolean;
  inputValue?: string;
  noResultLabel?: string;
}

const ComboboxContext = createContext<ComboboxContextType>({});

function useCombobox(): ComboboxContextType {
  return useContext(ComboboxContext);
}

const ComboboxProvider: React.FC<ComboboxProviderProps> = ({
  children,
  customOptionRenderer,
  highlightResults,
  noResultLabel,
}) => {
  return (
    <ComboboxContext.Provider value={ { customOptionRenderer, highlightResults, noResultLabel } }>
      { children }
    </ComboboxContext.Provider>
  );
};

export {
  ComboboxProvider,
  type ComboboxCustomGroupRendererArg,
  type ComboboxCustomOptionRendererArg,
  type ComboboxGroupItem,
  type ComboboxItem,
  type ComboboxOptionItem,
  useCombobox,
};
