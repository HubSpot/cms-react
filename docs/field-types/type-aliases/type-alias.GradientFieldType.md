[API](../index.md) > GradientFieldType

# Type alias: GradientFieldType

> **GradientFieldType**: [`BaseField`](type-alias.BaseField.md) & \{
  `default`: \{
    `color`: [`GradientColorType`](type-alias.GradientColorType.md)[];
    `side_or_corner`: \{
      `horizontalSide`: `"LEFT"` \| `"RIGHT"`;
      `verticalSide`: `"TOP"` \| `"BOTTOM"`;
    };
  };
  `type`: `"gradient"`;
 }

> ## `GradientFieldType.default`
>
> **default**?: `object`
>
> > ### `default.color`
> >
> > **color**?: [`GradientColorType`](type-alias.GradientColorType.md)[]
> >
> > ### `default.side_or_corner`
> >
> > **side\_or\_corner**?: `object`
> >
> > > #### `side\_or\_corner.horizontalSide`
> > >
> > > **horizontalSide**?: `"LEFT"` \| `"RIGHT"`
> > >
> > > #### `side\_or\_corner.verticalSide`
> > >
> > > **verticalSide**?: `"TOP"` \| `"BOTTOM"`
> > >
> > >
> >
> >
>
> ## `GradientFieldType.type`
>
> **type**: `"gradient"`
>
>

## Source

fieldTypes.ts:269
