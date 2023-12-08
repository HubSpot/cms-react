[API](../index.md) > BorderFieldType

# Type alias: BorderFieldType

> **BorderFieldType**: [`BaseField`](type-alias.BaseField.md) & \{
  `allowCustomBorderSides`: `boolean`;
  `default`: \{
    `border_radius`: \{
      `units`: [`CssUnit`](type-alias.CssUnit.md);
      `value`: `number`;
    };
    `bottom`: [`BorderSideType`](type-alias.BorderSideType.md);
    `left`: [`BorderSideType`](type-alias.BorderSideType.md);
    `right`: [`BorderSideType`](type-alias.BorderSideType.md);
    `top`: [`BorderSideType`](type-alias.BorderSideType.md);
  };
  `type`: `"border"`;
 }

> ## `BorderFieldType.allowCustomBorderSides`
>
> **allowCustomBorderSides**?: `boolean`
>
> ## `BorderFieldType.default`
>
> **default**?: `object`
>
> > ### `default.border_radius`
> >
> > **border\_radius**?: `object`
> >
> > > #### `border\_radius.units`
> > >
> > > **units**: [`CssUnit`](type-alias.CssUnit.md)
> > >
> > > #### `border\_radius.value`
> > >
> > > **value**: `number`
> > >
> > >
> >
> > ### `default.bottom`
> >
> > **bottom**?: [`BorderSideType`](type-alias.BorderSideType.md)
> >
> > ### `default.left`
> >
> > **left**?: [`BorderSideType`](type-alias.BorderSideType.md)
> >
> > ### `default.right`
> >
> > **right**?: [`BorderSideType`](type-alias.BorderSideType.md)
> >
> > ### `default.top`
> >
> > **top**?: [`BorderSideType`](type-alias.BorderSideType.md)
> >
> >
>
> ## `BorderFieldType.type`
>
> **type**: `"border"`
>
>

## Source

fieldTypes.ts:117
