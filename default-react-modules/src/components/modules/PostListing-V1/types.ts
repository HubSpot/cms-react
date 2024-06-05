import {
  FontFieldType,
  SpacingFieldType,
} from '@hubspot/cms-components/fields';

export type StyleFields = {
  groupLayout: {
    style: string;
  };
  groupHeading: {
    font: FontFieldType;
  };
  groupTitle: {
    font: FontFieldType;
    hoverFont: FontFieldType;
    spacing: SpacingFieldType;
  };
  groupAuthor: {
    font: FontFieldType;
  };
  groupPublishDate: {
    font: FontFieldType;
  };
};
