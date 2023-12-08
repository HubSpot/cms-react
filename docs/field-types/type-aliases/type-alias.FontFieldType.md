[API](../index.md) > FontFieldType

# Type alias: FontFieldType

> **FontFieldType**: [`BaseField`](type-alias.BaseField.md) & \{
  `default`: \{
    `color`: `string`;
    `fallback`: `string`;
    `font`: `string`;
    `font_set`: `"DEFAULT"` \| `"GOOGLE"` \| `"CUSTOM"`;
    `google_font_variants`: `FontVariants`[];
    `size`: `number`;
    `size_unit`: [`CssUnit`](type-alias.CssUnit.md);
    `styles`: \{
      `key`: `string`;
      `value`: `string`;
    };
    `variant`: `string`;
  };
  `loadExternalFonts`: `boolean`;
  `type`: `"font"`;
 }

> ## `FontFieldType.default`
>
> **default**?: `object`
>
> > ### `default.color`
> >
> > **color**?: `string`
> >
> > ### `default.fallback`
> >
> > **fallback**?: `string`
> >
> > ### `default.font`
> >
> > **font**: `string`
> >
> > ### `default.font_set`
> >
> > **font\_set**?: `"DEFAULT"` \| `"GOOGLE"` \| `"CUSTOM"`
> >
> > ### `default.google_font_variants`
> >
> > **google\_font\_variants**?: `FontVariants`[]
> >
> > ### `default.size`
> >
> > **size**?: `number`
> >
> > ### `default.size_unit`
> >
> > **size\_unit**?: [`CssUnit`](type-alias.CssUnit.md)
> >
> > ### `default.styles`
> >
> > **styles**?: `object`
> >
> > > #### `styles.key`
> > >
> > > **key**: `string`
> > >
> > > #### `styles.value`
> > >
> > > **value**: `string`
> > >
> > >
> >
> > ### `default.variant`
> >
> > **variant**?: `string`
> >
> >
>
> ## `FontFieldType.loadExternalFonts`
>
> **loadExternalFonts**?: `boolean`
>
> ## `FontFieldType.type`
>
> **type**: `"font"`
>
>

## Source

fieldTypes.ts:240
