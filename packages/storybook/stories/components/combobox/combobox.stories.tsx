import { type Meta, type StoryObj } from '@storybook/react';
import React from 'react';
import {
  Combobox,
  ComboboxContent,
  ComboboxControl,
  ComboboxControlProp,
  type ComboboxCustomOptionRendererArg,
  ComboboxLabel,
  type ComboboxProp,
} from '../../../../ods-react/src/components/combobox/src';
import { CONTROL_CATEGORY } from '../../../src/constants/controls.ts';
import { excludeFromDemoControls, orderControls } from '../../../src/helpers/controls.ts';
import { FormField } from '../../../../ods-react/src/components/form-field/src/components/form-field/FormField.tsx';

type Story = StoryObj<ComboboxProp>;
type DemoArg = Partial<ComboboxProp> & Partial<ComboboxControlProp> & {
  label?: string,
};

const meta: Meta<ComboboxProp> = {
  argTypes: excludeFromDemoControls(['defaultValue', 'items', 'invalid', 'name', 'onInputValueChange', 'onValueChange', 'required', 'value']),
  component: Combobox,
  subcomponents: { ComboboxContent, ComboboxControl, ComboboxLabel },
  title: 'ODS Components/Form elements/Combobox',
};

export default meta;

export const Demo: StoryObj = {
  render: (arg: DemoArg) => (
    <Combobox
      items={ [
        { label: 'Dog', value: 'dog' },
        { label: 'Cat', value: 'cat' },
        { label: 'Hamster', value: 'hamster' },
        { label: 'Parrot', value: 'parrot' },
        { label: 'Spider', value: 'spider' },
        { label: 'Goldfish', value: 'goldfish' },
      ] }
      addNewElementLabel={ arg.addNewElementLabel }
      allowNewElement={ arg.allowNewElement }
      defaultValue={ arg.defaultValue }
      disabled={ arg.disabled }
      highlightResults={ arg.highlightResults }
      noResultLabel={ arg.noResultLabel }
      readOnly={ arg.readOnly }
    >
      <ComboboxLabel>
        { arg.label }
      </ComboboxLabel>
      <ComboboxControl clearable={ arg.clearable } placeholder={ arg.placeholder } loading={ arg.loading } />
      <ComboboxContent />
    </Combobox>
  ),
  argTypes: orderControls({
    addNewElementLabel: {
      table: {
        category: CONTROL_CATEGORY.general,
      },
      control: 'text',
    },
    allowNewElement: {
      table: {
        category: CONTROL_CATEGORY.general,
      },
      control: 'boolean',
    },
    clearable: {
      table: {
        category: CONTROL_CATEGORY.general,
      },
      control: 'boolean',
    },
    defaultValue: {
      table: {
        category: CONTROL_CATEGORY.general,
      },
      control: 'text',
    },
    disabled: {
      table: {
        category: CONTROL_CATEGORY.general,
      },
      control: 'boolean',
    },
    highlightResults: {
      table: {
        category: CONTROL_CATEGORY.general,
      },
      control: 'boolean',
    },
    invalid: {
      table: {
        category: CONTROL_CATEGORY.general,
      },
      control: 'boolean',
    },
    label: {
      table: {
        category: CONTROL_CATEGORY.slot,
      },
      control: 'text',
    },
    loading: {
      table: {
        category: CONTROL_CATEGORY.general,
      },
      control: 'boolean',
    },
    noResultLabel: {
      table: {
        category: CONTROL_CATEGORY.general,
      },
      control: 'text',
    },
    placeholder: {
      table: {
        category: CONTROL_CATEGORY.slot,
      },
      control: 'text',
    },
    readOnly: {
      table: {
        category: CONTROL_CATEGORY.general,
      },
      control: 'boolean',
    },
  }),
  args: {
    label: 'My combobox',
    placeholder: 'Start typing',
  },
};

export const Default: Story = {
  tags: ['!dev'],
  render: ({}) => (
    <Combobox
      items={ [
        { label: 'Dog', value: 'dog' },
        { label: 'Cat', value: 'cat' },
        { label: 'Hamster', value: 'hamster' },
        { label: 'Parrot', value: 'parrot' },
        { label: 'Spider', value: 'spider' },
        { label: 'Goldfish', value: 'goldfish' },
      ] }>
      <ComboboxControl />
      <ComboboxContent />
    </Combobox>
  ),
};

export const Overview: Story = {
  tags: ['!dev'],
  render: ({}) => (
    <Combobox
      items={ [
        { label: 'Dog', value: 'dog' },
        { label: 'Cat', value: 'cat' },
        { label: 'Hamster', value: 'hamster' },
        { label: 'Parrot', value: 'parrot' },
        { label: 'Spider', value: 'spider' },
        { label: 'Goldfish', value: 'goldfish' },
      ] }>
      <ComboboxControl placeholder={ 'Combobox' } />
      <ComboboxContent />
    </Combobox>
  ),
};

export const Clearable: Story = {
  tags: ['!dev'],
  render: ({}) => (
    <Combobox
      items={ [
        { label: 'Dog', value: 'dog' },
        { label: 'Cat', value: 'cat' },
        { label: 'Hamster', value: 'hamster' },
        { label: 'Parrot', value: 'parrot' },
        { label: 'Spider', value: 'spider' },
        { label: 'Goldfish', value: 'goldfish' },
      ] }>
      <ComboboxControl placeholder={ 'Combobox' } clearable />
      <ComboboxContent />
    </Combobox>
  ),
};

export const Disabled: Story = {
  tags: ['!dev'],
  render: ({}) => (
    <Combobox
      disabled
      items={ [
        { label: 'Dog', value: 'dog' },
        { label: 'Cat', value: 'cat' },
        { label: 'Hamster', value: 'hamster' },
        { label: 'Parrot', value: 'parrot' },
        { label: 'Spider', value: 'spider' },
        { label: 'Goldfish', value: 'goldfish' },
      ] }>
      <ComboboxControl placeholder={ 'Combobox' } />
      <ComboboxContent />
    </Combobox>
  ),
};

export const ItemDisabled: Story = {
  tags: ['!dev'],
  render: ({}) => (
    <Combobox
      disabled
      items={ [
        { label: 'Dog', value: 'dog', disabled: true },
        { label: 'Cat', value: 'cat' },
        { label: 'Hamster', value: 'hamster' },
        { label: 'Parrot', value: 'parrot' },
        { label: 'Spider', value: 'spider' },
        { label: 'Goldfish', value: 'goldfish' },
      ] }>
      <ComboboxControl placeholder={ 'Combobox' } />
      <ComboboxContent />
    </Combobox>
  ),
};

export const Readonly: Story = {
  tags: ['!dev'],
  render: ({}) => (
    <Combobox
      items={ [
        { label: 'Dog', value: 'dog', disabled: true },
        { label: 'Cat', value: 'cat' },
        { label: 'Hamster', value: 'hamster' },
        { label: 'Parrot', value: 'parrot' },
        { label: 'Spider', value: 'spider' },
        { label: 'Goldfish', value: 'goldfish' },
      ] }
      readOnly>
      <ComboboxControl placeholder={ 'Combobox' } />
      <ComboboxContent />
    </Combobox>
  ),
};

export const Group: Story = {
  tags: ['!dev'],
  render: ({}) => (
    <Combobox
      items={ [
        {
          label: 'Europe',
          options: [
            { label: 'France', value: 'fr' },
            { label: 'Germany', value: 'de', disabled: true },
            { label: 'Italy', value: 'it' },
          ],
        },
        {
          label: 'Asia', disabled: true,
          options: [
            { label: 'China', value: 'cn' },
            { label: 'Japan', value: 'jp' },
            { label: 'Russia', value: 'ru' },
          ],
        },
        { label: 'World', value: 'world' },
      ] }>
      <ComboboxControl placeholder={ 'Combobox' } />
      <ComboboxContent />
    </Combobox>
  ),
};

export const CustomItems: Story = {
  tags: ['!dev'],
  render: ({}) => {
    const items = [
      { label: 'Dog', value: 'dog', customRendererData: { extra: 'mammal' } },
      { label: 'Cat', value: 'cat', customRendererData: { extra: 'mammal' } },
      { label: 'Hamster', value: 'hamster', customRendererData: { extra: 'rodent' } },
      { label: 'Parrot', value: 'parrot', customRendererData: { extra: 'bird' } },
      { label: 'Spider', value: 'spider', customRendererData: { extra: 'arachnid' } },
      { label: 'Goldfish', value: 'goldfish', customRendererData: { extra: 'fish' } },
    ];

    function highlightLabel(label: string, query: string) {
      if (!query) {
        return label;
      }
      const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
      const parts = label.split(regex);
      return parts.map((part, i) =>
        regex.test(part)
          ? <span key={ i } style={ { backgroundColor: 'red' } }>{ part }</span>
          : part,
      );
    }

    const customOptionRenderer = ({ label, customData, highlightQuery }: ComboboxCustomOptionRendererArg) => (
      <div>
        { customData?.isNew && typeof customData.displayLabel === 'string' ? customData.displayLabel : highlightLabel(label, highlightQuery || '') }
        { customData && typeof customData.extra === 'string' ? <em> ({ customData.extra })</em> : null }
      </div>
    );

    return (
      <Combobox
        items={ items }
        highlightResults
      >
        <ComboboxLabel>Avec highlight + custom renderer</ComboboxLabel>
        <ComboboxControl placeholder="Tapez pour filtrer et surligner" />
        <ComboboxContent customOptionRenderer={ customOptionRenderer } />
      </Combobox>
    );
  },
}

export const InFormField: Story = {
  tags: ['!dev'],
  render: ({}) => (
    <FormField>
      <Combobox
        items={ [
          { label: 'Dog', value: 'dog' },
          { label: 'Cat', value: 'cat' },
        ] }>
        <ComboboxControl placeholder={ 'Combobox' } />
        <ComboboxContent />
      </Combobox>
    </FormField>
  ),
}

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = React.useState<string | undefined>('dog');
    return (
      <>
        <Combobox
          items={[
            { label: 'Dog', value: 'dog' },
            { label: 'Cat', value: 'cat' },
            { label: 'Hamster', value: 'hamster' },
            { label: 'Parrot', value: 'parrot' },
            { label: 'Spider', value: 'spider' },
            { label: 'Goldfish', value: 'goldfish' },
          ]}
          value={value}
          onValueChange={details => setValue(details.value?.[0])}
        >
          <ComboboxLabel>Controlled combobox</ComboboxLabel>
          <ComboboxControl placeholder="Select an animal" />
          <ComboboxContent />
        </Combobox>
        <div style={{ marginTop: 8 }}>
          <strong>Selected value:</strong> {value ?? 'None'}
        </div>
      </>
    );
  },
};
