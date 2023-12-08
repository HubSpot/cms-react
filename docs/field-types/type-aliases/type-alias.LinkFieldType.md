[API](../index.md) > LinkFieldType

# Type alias: LinkFieldType

> **LinkFieldType**: [`BaseField`](type-alias.BaseField.md) & \{
  `default`: \{
    `no_follow`: `boolean`;
    `open_in_new_tab`: `boolean`;
    `sponsored`: `boolean`;
    `url`: \{
      `content_id`: `number`;
      `href`: `string`;
      `type`: `UrlTypes`;
    };
    `user_generated_content`: `boolean`;
  };
  `placeholder`: `string`;
  `showAdvancedRelOptions`: `boolean`;
  `supportedTypes`: `UrlTypes`[];
  `type`: `"link"`;
 }

> ## `LinkFieldType.default`
>
> **default**?: `object`
>
> > ### `default.no_follow`
> >
> > **no\_follow**?: `boolean`
> >
> > ### `default.open_in_new_tab`
> >
> > **open\_in\_new\_tab**?: `boolean`
> >
> > ### `default.sponsored`
> >
> > **sponsored**?: `boolean`
> >
> > ### `default.url`
> >
> > **url**?: `object`
> >
> > > #### `url.content_id`
> > >
> > > **content\_id**: `number`
> > >
> > > #### `url.href`
> > >
> > > **href**: `string`
> > >
> > > #### `url.type`
> > >
> > > **type**: `UrlTypes`
> > >
> > >
> >
> > ### `default.user_generated_content`
> >
> > **user\_generated\_content**?: `boolean`
> >
> >
>
> ## `LinkFieldType.placeholder`
>
> **placeholder**?: `string`
>
> ## `LinkFieldType.showAdvancedRelOptions`
>
> **showAdvancedRelOptions**?: `boolean`
>
> ## `LinkFieldType.supportedTypes`
>
> **supportedTypes**?: `UrlTypes`[]
>
> ## `LinkFieldType.type`
>
> **type**: `"link"`
>
>

## Source

fieldTypes.ts:335
