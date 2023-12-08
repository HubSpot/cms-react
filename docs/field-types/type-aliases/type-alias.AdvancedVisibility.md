[API](../index.md) > AdvancedVisibility

# Type alias: AdvancedVisibility

> **AdvancedVisibility**: `object`

## Type declaration

### `boolean_operator`

**boolean\_operator**: `"AND"` \| `"OR"`

***

### `children`

**children**?: [`AdvancedVisibility`](type-alias.AdvancedVisibility.md)[]

***

### `criteria`

**criteria**: \{
  `controlling_field_path`: `string`;
  `controlling_value_regex`: `string`;
  `operator`: `"NOT_EQUAL"` \| `"EQUAL"` \| `"EMPTY"` \| `"NOT_EMPTY"` \| `"MATCHES_REGEX"`;
 }[]

## Source

fieldTypes.ts:43
