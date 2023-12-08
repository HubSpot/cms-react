[API](../index.md) > BaseField

# Type alias: BaseField

> **BaseField**: `object`

## Type declaration

### `advancedVisibility`

**advancedVisibility**?: [`AdvancedVisibility`](type-alias.AdvancedVisibility.md)

***

### `displayWidth`

**displayWidth**?: `string`

***

### `helpText`

**helpText**?: `string`

***

### `id`

**id**?: `string`

***

### `inheritedValueDefaultValuePath`

**inheritedValueDefaultValuePath**?: `string`

***

### `inheritedValuePropertyValuePaths`

**inheritedValuePropertyValuePaths**?: `object`

***

### `inlineHelpText`

**inlineHelpText**?: `string` \| `null`

***

### `label`

**label**: `string`

***

### `locked`

**locked**?: `boolean`

***

### `name`

**name**: `string`

***

### `occurrence`

**occurrence**?: `object`

> #### `occurrence.default`
>
> **default**?: `number` \| `null`
>
> #### `occurrence.max`
>
> **max**?: `number` \| `null`
>
> #### `occurrence.min`
>
> **min**: `number`
>
> #### `occurrence.sorting_label_field`
>
> **sorting\_label\_field**?: `string`
>
>

***

### `propertyAliasesPaths`

**propertyAliasesPaths**?: `object`

***

### `required`

**required**?: `boolean`

***

### `sortable`

**sortable**?: `boolean`

***

### `visibility`

**visibility**?: `object`

> #### `visibility.access`
>
> **access**?: \{
> `gates`: `string`[];
> `operator`: `"HAS_ALL"` \| `"HAS_ANY"` \| `"HAS_NONE"`;
> `scopes`: `string`[];
> } \| `null`
>
> #### `visibility.controlling_field`
>
> **controlling\_field**?: `string` \| `null`
>
> #### `visibility.controlling_field_path`
>
> **controlling\_field\_path**?: `string` \| `null`
>
> #### `visibility.controlling_value_regex`
>
> **controlling\_value\_regex**?: `string` \| `null`
>
> #### `visibility.hidden_subfields`
>
> **hidden\_subfields**?: \{} \| `null`
>
> #### `visibility.operator`
>
> **operator**?: `"NOT_EQUAL"` \| `"EQUAL"` \| `"EMPTY"` \| `"NOT_EMPTY"` \| `"MATCHES_REGEX"` \| `null`
>
>

***

### `visibilityRules`

**visibilityRules**?: `"SIMPLE"` \| `"ADVANCED"`

## Source

fieldTypes.ts:3
