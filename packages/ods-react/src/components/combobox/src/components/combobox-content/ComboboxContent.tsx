import { Combobox as VendorCombobox, useComboboxContext } from '@ark-ui/react/combobox';
import { Portal } from '@ark-ui/react/portal';
import classNames from 'classnames';
import { type ComponentPropsWithRef, type FC, type JSX, forwardRef, useContext, useEffect, useRef } from 'react';
import { type ComboboxCustomGroupRendererArg, type ComboboxGroupItem, type ComboboxOptionItem, useCombobox } from '../../context/combobox';
import { ComboboxContext } from '../../context/combobox';
import { isGroup } from '../../controller/combobox';
import { ComboboxGroup } from '../combobox-group/ComboboxGroup';
import { ComboboxOption } from '../combobox-option/ComboboxOption';
import { type ComboboxCustomOptionRendererArg } from '../combobox-option/ComboboxOption';
import style from './comboboxContent.module.scss';

interface ComboboxContentProp extends ComponentPropsWithRef<'div'> {
  customGroupRenderer?: (arg: ComboboxCustomGroupRendererArg) => JSX.Element;
  customOptionRenderer?: (arg: ComboboxCustomOptionRendererArg) => JSX.Element;
}

const ComboboxContent: FC<ComboboxContentProp> = forwardRef(({
  className,
  customGroupRenderer,
  customOptionRenderer,
  ...props
}, ref): JSX.Element => {
  const { collection } = useComboboxContext();
  const { filteredItems } = useCombobox();
  const { setPlacement } = useContext(ComboboxContext);
  const localRef = useRef<HTMLDivElement>(null);
  const contentRef = (ref as React.RefObject<HTMLDivElement>) || localRef;

  useEffect(() => {
    const node = contentRef.current;
    if (!node || !setPlacement) {
      return;
    }
    const update = (): void => setPlacement(node.getAttribute('data-placement') || 'bottom-start');
    const observer = new MutationObserver(update);
    observer.observe(node, { attributeFilter: ['data-placement'], attributes: true });
    update();
    return () => observer.disconnect();
  }, [contentRef, setPlacement]);

  return (
    <Portal>
      <VendorCombobox.Positioner>
        <VendorCombobox.Content
          className={ classNames(style['combobox-content'], className) }
          data-empty={ collection.size === 0 }
          ref={ contentRef }
          { ...props }>
          <VendorCombobox.List>
            {filteredItems.map((item) =>
              isGroup(item)
                ? <ComboboxGroup
                  customGroupRenderer={ customGroupRenderer }
                  customOptionRenderer={ customOptionRenderer }
                  item={ item as ComboboxGroupItem }
                  key={ (item as ComboboxGroupItem).label } />
                : <ComboboxOption
                  customOptionRenderer={ customOptionRenderer }
                  item={ item as ComboboxOptionItem }
                  key={ (item as ComboboxOptionItem).value }
                />,
            )}
          </VendorCombobox.List>
        </VendorCombobox.Content>
      </VendorCombobox.Positioner>
    </Portal>
  );
});

ComboboxContent.displayName = 'ComboboxContent';

export {
  ComboboxContent,
  type ComboboxContentProp,
};
