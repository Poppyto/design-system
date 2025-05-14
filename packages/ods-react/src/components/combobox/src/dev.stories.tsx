import { FormField } from '../../form-field/src';
import { Combobox, ComboboxContent, ComboboxControl, type ComboboxCustomOptionRendererArg, ComboboxLabel } from '.';
import style from './dev.module.css';
import { useMemo, useState } from 'react';
import { Combobox as ArkCombobox, createListCollection, Portal } from '@ark-ui/react';

export default {
  component: Combobox,
  title: 'Combobox dev',
};

export const Basic = () => {
  const initialItems = [
    { label: 'Dog', value: 'dog' },
    { label: 'Cat', value: 'cat' },
    { label: 'Hamster', value: 'hamster' },
    { label: 'Parrot', value: 'parrot' },
    { label: 'Spider', value: 'spider' },
    { label: 'Goldfish', value: 'goldfish' },
  ];

  const [items, setItems] = useState(initialItems);
  const collection = useMemo(() =>
    createListCollection({ items }),
    [items]
  );

  const handleInputChange = (details: { inputValue: string }) => {
    setItems(initialItems.filter(item =>
      item.label.toLowerCase().includes(details.inputValue.toLowerCase())
    ));
  };

  return (
    <ArkCombobox.Root
      collection={collection}
      onInputValueChange={handleInputChange}
    >
      <ArkCombobox.Label>Framework</ArkCombobox.Label>
      <ArkCombobox.Control>
        <ArkCombobox.Input placeholder="Select an animal" />
        <ArkCombobox.Trigger>▼</ArkCombobox.Trigger>
        <ArkCombobox.ClearTrigger>✕</ArkCombobox.ClearTrigger>
      </ArkCombobox.Control>
      <Portal>
        <ArkCombobox.Positioner>
          <ArkCombobox.Content>
            <ArkCombobox.List>
              {collection.items.map((item) => (
                <ArkCombobox.Item key={item.value} item={item}>
                  <ArkCombobox.ItemText>{item.label}</ArkCombobox.ItemText>
                  <ArkCombobox.ItemIndicator>✓</ArkCombobox.ItemIndicator>
                </ArkCombobox.Item>
              ))}
            </ArkCombobox.List>
          </ArkCombobox.Content>
        </ArkCombobox.Positioner>
      </Portal>
    </ArkCombobox.Root>
  );
};

export const CustomCSS = () => (
  <Combobox
    className={ style['custom-combobox'] }
    items={[
      { label: 'Dog', value:'dog' },
      { label: 'Cat', value:'cat' },
      { label: 'Hamster', value:'hamster' },
      { label: 'Parrot', value:'parrot' },
      { label: 'Spider', value:'spider' },
      { label: 'Goldfish', value:'goldfish' },
    ]}>
    <ComboboxLabel className={ style['custom-combobox-label'] }>Label</ComboboxLabel>
    <ComboboxControl className={ style['custom-combobox-control'] } />
    <ComboboxContent className={ style['custom-combobox-content'] } />
  </Combobox>
);

export const Default = () => (
  <Combobox
    items={[
      { label: 'Dog', value:'dog' },
      { label: 'Cat', value:'cat' },
      { label: 'Hamster', value:'hamster' },
      { label: 'Parrot', value:'parrot' },
      { label: 'Spider', value:'spider' },
      { label: 'Goldfish', value:'goldfish' },
    ]}>
    <ComboboxLabel>Label</ComboboxLabel>
    <ComboboxControl />
    <ComboboxContent />
  </Combobox>
);

export const Disabled = () => (
  <Combobox
    disabled
    items={[
      { label: 'Dog', value:'dog' },
      { label: 'Cat', value:'cat' },
      { label: 'Hamster', value:'hamster' },
      { label: 'Parrot', value:'parrot' },
      { label: 'Spider', value:'spider' },
      { label: 'Goldfish', value:'goldfish' },
    ]}>
    <ComboboxLabel>Label</ComboboxLabel>
    <ComboboxControl />
    <ComboboxContent />
  </Combobox>
);

export const Empty = () => (
  <Combobox items={[]}>
    <ComboboxLabel>Label</ComboboxLabel>
    <ComboboxControl />
    <ComboboxContent />
  </Combobox>
);

export const Groups = () => (
  <Combobox
    items={[
      {
        label: 'Europe',
        options: [
          { label: 'France', value: 'fr' },
          { label: 'Germany', value: 'de', disabled: true },
          { label: 'Italy', value: 'it' },
        ]
      },
      {
        label: 'Asia', disabled: true,
        options: [
          { label: 'China', value: 'cn' },
          { label: 'Japan', value: 'jp' },
          { label: 'Russia', value: 'ru' },
        ]
      },
      { label: 'World', value: 'world' },
    ]}>
    <ComboboxLabel>Label</ComboboxLabel>
    <ComboboxControl />
    <ComboboxContent />
  </Combobox>
);

export const InFormField = () => (
  <FormField>
    <Combobox
      items={[
        { label: 'Dog', value:'dog' },
        { label: 'Cat', value:'cat' },
        { label: 'Hamster', value:'hamster' },
        { label: 'Parrot', value:'parrot' },
        { label: 'Spider', value:'spider' },
        { label: 'Goldfish', value:'goldfish' },
      ]}>
      <ComboboxLabel>Label</ComboboxLabel>
      <ComboboxControl />
      <ComboboxContent />
    </Combobox>
  </FormField>
);

export const Placeholder = () => (
  <Combobox
    items={[
      { label: 'Dog', value:'dog' },
      { label: 'Cat', value:'cat' },
      { label: 'Hamster', value:'hamster', disabled: true },
      { label: 'Parrot', value:'parrot' },
      { label: 'Spider', value:'spider' },
      { label: 'Goldfish', value:'goldfish' },
    ]}>
    <ComboboxLabel>Label</ComboboxLabel>
    <ComboboxControl placeholder="Please select" />
    <ComboboxContent />
  </Combobox>
);

export const Readonly = () => (
  <Combobox
    readOnly
    items={[
      { label: 'Dog', value:'dog' },
      { label: 'Cat', value:'cat' },
      { label: 'Hamster', value:'hamster' },
      { label: 'Parrot', value:'parrot' },
      { label: 'Spider', value:'spider' },
      { label: 'Goldfish', value:'goldfish' },
    ]}>
    <ComboboxLabel>Label</ComboboxLabel>
    <ComboboxControl />
    <ComboboxContent />
  </Combobox>
);

export const FlexEnd = () => (
<div style={{ display: 'flex', height: '90vh', alignItems: 'flex-end' }}>
    <Combobox
      items={[
        { label: 'Dog', value:'dog' },
        { label: 'Cat', value:'cat' },
        { label: 'Hamster', value:'hamster', disabled: true },
        { label: 'Parrot', value:'parrot' },
        { label: 'Spider', value:'spider' },
        { label: 'Goldfish', value:'goldfish' },
      ]}>
      <ComboboxLabel>Multiple simple</ComboboxLabel>
      <ComboboxControl placeholder="Please select" />
      <ComboboxContent />
    </Combobox>
  </div>
);

export const HighlightWithCustomRenderer = () => {
  const items = [
    { label: 'Dog', value: 'dog', customRendererData: { extra: 'mammal' } },
    { label: 'Cat', value: 'cat', customRendererData: { extra: 'mammal' } },
    { label: 'Hamster', value: 'hamster', customRendererData: { extra: 'rodent' } },
    { label: 'Parrot', value: 'parrot', customRendererData: { extra: 'bird' } },
    { label: 'Spider', value: 'spider', customRendererData: { extra: 'arachnid' } },
    { label: 'Goldfish', value: 'goldfish', customRendererData: { extra: 'fish' } },
  ];

  function highlightLabel(label: string, query: string) {
    if (!query) return label;
    const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    const parts = label.split(regex);
    return parts.map((part, i) =>
      regex.test(part)
        ? <span key={i} className={style['highlight-custom']}>{part}</span>
        : part
    );
  }

  const customOptionRenderer = ({ label, customData, highlightQuery }: ComboboxCustomOptionRendererArg) => (
    <div>
      {customData?.isNew && typeof customData.displayLabel === 'string' ? customData.displayLabel : highlightLabel(label, highlightQuery || '')}
      {customData && typeof customData.extra === 'string' ? <em> ({customData.extra})</em> : null}
    </div>
  );

  return (
    <Combobox
      items={items}
      highlightResults
    >
      <ComboboxLabel>Avec highlight + custom renderer</ComboboxLabel>
      <ComboboxControl placeholder="Tapez pour filtrer et surligner" />
      <ComboboxContent customOptionRenderer={customOptionRenderer} />
    </Combobox>
  );
};

export const HighlightNative = () => {
  const items = [
    { label: 'Dog', value: 'dog' },
    { label: 'Cat', value: 'cat' },
    { label: 'Hamster', value: 'hamster' },
    { label: 'Parrot', value: 'parrot' },
    { label: 'Spider', value: 'spider' },
    { label: 'Goldfish', value: 'goldfish' },
  ];
  return (
    <Combobox
      items={items}
      highlightResults
    >
      <ComboboxLabel>Avec highlight natif</ComboboxLabel>
      <ComboboxControl placeholder="Tapez pour filtrer et surligner" />
      <ComboboxContent />
    </Combobox>
  );
};
