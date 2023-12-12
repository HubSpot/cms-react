[API](../index.md) > FormFieldType

# Type alias: FormFieldType

> **FormFieldType**: [`BaseField`](type-alias.BaseField.md) & \{
  `allowInlineFormEditing`: `boolean`;
  `default`: \{
    `form_id`: `string`;
    `form_type`: `"HUBSPOT"` \| `"TICKET_FORM"`;
    `message`: `string`;
    `redirect_id`: `number`;
    `redirect_url`: `string`;
    `response_type`: `"inline"` \| `"redirect"`;
    `workflow_id`: `number`[];
  };
  `type`: `"form"`;
 }

> ## `FormFieldType.allowInlineFormEditing`
>
> **allowInlineFormEditing**?: `boolean`
>
> ## `FormFieldType.default`
>
> **default**?: `object`
>
> > ### `default.form_id`
> >
> > **form\_id**?: `string`
> >
> > ### `default.form_type`
> >
> > **form\_type**?: `"HUBSPOT"` \| `"TICKET_FORM"`
> >
> > ### `default.message`
> >
> > **message**?: `string`
> >
> > ### `default.redirect_id`
> >
> > **redirect\_id**?: `number`
> >
> > ### `default.redirect_url`
> >
> > **redirect\_url**?: `string`
> >
> > ### `default.response_type`
> >
> > **response\_type**?: `"inline"` \| `"redirect"`
> >
> > ### `default.workflow_id`
> >
> > **workflow\_id**?: `number`[]
> >
> >
>
> ## `FormFieldType.type`
>
> **type**: `"form"`
>
>

## Source

fieldTypes.ts:255
