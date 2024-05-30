import {
  BooleanField,
  ChoiceField,
  ModuleFields,
  TextField,
} from '@hubspot/cms-components/fields';

export const fields = (
  <ModuleFields>
    <ChoiceField
      name="pokemon"
      label="Pokemon"
      default={'mewtwo'}
      choices={[
        ['bulbasaur', 'Bulbasaur'],
        ['eevee', 'Eevee'],
        ['pikachu', 'Pikachu'],
        ['mew', 'Mew'],
        ['mewtwo', 'Mewtwo'],
        ['squirtle', 'Squirtle'],
        ['charizard', 'Charizard'],
      ]}
      visibility={{
        controlling_field_path: 'useCustomFetchUrl',
        controlling_value_regex: 'false',
        operator: 'EQUAL',
      }}
    ></ChoiceField>

    <TextField
      name="fetchUrl"
      label="Fetch URL"
      default="https://swapi.dev/api/people/1/"
      visibility={{
        controlling_field_path: 'useCustomFetchUrl',
        controlling_value_regex: 'true',
        operator: 'EQUAL',
      }}
    />

    <BooleanField
      name="useCustomFetchUrl"
      label="Use custom fetch URL"
      default={false}
    />

    <ChoiceField
      name="libs"
      label="Fetch libraries"
      default={['graphql-request']}
      multiple={true}
      choices={[
        ['axios', 'axios'],
        ['graphql-request', 'graphql-request'],
      ]}
      visibility={{
        controlling_field_path: 'useCustomFetchUrl',
        controlling_value_regex: 'false',
        operator: 'EQUAL',
      }}
    ></ChoiceField>
  </ModuleFields>
);
