import {
  FieldGroup,
  ModuleFields,
  TextField,
  FontField,
  SpacingField,
  BlogField,
  ChoiceField,
  NumberField,
} from '@hubspot/cms-components/fields';

export const fields = (
  <ModuleFields>
    <BlogField
      label="Select blog to display"
      name="selectBlog"
      propertyAliasesPaths={{ selectBlog: ['select_blog'] }}
    />
    <ChoiceField
      label="Sort posts by"
      name="listingType"
      display="select"
      placeholder="Search"
      choices={[
        ['recent', 'Most recent'],
        ['popular_all_time', 'Most popular - all time'],
        ['popular_past_year', 'Most popular - past year'],
        ['popular_past_six_months', 'Most popular - past six months'],
        ['popular_past_month', 'Most popular - past month'],
      ]}
      propertyAliasesPaths={{ listingType: ['listing_type'] }}
      default="recent"
    />
    <ChoiceField
      label="Choose what shows in your feed"
      name="displayForEachListItem"
      display="checkbox"
      multiple={true}
      reorderingEnabled={false}
      choices={[
        ['image', 'Image'],
        ['title', 'Title'],
        ['authorName', 'Author name'],
        ['publishDate', 'Publish date'],
      ]}
      default={['title', 'authorName', 'publishDate']}
    />
    <NumberField
      label="Maximum blog posts to list"
      name="maxLinks"
      min={1}
      max={20}
      step={1}
      propertyAliasesPaths={{ maxLinks: ['max_links'] }}
      default={5}
    />
    <TextField
      label="Posts heading"
      name="postsHeading"
      default="Featured posts"
      propertyAliasesPaths={{ heading: ['list_title'] }}
    />
    <ChoiceField
      name="headingLevel"
      label="Heading level"
      display="select"
      choices={[
        ['h1', 'H1'],
        ['h2', 'H2'],
        ['h3', 'H3'],
        ['h4', 'H4'],
        ['h5', 'H5'],
        ['h6', 'H6'],
      ]}
      default="h2"
    />
    <FieldGroup name="groupStyle" label="Styles" tab="STYLE">
      <FieldGroup name="groupLayout" label="Layout">
        <ChoiceField
          name="style"
          label="Style"
          display="select"
          choices={[
            ['tiles', 'Tiles'],
            ['minimal', 'Minimal'],
          ]}
          default="minimal"
        />
      </FieldGroup>
      <FieldGroup label="Heading" name="groupHeading">
        <FontField label="Font" name="font" />
      </FieldGroup>
      <FieldGroup label="Title" name="groupTitle">
        <FontField
          label="Font"
          name="font"
          default={{
            font: '',
            styles: { 'font-weight': 'bold' },
          }}
        />
        <SpacingField
          label="Spacing"
          name="spacing"
          visibility={{ hidden_subfields: { padding: 'true' } }}
          default={{
            margin: {
              bottom: {
                value: 20,
                units: 'px',
              },
            },
          }}
        />
        <FontField
          label="Hover font"
          name="hoverFont"
          default={{
            font: '',
            styles: { 'font-weight': 'bold' },
          }}
        />
      </FieldGroup>
      <FieldGroup label="Author" name="groupAuthor">
        <FontField label="Font" name="font" />
      </FieldGroup>
      <FieldGroup label="Publish date" name="groupPublishDate">
        <FontField label="Font" name="font" />
      </FieldGroup>
    </FieldGroup>
  </ModuleFields>
);
