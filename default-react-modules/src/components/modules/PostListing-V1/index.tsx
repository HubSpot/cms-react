import { Island } from '@hubspot/cms-components';
import blogIcon from './assets/blog.svg';
import StyledComponentsRegistry from './StyledComponentRegistry.jsx';
import PostListingIsland from './islands/PostListingIsland.js?island';
import { styled } from 'styled-components';
import { ModuleMeta } from '../../../types/modules.js';
import { StyleFields } from './types.js';
import { FontFieldType } from '@hubspot/cms-components/fields';

type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

interface FontProps {
  $fontStyle: string;
  $fontHoverStyle?: string;
}

const HeadingWrapper = styled.span<FontProps>`
  ${props => props.$fontStyle}
`;

interface BlogPostHeadingProps {
  headingLevel: HeadingLevel;
  postsHeading: string;
  headingStyle: {
    font: FontFieldType;
  };
}

const BlogPostHeading = ({
  headingLevel,
  postsHeading,
  headingStyle,
}: BlogPostHeadingProps) => {
  const HeadingLevel = headingLevel;

  return (
    <HeadingLevel>
      <HeadingWrapper $fontStyle={headingStyle.font.css}>
        {postsHeading}
      </HeadingWrapper>
    </HeadingLevel>
  );
};

function stripPublicFromUrl(signedUrl) {
  if (signedUrl) {
    return signedUrl.replace(/^public/, '');
  }
}

interface ComponentProps {
  hublData: string;
  headingLevel: HeadingLevel;
  postsHeading: string;
  groupStyle: StyleFields;
  displayForEachListItem: string[];
}

export function Component(props: ComponentProps) {
  const {
    hublData,
    headingLevel,
    postsHeading,
    groupStyle,
    displayForEachListItem,
  } = props;

  return (
    <StyledComponentsRegistry>
      <section>
        <BlogPostHeading
          headingLevel={headingLevel}
          postsHeading={postsHeading}
          headingStyle={groupStyle.groupHeading}
        />
        <Island
          wrapperTag="article"
          groupStyle={groupStyle}
          module={PostListingIsland}
          layout={groupStyle.groupLayout.style}
          signedUrl={stripPublicFromUrl(hublData)}
          displayForEachListItem={displayForEachListItem}
          headingLevel={headingLevel}
        />
      </section>
    </StyledComponentsRegistry>
  );
}

export const defaultModuleConfig = {
  moduleName: 'post_listing',
  version: 1,
};

export { fields } from './fields.jsx';
export const meta: ModuleMeta = {
  label: 'Post listing',
  host_template_types: ['BLOG_LISTING', 'BLOG_POST', 'PAGE'],
  icon: blogIcon,
  categories: ['blog'],
};

export { default as hublDataTemplate } from './hubl_data.hubl.html?raw';
