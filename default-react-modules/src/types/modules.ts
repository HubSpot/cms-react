type HostTemplateTypes =
  | 'BLOG_LISTING'
  | 'BLOG_POST'
  | 'PAGE'
  | 'EMAIL'
  | 'NONE';
type Categories =
  | 'blog'
  | 'forms_and_buttons'
  | 'media'
  | 'functionality'
  | 'commerce'
  | 'design'
  | 'body_content'
  | 'text';
type ModuleAsset = {
  path: String;
};
type Placeholder = {
  show_module_icon: Boolean;
  title: String;
  description: String;
};
type ModuleTag = {
  name: String;
  source: String;
};

export type ModuleMeta = {
  label: string;
  host_template_types: HostTemplateTypes[];
  icon: string;
  categories: Categories[];
  is_available_for_new_content?: Boolean;
  global?: Boolean;
  css_assets?: ModuleAsset[];
  js_assets?: ModuleAsset[];
  placeholder?: Placeholder;
  master_language?: String;
  content_tag?: ModuleTag[];
};
