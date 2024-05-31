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
      default={'pikachu'}
      choices={[
        ['bulbasaur', 'Bulbasaur'],
        ['charizard', 'Charizard'],
        ['eevee', 'Eevee'],
        ['mew', 'Mew'],
        ['mewtwo', 'Mewtwo'],
        ['pikachu', 'Pikachu'],
        ['squirtle', 'Squirtle'],
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
      name="dataFetchingLib"
      label="Fetch libraries"
      default={'graphql-request'}
      multiple={false}
      choices={[
        ['axios', 'axios'],
        ['fetch', 'fetch (needs node 18.x)'],
        ['graphql-request', 'graphql-request'],
        ['nodeFetchCache', 'nodeFetchCache (fs cache)'],
      ]}
      visibility={{
        controlling_field_path: 'useCustomFetchUrl',
        controlling_value_regex: 'false',
        operator: 'EQUAL',
      }}
    ></ChoiceField>
  </ModuleFields>
);
