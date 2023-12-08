[API](../index.md) > EmbedFieldType

# Type alias: EmbedFieldType

> **EmbedFieldType**: [`BaseField`](type-alias.BaseField.md) & \{
  `default`: \{
    `embed_type`: `string`;
    `height`: `number`;
    `max_height`: `number`;
    `max_width`: `number`;
    `media_bridge_object`: \{};
    `oembed_response`: \{};
    `oembed_string`: `string`;
    `size_type`: `"auto"` \| `"auto_custom_max"` \| `"auto_full_width"` \| `"exact"`;
    `source_type`: `"oembed"` \| `"html"` \| `"media_bridge"`;
    `width`: `number`;
  };
  `resizeable`: `boolean`;
  `showPreview`: `boolean`;
  `supportedMediaBridgeProviders`: `number`[];
  `supportedOembedTypes`: (`"photo"` \| `"video"` \| `"link"` \| `"rich"`)[];
  `supportedSourceTypes`: (`"oembed"` \| `"html"` \| `"media_bridge"`)[];
  `type`: `"embed"`;
 }

> ## `EmbedFieldType.default`
>
> **default**?: `object`
>
> > ### `default.embed_type`
> >
> > **embed\_type**?: `string`
> >
> > ### `default.height`
> >
> > **height**?: `number`
> >
> > ### `default.max_height`
> >
> > **max\_height**?: `number`
> >
> > ### `default.max_width`
> >
> > **max\_width**?: `number`
> >
> > ### `default.media_bridge_object`
> >
> > **media\_bridge\_object**?: `object`
> >
> > ### `default.oembed_response`
> >
> > **oembed\_response**?: `object`
> >
> > ### `default.oembed_string`
> >
> > **oembed\_string**?: `string`
> >
> > ### `default.size_type`
> >
> > **size\_type**?: `"auto"` \| `"auto_custom_max"` \| `"auto_full_width"` \| `"exact"`
> >
> > ### `default.source_type`
> >
> > **source\_type**?: `"oembed"` \| `"html"` \| `"media_bridge"`
> >
> > ### `default.width`
> >
> > **width**?: `number`
> >
> >
>
> ## `EmbedFieldType.resizeable`
>
> **resizeable**?: `boolean`
>
> ## `EmbedFieldType.showPreview`
>
> **showPreview**?: `boolean`
>
> ## `EmbedFieldType.supportedMediaBridgeProviders`
>
> **supportedMediaBridgeProviders**: `number`[]
>
> ## `EmbedFieldType.supportedOembedTypes`
>
> **supportedOembedTypes**: (`"photo"` \| `"video"` \| `"link"` \| `"rich"`)[]
>
> ## `EmbedFieldType.supportedSourceTypes`
>
> **supportedSourceTypes**: (`"oembed"` \| `"html"` \| `"media_bridge"`)[]
>
> ## `EmbedFieldType.type`
>
> **type**: `"embed"`
>
>

## Source

fieldTypes.ts:188
