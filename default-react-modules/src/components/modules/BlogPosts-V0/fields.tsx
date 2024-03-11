import {
  FieldGroup,
  ModuleFields,
  BooleanField,
  TextField,
  ColorField,
  ChoiceField,
  NumberField,
  SpacingField,
  FontField,
  BorderField,
  AlignmentField,
  AdvancedVisibility,
  SpacingLimitType,
} from '@hubspot/cms-components/fields';

const paddingDefault: SpacingLimitType = {
  min: 0,
  max: 50,
  units: ['px'],
};

const paddingLimits = {
  top: paddingDefault,
  right: paddingDefault,
  bottom: paddingDefault,
  left: paddingDefault,
};

const marginDefault: SpacingLimitType = {
  min: 0,
  max: 200,
  units: ['px'],
};

const marginLimits = {
  top: marginDefault,
  right: marginDefault,
  bottom: marginDefault,
  left: marginDefault,
};

const showAlternateImageField: AdvancedVisibility = {
  boolean_operator: 'AND',
  criteria: [
    {
      controlling_field_path: 'displayForEachListItem',
      controlling_value_regex: 'image',
      operator: 'MATCHES_REGEX',
    },
    {
      controlling_field_path: 'layout',
      controlling_value_regex: 'sideBySide',
      operator: 'EQUAL',
    },
  ],
};

const showBackgroundImageField: AdvancedVisibility = {
  boolean_operator: 'AND',
  criteria: [
    {
      controlling_field_path: 'displayForEachListItem',
      controlling_value_regex: 'image',
      operator: 'MATCHES_REGEX',
    },
    {
      controlling_field_path: 'layout',
      controlling_value_regex: 'sideBySide',
      operator: 'NOT_EQUAL',
    },
  ],
};

const showBackgroundImageStyleField: AdvancedVisibility = {
  boolean_operator: 'AND',
  criteria: [
    {
      controlling_field_path: 'fullImage',
      controlling_value_regex: 'true',
      operator: 'EQUAL',
    },
    {
      controlling_field_path: 'displayForEachListItem',
      controlling_value_regex: 'image',
      operator: 'MATCHES_REGEX',
    },
  ],
};

const showImageStyleField: AdvancedVisibility = {
  boolean_operator: 'AND',
  criteria: [
    {
      controlling_field_path: 'fullImage',
      controlling_value_regex: 'false',
      operator: 'EQUAL',
    },
    {
      controlling_field_path: 'displayForEachListItem',
      controlling_value_regex: 'image',
      operator: 'MATCHES_REGEX',
    },
  ],
};

const showAuthorStyleField: AdvancedVisibility = {
  boolean_operator: 'OR',
  criteria: [
    {
      controlling_field_path: 'displayForEachListItem',
      controlling_value_regex: 'authorImage',
      operator: 'MATCHES_REGEX',
    },
    {
      controlling_field_path: 'displayForEachListItem',
      controlling_value_regex: 'authorName',
      operator: 'MATCHES_REGEX',
    },
  ],
};

const showBackgroundStyleField: AdvancedVisibility = {
  boolean_operator: 'OR',
  criteria: [
    {
      controlling_field_path: 'fullImage',
      controlling_value_regex: 'false',
      operator: 'EQUAL',
    },
    {
      controlling_field_path: 'layout',
      controlling_value_regex: 'sideBySide',
      operator: 'EQUAL',
    },
  ],
};

export const fields = (
  <ModuleFields>
    <ChoiceField
      label="Layout"
      name="layout"
      display="select"
      choices={[
        ['grid', 'Basic Grid'],
        ['singleColumn', 'Single column'],
        ['sideBySide', 'Side by side'],
      ]}
      default="grid"
      required
    />
    <NumberField
      label="Columns"
      name="columns"
      helpText="Number of posts per row"
      visibility={{
        controlling_field: 'layout',
        controlling_value_regex: 'grid',
        operator: 'EQUAL',
      }}
      display="text"
      max={4}
      min={2}
      step={1}
      required
      default={3}
    />
    <BooleanField
      label="Alternate Image"
      name="alternateImage"
      inlineHelpText="When turned on this setting will make the blog post image alternate between appearing on the left and on the right"
      visibilityRules="ADVANCED"
      advancedVisibility={showAlternateImageField}
      display="toggle"
      default={false}
    />
    <BooleanField
      label="Use image as background"
      name="fullImage"
      visibilityRules="ADVANCED"
      advancedVisibility={showBackgroundImageField}
      display="toggle"
      default={false}
    />
    <ChoiceField
      label="Display on each blog post"
      name="displayForEachListItem"
      helpText="The publish date format can be changed in blog settings. <a href='https://knowledge.hubspot.com/blog/manage-your-blog-template-and-settings#set-your-blog-s-date-formats' target='_blank' rel='noopener'>Learn more</a>"
      display="checkbox"
      multiple={true}
      reorderingEnabled={false}
      choices={[
        ['image', 'Image'],
        ['title', 'Title'],
        ['authorImage', 'Author image'],
        ['authorName', 'Author name'],
        ['tags', 'Tags'],
        ['publishDate', 'Publish date'],
        ['description', 'Description'],
        ['button', 'Button'],
      ]}
      default={[
        'image',
        'title',
        'authorImage',
        'authorName',
        'tags',
        'publishDate',
        'description',
        'button',
      ]}
    />
    <TextField
      name="buttonText"
      label="Button text"
      visibility={{
        controlling_field: 'displayForEachListItem',
        controlling_value_regex: 'button',
        operator: 'MATCHES_REGEX',
      }}
      required
      default="Read more"
    />
    <FieldGroup name="groupDefaultText" label="Default text" locked>
      <TextField
        label="Blog post summary text"
        name="blogPostSummaryText"
        default="Blog post summary:"
      />
      <TextField
        label="Featured image text"
        name="featuredImageText"
        default="Featured image:"
      />
      <TextField
        label="Read full post text"
        name="readFullPostText"
        default="Read full post:"
      />

      <TextField
        label="Picture of text"
        name="pictureOfText"
        default="Picture of"
      />
      <TextField
        label="Author alt text"
        name="authorAltText"
        default="Author avatar"
      />
      <TextField
        label="Aria described by text"
        name="ariaDescribedByText"
        default="This content is only available to logged in members."
      />
    </FieldGroup>
    <FieldGroup name="groupStyle" label="Styles" tab="STYLE">
      <FieldGroup
        label="Background image"
        name="groupBackgroundImage"
        visibilityRules="ADVANCED"
        advancedVisibility={showBackgroundImageStyleField}
      >
        <SpacingField
          label="Padding"
          name="spacing"
          visibility={{
            hidden_subfields: {
              margin: 'true',
            },
          }}
          limits={{
            margin: marginLimits,
            padding: paddingLimits,
          }}
          default={{
            padding: {
              top: {
                value: 10,
                units: 'px',
              },
              bottom: {
                value: 10,
                units: 'px',
              },
              left: {
                value: 10,
                units: 'px',
              },
              right: {
                value: 10,
                units: 'px',
              },
            },
          }}
        />

        <ColorField label="Overlay color" name="color" />
      </FieldGroup>
      <FieldGroup
        label="Image"
        name="groupImage"
        visibilityRules="ADVANCED"
        advancedVisibility={showImageStyleField}
      >
        <FieldGroup label="Size" name="groupSize">
          <ChoiceField
            label="Aspect ratio"
            name="aspectRatio"
            display="select"
            choices={[
              ['1/1', '1:1'],
              ['3/2', '3:2'],
              ['2/3', '2:3'],
              ['4/3', '4:3'],
              ['3/4', '3:4'],
              ['16/9', '16:9'],
            ]}
            required
            default="1/1"
          />
          <NumberField
            label="Width"
            name="width"
            visibility={{
              controlling_field: 'layout',
              controlling_value_regex: 'sideBySide',
              operator: 'EQUAL',
            }}
            display="text"
            min={25}
            max={75}
            step={5}
            suffix="%"
            default={50}
          />
        </FieldGroup>

        <FieldGroup label="Corner" name="groupCorner">
          <NumberField
            label="Radius"
            name="radius"
            display="text"
            min={0}
            max={100}
            step={1}
            suffix="px"
            default={0}
          />
        </FieldGroup>

        <FieldGroup label="Spacing" name="groupSpacing">
          <SpacingField
            label="Spacing"
            name="spacing"
            visibility={{
              hidden_subfields: {
                padding: 'true',
              },
            }}
            limits={{
              padding: paddingLimits,
              margin: marginLimits,
            }}
            default={{
              margin: {
                top: {
                  value: 10,
                  units: 'px',
                },
                bottom: {
                  value: 10,
                  units: 'px',
                },
              },
            }}
          />
          <NumberField
            label="Between image and content"
            name="betweenImageAndContent"
            visibility={{
              controlling_field: 'layout',
              controlling_value_regex: 'sideBySide',
              operator: 'EQUAL',
            }}
            display="slider"
            max={200}
            min={5}
            step={5}
            suffix="px"
            default={50}
          />
        </FieldGroup>
      </FieldGroup>
      <FieldGroup
        label="Title"
        name="groupTitle"
        visibility={{
          controlling_field: 'displayForEachListItem',
          controlling_value_regex: 'title',
          operator: 'MATCHES_REGEX',
        }}
      >
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
        <FieldGroup label="Text" name="groupText">
          <FontField label="Font" name="font" />
        </FieldGroup>
        <FieldGroup label="Spacing" name="groupSpacing">
          <SpacingField
            label="Spacing"
            name="spacing"
            visibility={{
              hidden_subfields: {
                padding: 'true',
              },
            }}
            limits={{
              padding: paddingLimits,
              margin: marginLimits,
            }}
            default={{
              margin: {
                top: {
                  value: 10,
                  units: 'px',
                },
                bottom: {
                  value: 10,
                  units: 'px',
                },
              },
            }}
          />
        </FieldGroup>
        <FieldGroup label="Hover" name="groupHover">
          <FieldGroup label="Text" name="groupText">
            <FontField
              label="Font"
              name="font"
              visibility={{
                hidden_subfields: {
                  size: 'true',
                },
              }}
            />
          </FieldGroup>
        </FieldGroup>
      </FieldGroup>
      <FieldGroup
        label="Author"
        name="groupAuthor"
        visibilityRules="ADVANCED"
        advancedVisibility={showAuthorStyleField}
      >
        <FieldGroup
          label="Image"
          name="groupImage"
          visibility={{
            controlling_field: 'displayForEachListItem',
            controlling_value_regex: 'authorImage',
            operator: 'MATCHES_REGEX',
          }}
        >
          <FieldGroup label="Corner" name="groupCorner">
            <NumberField
              label="Radius"
              name="radius"
              display="text"
              min={0}
              max={100}
              step={1}
              suffix="px"
              default={0}
            />
          </FieldGroup>
          <ChoiceField
            label="Size"
            name="size"
            display="select"
            choices={[
              ['50', 'Small'],
              ['75', 'Medium'],
              ['100', 'Large'],
            ]}
            default="50"
          />
        </FieldGroup>

        <FieldGroup
          label="Text"
          name="groupText"
          visibility={{
            controlling_field: 'displayForEachListItem',
            controlling_value_regex: 'authorName',
            operator: 'MATCHES_REGEX',
          }}
        >
          <FontField label="Font" name="font" />
        </FieldGroup>

        <FieldGroup label="Spacing" name="groupSpacing">
          <SpacingField
            label="Spacing"
            name="spacing"
            visibility={{
              hidden_subfields: {
                padding: 'true',
              },
            }}
            limits={{
              padding: paddingLimits,
              margin: marginLimits,
            }}
            default={{
              margin: {
                top: {
                  value: 10,
                  units: 'px',
                },
                bottom: {
                  value: 10,
                  units: 'px',
                },
              },
            }}
          />
        </FieldGroup>
        <FieldGroup
          label="Hover"
          name="groupHover"
          visibility={{
            controlling_field: 'displayForEachListItem',
            controlling_value_regex: 'authorName',
            operator: 'MATCHES_REGEX',
          }}
        >
          <FieldGroup label="Text" name="groupText">
            <FontField
              label="Font"
              name="font"
              visibility={{
                hidden_subfields: {
                  size: 'true',
                },
              }}
            />
          </FieldGroup>
        </FieldGroup>
      </FieldGroup>
      <FieldGroup
        label="Tags"
        name="groupTags"
        visibility={{
          controlling_field: 'displayForEachListItem',
          controlling_value_regex: 'tags',
          operator: 'MATCHES_REGEX',
        }}
      >
        <FieldGroup label="Text" name="groupText">
          <FontField label="Font" name="font" />
        </FieldGroup>
        <FieldGroup label="Background" name="groupBackground">
          <ColorField label="Color" name="color" />
        </FieldGroup>
        <FieldGroup label="Border" name="groupBorder">
          <BorderField label="Border" name="border" />
        </FieldGroup>
        <FieldGroup label="Corner" name="groupCorner">
          <NumberField
            label="Radius"
            name="radius"
            display="text"
            max={100}
            step={1}
            suffix="px"
            default={0}
          />
        </FieldGroup>
        <FieldGroup label="Spacing" name="groupSpacing">
          <NumberField
            label="Space between tags"
            name="spaceBetweenTags"
            display="slider"
            max={50}
            min={0}
            step={1}
            default={5}
            suffix="px"
          />
          <SpacingField
            label="Spacing"
            name="spacing"
            limits={{
              padding: paddingLimits,
              margin: marginLimits,
            }}
            default={{
              margin: {
                top: {
                  value: 10,
                  units: 'px',
                },
                bottom: {
                  value: 10,
                  units: 'px',
                },
              },
            }}
          />
        </FieldGroup>
        <FieldGroup label="Hover" name="groupHover">
          <FieldGroup label="Text" name="groupText">
            <FontField
              label="Font"
              name="font"
              visibility={{
                hidden_subfields: {
                  size: 'true',
                },
              }}
            />
          </FieldGroup>
          <FieldGroup label="Background" name="groupBackground">
            <ColorField label="Color" name="color" />
          </FieldGroup>
          <FieldGroup label="Border" name="groupBorder">
            <BorderField label="Border" name="border" />
          </FieldGroup>
        </FieldGroup>
      </FieldGroup>

      <FieldGroup
        label="Publish date"
        name="groupPublishDate"
        visibility={{
          controlling_field: 'displayForEachListItem',
          controlling_value_regex: 'publishDate',
          operator: 'MATCHES_REGEX',
        }}
      >
        <FieldGroup label="Text" name="groupText">
          <FontField label="Font" name="font" />
        </FieldGroup>
        <FieldGroup label="Spacing" name="groupSpacing">
          <SpacingField
            label="Spacing"
            name="spacing"
            visibility={{
              hidden_subfields: {
                padding: 'true',
              },
            }}
            limits={{
              padding: paddingLimits,
              margin: marginLimits,
            }}
            default={{
              margin: {
                top: {
                  value: 10,
                  units: 'px',
                },
                bottom: {
                  value: 10,
                  units: 'px',
                },
              },
            }}
          />
        </FieldGroup>
      </FieldGroup>
      <FieldGroup
        label="Description"
        name="groupDescription"
        visibility={{
          controlling_field: 'displayForEachListItem',
          controlling_value_regex: 'description',
          operator: 'MATCHES_REGEX',
        }}
      >
        <FieldGroup label="Text" name="groupText">
          <FontField label="Font" name="font" />
        </FieldGroup>
        <FieldGroup label="Spacing" name="groupSpacing">
          <SpacingField
            label="Spacing"
            name="spacing"
            visibility={{
              hidden_subfields: {
                padding: 'true',
              },
            }}
            limits={{
              padding: paddingLimits,
              margin: marginLimits,
            }}
            default={{
              margin: {
                top: {
                  value: 10,
                  units: 'px',
                },
                bottom: {
                  value: 10,
                  units: 'px',
                },
              },
            }}
          />
        </FieldGroup>
      </FieldGroup>
      <FieldGroup
        label="Button"
        name="groupButton"
        visibility={{
          controlling_field: 'displayForEachListItem',
          controlling_value_regex: 'button',
          operator: 'MATCHES_REGEX',
        }}
      >
        <FieldGroup label="Text" name="groupText">
          <FontField label="Font" name="font" />
        </FieldGroup>
        <FieldGroup label="Background" name="groupBackground">
          <ColorField label="Color" name="color" />
        </FieldGroup>
        <FieldGroup label="Border" name="groupBorder">
          <BorderField label="Border" name="border" />
        </FieldGroup>

        <FieldGroup label="Corner" name="groupCorner">
          <NumberField
            label="Radius"
            name="radius"
            display="slider"
            max={100}
            step={1}
            suffix="px"
            default={0}
          />
        </FieldGroup>
        <FieldGroup label="Spacing" name="groupSpacing">
          <SpacingField
            label="Spacing"
            name="spacing"
            limits={{
              padding: paddingLimits,
              margin: marginLimits,
            }}
            default={{
              margin: {
                top: {
                  value: 10,
                  units: 'px',
                },
                bottom: {
                  value: 10,
                  units: 'px',
                },
              },
            }}
          />
        </FieldGroup>
        <FieldGroup label="Alignment" name="groupAlignment">
          <AlignmentField
            label="Alignment"
            name="alignment"
            alignmentDirection="HORIZONTAL"
            default={{
              horizontal_align: 'CENTER',
            }}
          />
        </FieldGroup>
        <FieldGroup label="Hover" name="groupHover">
          <FieldGroup label="Text" name="groupText">
            <FontField
              label="Font"
              name="font"
              visibility={{
                hidden_subfields: {
                  size: 'true',
                },
              }}
            />
          </FieldGroup>
          <FieldGroup label="Background" name="groupBackground">
            <ColorField label="Color" name="color" />
          </FieldGroup>
          <FieldGroup label="Border" name="groupBorder">
            <BorderField label="Border" name="border" />
          </FieldGroup>
        </FieldGroup>
      </FieldGroup>
      <FieldGroup label="Post" name="groupPost">
        <FieldGroup label="Spacing" name="groupSpacing">
          <NumberField
            label="Space between posts"
            name="spaceBetweenPosts"
            visibility={{
              controlling_field: 'layout',
              controlling_value_regex: 'grid',
              operator: 'EQUAL',
            }}
            display="text"
            max={75}
            min={25}
            step={5}
            suffix="px"
            default={25}
          />
          <SpacingField
            label="Spacing"
            name="spacing"
            visibility={{
              hidden_subfields: {
                padding: 'true',
              },
            }}
            limits={{
              padding: paddingLimits,
              margin: marginLimits,
            }}
          />
        </FieldGroup>
        <FieldGroup
          label="Background"
          name="groupBackground"
          visibilityRules="ADVANCED"
          advancedVisibility={showBackgroundStyleField}
        >
          <ColorField label="Color" name="color" />
        </FieldGroup>
        <FieldGroup label="Border" name="groupBorder">
          <BorderField label="Border" name="border" />
        </FieldGroup>
        <FieldGroup label="Corner" name="groupCorner">
          <NumberField
            label="Radius"
            name="radius"
            display="text"
            suffix="px"
            max={100}
            step={1}
            default={0}
          />
        </FieldGroup>
      </FieldGroup>
      <FieldGroup label="Post content" name="groupContent">
        <SpacingField
          label="Spacing"
          name="spacing"
          visibility={{
            hidden_subfields: {
              margin: 'true',
            },
          }}
          limits={{
            padding: {
              top: {
                min: 0,
                max: 100,
                units: ['px'],
              },
              right: {
                min: 0,
                max: 100,
                units: ['px'],
              },
              bottom: {
                min: 0,
                max: 100,
                units: ['px'],
              },
              left: {
                min: 0,
                max: 100,
                units: ['px'],
              },
            },
            margin: marginLimits,
          }}
        />
      </FieldGroup>
    </FieldGroup>
  </ModuleFields>
);
