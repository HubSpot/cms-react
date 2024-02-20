import blogIcon from './assets/blog.svg';
import StyledJSXRegistry from '../../StyledJSXRegistry.jsx';
import styles from './styles.module.css';

function stripTags(stringWithTags) {
  return stringWithTags.replace(/<\/?[^>]+>/gi, '');
}

function createExcerpt(excerptString, maxLength) {
  const excerptWithoutTags = stripTags(excerptString);
  const showEllipsis = excerptWithoutTags.length > maxLength;

  return showEllipsis
    ? `${excerptWithoutTags.substring(0, maxLength)}...`
    : excerptWithoutTags;
}

function applyCssIfPresent(styleField, cssProperty) {
  if (!styleField) {
    return '';
  }

  switch (cssProperty) {
    case 'border-radius':
      return `border-radius: ${styleField.radius}px;`;
    case 'background-color':
      return styleField.rgba ? `background-color: ${styleField.rgba};` : '';
    case 'alignment':
      return styleField.alignment
        ? `text-align: ${styleField.alignment.horizontal_align};`
        : '';
    case 'width':
      return `width: ${styleField.size}px;`;
    default:
      return styleField.css || '';
  }
}

function getImageSide(hasAlternatingImage, loopIndex) {
  if (!hasAlternatingImage) {
    return 'left';
  }
  const isEvenLoop = loopIndex % 2 === 0;
  return isEvenLoop ? 'left' : 'right';
}

function getLayoutStyles(layout, groupStyle) {
  const { groupImage: imageStyle, groupPost: postStyle } = groupStyle;

  switch (layout) {
    case 'grid':
      return makeGridStyles(postStyle);
    case 'sideBySide':
      return makeSideBySideStyles(imageStyle);
    default:
      return {};
  }
}

function makeLayoutWrapperStyles(layout) {
  const blogPostWrapperStyles = {
    display: layout === 'sideBySide' ? 'flex' : '',
    flexDirection: layout === 'sideBySide' ? 'row' : '',
  };

  const blogPostContentWrapperStyles = {
    order: layout === 'sideBySide' ? 1 : '',
  };

  return {
    blogPostWrapperStyles,
    blogPostContentWrapperStyles,
  };
}

function makeGridStyles(postStyle) {
  const TWO_COLUMN_GAP = '0.5rem';
  const THREE_COLUMN_GAP = '0.66rem';
  const FOUR_COLUMN_GAP = '0.75rem';
  const spaceBetweenPosts = postStyle.groupSpacing.spaceBetweenPosts;

  if (spaceBetweenPosts) {
    const THREE_COLUMN_WIDTH = `${(spaceBetweenPosts * 2) / 3}px`;
    const FOUR_COLUMN_WIDTH = `${(spaceBetweenPosts * 3) / 4}px`;

    return {
      ['--grid-post-width']: `calc(50% - ${spaceBetweenPosts / 2}px)`,
      ['--grid-space-between-posts']: `${spaceBetweenPosts}px`,
      ['--grid-post-width-three-column']: `calc(33.3% - ${THREE_COLUMN_WIDTH})`,
      ['--grid-post-width-four-column']: `calc(25% - ${FOUR_COLUMN_WIDTH})`,
    };
  }
  return {
    ['--grid-post-width']: `calc(50% - ${TWO_COLUMN_GAP})`,
    ['--grid-space-between-posts']: '1rem',
    ['--grid-post-width-three-column']: `calc(33.3% - ${THREE_COLUMN_GAP})`,
    ['--grid-post-width-four-column']: `calc(25% - ${FOUR_COLUMN_GAP})`,
  };
}

function makeSideBySideStyles(imageStyle) {
  const imageWidth = imageStyle.groupSize.width;
  const spaceBetweenContent = imageStyle.groupSpacing.betweenImageAndContent;
  const sideBySideStyles = {};
  const TWO_COLUMN_GAP = '0.5rem';
  const SIDE_BY_SIDE_WIDTH = `${spaceBetweenContent / 2}px`;
  const REMAINING_IMAGE_WIDTH_PERCENTAGE = `${100 - imageWidth}%`;

  /*
    Side by side styling is when the featured blog image is placed next to the blog content.
    These calculations ensure that the image and content remain side by side
    while accounting for the space between the image and content as well as the image width itself.
  */
  if (imageWidth && spaceBetweenContent) {
    sideBySideStyles[
      '--image-wrapper-width'
    ] = `calc(${imageWidth}% - ${SIDE_BY_SIDE_WIDTH})`;
    sideBySideStyles[
      '--content-wrapper-width'
    ] = `calc(${REMAINING_IMAGE_WIDTH_PERCENTAGE} - ${SIDE_BY_SIDE_WIDTH})`;
  } else if (imageWidth) {
    sideBySideStyles[
      '--image-wrapper-width'
    ] = `calc(${imageWidth}% - ${TWO_COLUMN_GAP})`;
    sideBySideStyles[
      '--content-wrapper-width'
    ] = `calc(${REMAINING_IMAGE_WIDTH_PERCENTAGE} - ${TWO_COLUMN_GAP})`;
  } else if (spaceBetweenContent) {
    sideBySideStyles[
      '--image-wrapper-width'
    ] = `calc(40% - ${SIDE_BY_SIDE_WIDTH})`;
    sideBySideStyles[
      '--content-wrapper-width'
    ] = `calc(60% - ${SIDE_BY_SIDE_WIDTH})`;
  } else {
    sideBySideStyles['--image-wrapper-width'] = `calc(40% - ${TWO_COLUMN_GAP})`;
    sideBySideStyles[
      '--content-wrapper-width'
    ] = `calc(60% - ${TWO_COLUMN_GAP})`;
  }

  return sideBySideStyles;
}

function makePostImageCss(imageStyle) {
  return `
    .${styles.hsBlogPostImageWrapper} {
      ${applyCssIfPresent(imageStyle.groupSpacing.spacing)}
    }
  `;
}

function makePostImageStyles(imageStyle, imageSide) {
  const spaceBetweenContent = imageStyle.groupSpacing.betweenImageAndContent;
  const spacingCss = spaceBetweenContent ? `${spaceBetweenContent}px` : '1rem';

  const postImageStyles = {};

  if (imageSide === 'left') {
    postImageStyles['--margin-right'] = spacingCss;
    postImageStyles['--order'] = '1';
  } else if (imageSide === 'right') {
    postImageStyles['--margin-left'] = spacingCss;
    postImageStyles['--order'] = '2';
  }

  postImageStyles['--aspect-ratio'] = imageStyle.groupSize.aspectRatio;
  postImageStyles['--border-radius'] =
    imageStyle.groupCorner.radius >= 0
      ? `${imageStyle.groupCorner.radius}px`
      : '';

  return postImageStyles;
}

function makeImageOverlayStyles(backgroundImageStyle) {
  return `
    .${styles.hsBlogPostImageOverlay} {
      ${applyCssIfPresent(backgroundImageStyle.spacing)}
      ${applyCssIfPresent(backgroundImageStyle.color, 'background-color')}
    }
  `;
}

function makeBackgroundImageStyles(featuredImage) {
  const backgroundImageStyles = {
    backgroundImage: `url(${featuredImage})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    display: 'flex',
    height: '100%',
  };

  return {
    backgroundImageStyles,
  };
}

function makePostStyles(postStyle) {
  const { groupBorder, groupBackground, groupCorner, groupSpacing } = postStyle;

  return `
    .${styles.hsBlogPost} {
      ${applyCssIfPresent(groupSpacing.spacing)}
      ${applyCssIfPresent(groupBorder.border)}
      ${applyCssIfPresent(groupCorner, 'border-radius')}
      ${applyCssIfPresent(groupBackground.color, 'background-color')}
    }
  `;
}

function makeContentStyles(contentStyle) {
  return `
    .${styles.hsBlogPostListingContent} {
      ${applyCssIfPresent(contentStyle.spacing)}
    }
  `;
}

function makeTitleStyles(titleStyle) {
  const { groupText, groupSpacing, groupHover } = titleStyle;

  return `
    .${styles.hsBlogPostTitle} {
      ${applyCssIfPresent(groupSpacing.spacing)}
    }
    .${styles.hsBlogPostTitleLink} {
      ${applyCssIfPresent(groupText.font)}
    }
    .${styles.hsBlogPostTitleLink}:hover {
      ${applyCssIfPresent(groupHover.groupText.font)}
    }
  `;
}

function makeAuthorStyles(authorStyle) {
  const { groupText, groupSpacing, groupHover, groupImage } = authorStyle;

  return `
    .${styles.hsBlogPostAuthorImageWrapper} {
      ${applyCssIfPresent(groupImage.groupCorner, 'border-radius')}
    }

    .${styles.hsBlogPostAuthorImage} {
      ${applyCssIfPresent(groupImage, 'width')}
    }

    .${styles.hsBlogPostAuthor} {
      ${applyCssIfPresent(groupText.font)}
      ${applyCssIfPresent(groupSpacing.spacing)}
    }
    .${styles.hsBlogPostAuthor}:hover {
      ${applyCssIfPresent(groupHover.groupText.font)}
    }
  `;
}

function makeTagStyles(tagStyle) {
  const {
    groupText,
    groupBorder,
    groupSpacing,
    groupBackground,
    groupCorner,
    groupHover,
  } = tagStyle;

  const spaceBetweenTags = groupSpacing.spaceBetweenTags
    ? `${tagStyle.groupSpacing.spaceBetweenTags}px`
    : '';

  return `
    .${styles.hsBlogPostTag} {
      ${applyCssIfPresent(groupText.font)}
      ${applyCssIfPresent(groupSpacing.spacing)}
      ${applyCssIfPresent(groupBorder.border)}
      ${applyCssIfPresent(groupCorner, 'border-radius')}
      ${applyCssIfPresent(groupBackground.color, 'background-color')}
    }
    .${styles.hsBlogPostTag}:hover {
      ${applyCssIfPresent(groupHover.groupText.font)}
      ${applyCssIfPresent(groupHover.groupBorder.border)}
      ${applyCssIfPresent(groupHover.groupBackground.color, 'background-color')}
    }
    .${styles.hsBlogPostTag}:not(:last-child) {
      margin-right ${spaceBetweenTags};
    }
  `;
}

function makePublishDateStyles(publishDateStyle) {
  const { groupText, groupSpacing } = publishDateStyle;

  return `
    .${styles.hsBlogPostPublishDate} {
      ${applyCssIfPresent(groupText.font)}
      ${applyCssIfPresent(groupSpacing.spacing)}
    }
  `;
}

function makeDescriptionStyles(descriptionStyle) {
  const { groupText, groupSpacing } = descriptionStyle;

  return `
    .${styles.hsBlogPostDescription} {
      ${applyCssIfPresent(groupText.font)}
      ${applyCssIfPresent(groupSpacing.spacing)}
    }
  `;
}

function makeButtonStyles(buttonStyle) {
  const {
    groupText,
    groupCorner,
    groupBorder,
    groupSpacing,
    groupBackground,
    groupHover,
    groupAlignment,
  } = buttonStyle;

  return `
    .${styles.hsBlogPostButtonWrapper} {
      ${applyCssIfPresent(groupAlignment, 'alignment')}
    }
    .${styles.hsBlogPostButton} {
      ${applyCssIfPresent(groupText.font)}
      ${applyCssIfPresent(groupBorder.border)}
      ${applyCssIfPresent(groupSpacing.spacing)}
      ${applyCssIfPresent(groupCorner, 'border-radius')}
      ${applyCssIfPresent(groupBackground.color, 'background-color')}
    }
    .${styles.hsBlogPostButton}:hover {
      ${applyCssIfPresent(groupHover.groupText.font)}
      ${applyCssIfPresent(groupHover.groupBorder.border)}
      ${applyCssIfPresent(groupHover.groupBackground.color, 'background-color')}
    }
  `;
}

function clearWhiteSpaceFromString(cssString) {
  return cssString.replace(/^\s*[\r\n]/gm, '');
}

function setStyledJsx(styleFieldGroup) {
  const {
    groupPost,
    groupImage,
    groupBackgroundImage,
    groupContent,
    groupTitle,
    groupAuthor,
    groupTags,
    groupPublishDate,
    groupButton,
    groupDescription,
  } = styleFieldGroup;

  const cssString = `
    ${makePostStyles(groupPost)}
    ${makePostImageCss(groupImage)}
    ${makeImageOverlayStyles(groupBackgroundImage)}
    ${makeContentStyles(groupContent)}
    ${makeTitleStyles(groupTitle)}
    ${makeAuthorStyles(groupAuthor)}
    ${makeTagStyles(groupTags)}
    ${makePublishDateStyles(groupPublishDate)}
    ${makeDescriptionStyles(groupDescription)}
    ${makeButtonStyles(groupButton)}
  `;

  return clearWhiteSpaceFromString(cssString);
}

const BlogPostImage = ({
  blogPost,
  layout,
  imageStyle,
  loopIndex,
  hasAlternatingImage,
  groupDefaultText,
  firstRowImage,
}) => {
  const {
    featuredImage,
    featuredImageWidth,
    featuredImageHeight,
    absoluteUrl,
  } = blogPost;
  const ariaLabel = `${groupDefaultText.featuredImageText} ${blogPost.featuredImageAltText}`;
  const imageSide = getImageSide(hasAlternatingImage, loopIndex);
  const imageStyles = makePostImageStyles(imageStyle, imageSide);

  return (
    <a
      data-testid="blog-post-image"
      style={imageStyles}
      href={absoluteUrl}
      aria-label={ariaLabel}
      className={
        layout === 'sideBySide'
          ? `${styles.hsBlogPostImageWrapper} ${styles.hsBlogPostImageWrapperSideBySide}`
          : `${styles.hsBlogPostImageWrapper}`
      }
    >
      <img
        src={featuredImage}
        alt={blogPost.featuredImageAltText}
        className={styles.hsBlogPostListingImage}
        width={featuredImageWidth}
        height={featuredImageHeight}
        loading={firstRowImage ? 'eager' : 'lazy'}
      />
    </a>
  );
};

const BlogPostTitle = ({ blogPost, titleStyle }) => {
  const { absoluteUrl, name } = blogPost;
  const TitleHeading = titleStyle.headingLevel;

  return (
    <TitleHeading className={styles.hsBlogPostTitle}>
      <a className={styles.hsBlogPostTitleLink} href={absoluteUrl}>
        {name}
      </a>
    </TitleHeading>
  );
};

const BlogPostAuthor = ({
  blogPost,
  showPostAuthorImage,
  showPostAuthorName,
  groupDefaultText,
  blogListingBaseUrl,
}) => {
  const { blogAuthor } = blogPost;

  return (
    <div data-testid="author-wrapper" className={styles.hsBlogPostAuthor}>
      {showPostAuthorImage && blogAuthor.avatar && (
        <div className={styles.hsBlogPostAuthorImageWrapper}>
          <img
            data-testid="author-avatar"
            className={styles.hsBlogPostAuthorImage}
            src={blogAuthor.avatar}
            loading="lazy"
            alt={groupDefaultText.authorAltText}
          />
        </div>
      )}
      {showPostAuthorName && (
        <a
          data-testid="author-name"
          className={styles.hsBlogPostAuthor}
          href={`${blogListingBaseUrl}/author/${blogAuthor.slug}`}
        >
          {blogAuthor.displayName}
        </a>
      )}
    </div>
  );
};

const BlogPostTags = ({ blogPost, tagStyle, blogListingBaseUrl }) => {
  const { tagList } = blogPost;
  const postTagVariables = {
    '--spacing-between-tags': tagStyle.groupSpacing.spaceBetweenTags
      ? `${tagStyle.groupSpacing.spaceBetweenTags}px`
      : null,
  };

  return (
    <div className={styles.hsBlogPostTags}>
      {tagList.map((tag, index) => {
        return (
          <a
            key={`${tag.slug}-${index}`}
            className={styles.hsBlogPostTag}
            href={`${blogListingBaseUrl}/tag/${tag.slug}`}
            style={postTagVariables}
          >
            {tag.name}
          </a>
        );
      })}
    </div>
  );
};

const BlogPostPublishDate = ({ blogPost }) => {
  const { publishDate, publishDateLocalized } = blogPost;
  return (
    <time
      className={styles.hsBlogPostPublishDate}
      dateTime={new Date(publishDate).toLocaleDateString()}
    >
      {publishDateLocalized}
    </time>
  );
};

const BlogPostDescription = ({ blogPost }) => {
  if (!blogPost.postListContent) {
    return null;
  }
  return (
    <p className={styles.hsBlogPostDescription}>
      {createExcerpt(blogPost.postListContent, 100)}
    </p>
  );
};

const BlogPostButton = ({ blogPost, buttonText, groupDefaultText }) => {
  const { absoluteUrl } = blogPost;
  const ariaLabel = `${groupDefaultText.readFullPostText} ${blogPost.name}`;

  return (
    <div className={styles.hsBlogPostButtonWrapper}>
      <a
        className={`${styles.hsBlogPostButton} button`}
        href={absoluteUrl}
        aria-label={ariaLabel}
      >
        {buttonText}
      </a>
    </div>
  );
};

const BlogPostContent = ({
  blogPost,
  layout,
  blogPostContentWrapperStyles,
  displayForEachListItem,
  buttonText,
  groupDefaultText,
  groupStyle,
  blogListingBaseUrl,
}) => {
  const {
    groupTitle: titleStyle,
    groupAuthor: authorStyle,
    groupTags: tagStyle,
    groupPublishDate: publishDateStyle,
    groupDescription: descriptionStyle,
    groupButton: buttonStyle,
  } = groupStyle;

  // Content options
  const showPostTitle = displayForEachListItem.includes('title');
  const showPostAuthorName = displayForEachListItem.includes('authorName');
  const showPostAuthorImage = displayForEachListItem.includes('authorImage');
  const showPostTags = displayForEachListItem.includes('tags');
  const showPostPublishDate = displayForEachListItem.includes('publishDate');
  const showPostDescription = displayForEachListItem.includes('description');
  const showPostButton = displayForEachListItem.includes('button');

  const contentWrapperClass =
    layout === 'sideBySide'
      ? `${styles.hsBlogPostListingContent} ${styles.hsBlogPostContentSideBySide}`
      : `${styles.hsBlogPostListingContent}`;

  return (
    <div className={contentWrapperClass} style={blogPostContentWrapperStyles}>
      {showPostTitle && (
        <BlogPostTitle blogPost={blogPost} titleStyle={titleStyle} />
      )}
      {(showPostAuthorName || showPostAuthorImage) && (
        <BlogPostAuthor
          blogPost={blogPost}
          showPostAuthorName={showPostAuthorName}
          showPostAuthorImage={showPostAuthorImage}
          authorStyle={authorStyle}
          groupDefaultText={groupDefaultText}
          blogListingBaseUrl={blogListingBaseUrl}
        />
      )}
      {showPostTags && (
        <BlogPostTags
          blogPost={blogPost}
          tagStyle={tagStyle}
          blogListingBaseUrl={blogListingBaseUrl}
        />
      )}
      {showPostPublishDate && (
        <BlogPostPublishDate
          blogPost={blogPost}
          publishDateStyle={publishDateStyle}
        />
      )}
      {showPostDescription && (
        <BlogPostDescription
          blogPost={blogPost}
          descriptionStyle={descriptionStyle}
        />
      )}
      {showPostButton && (
        <BlogPostButton
          blogPost={blogPost}
          buttonText={buttonText}
          buttonStyle={buttonStyle}
          groupDefaultText={groupDefaultText}
        />
      )}
    </div>
  );
};

const BlogPost = ({
  blogPost,
  layout,
  buttonText,
  displayForEachListItem,
  useImageAsBackground,
  hasAlternatingImage,
  showPostImage,
  groupStyle,
  groupDefaultText,
  loopIndex,
  columns,
}) => {
  const { groupImage: imageStyle, groupBackgroundImage } = groupStyle;
  const { blogPostWrapperStyles, blogPostContentWrapperStyles } =
    makeLayoutWrapperStyles(layout);
  const blogPostClass =
    layout === 'grid'
      ? `${styles.hsBlogPost} ${
          styles[`hsBlogPostListingPostColumn${columns}`]
        }`
      : `${styles.hsBlogPost}`;
  const layoutStyle = getLayoutStyles(layout, groupStyle);
  const { featuredImage, parentBlog = {} } = blogPost;
  const blogListingBaseUrl = parentBlog.absoluteUrl;

  if (useImageAsBackground) {
    const { backgroundImageStyles } = makeBackgroundImageStyles(featuredImage);

    return (
      <article
        data-testid="blog-post-with-background-image"
        className={blogPostClass}
        style={{
          ...backgroundImageStyles,
          ...blogPostWrapperStyles,
          ...layoutStyle,
        }}
      >
        <div className={styles.hsBlogPostImageOverlay}>
          <BlogPostContent
            blogPost={blogPost}
            layout={layout}
            blogPostContentWrapperStyles={blogPostContentWrapperStyles}
            displayForEachListItem={displayForEachListItem}
            buttonText={buttonText}
            groupDefaultText={groupDefaultText}
            groupStyle={groupStyle}
            blogListingBaseUrl={blogListingBaseUrl}
          />
        </div>
      </article>
    );
  }

  return (
    <article
      data-testid="blog-post"
      className={blogPostClass}
      style={{ ...blogPostWrapperStyles, ...layoutStyle }}
    >
      {showPostImage && featuredImage && (
        <BlogPostImage
          blogPost={blogPost}
          layout={layout}
          imageStyle={imageStyle}
          groupDefaultText={groupDefaultText}
          loopIndex={loopIndex}
          hasAlternatingImage={hasAlternatingImage}
          firstRowImage={loopIndex < columns}
        />
      )}
      <BlogPostContent
        blogPost={blogPost}
        layout={layout}
        blogPostContentWrapperStyles={blogPostContentWrapperStyles}
        displayForEachListItem={displayForEachListItem}
        buttonText={buttonText}
        groupDefaultText={groupDefaultText}
        groupStyle={groupStyle}
        blogListingBaseUrl={blogListingBaseUrl}
      />
    </article>
  );
};

export const Component = ({
  buttonText,
  groupDefaultText,
  displayForEachListItem,
  layout: layout,
  columns,
  alternateImage,
  fullImage,
  groupStyle,
  hublParameters,
  experimentalHublData,
  hublData,
}) => {
  const blogPosts = hublData
    ? hublData
    : experimentalHublData
    ? experimentalHublData
    : hublParameters && hublParameters.blogPosts
    ? hublParameters.blogPosts
    : [];

  // Layout type
  const showPostImage = displayForEachListItem.includes('image');
  const hasAlternatingImage =
    showPostImage && layout === 'sideBySide' && alternateImage;
  const useImageAsBackground =
    showPostImage && layout != 'sideBySide' && fullImage;

  const blogPostWrapperClass =
    layout === 'grid'
      ? `${styles.hsBlogPostListing} ${styles.hsBlogPostGrid} ${
          styles[`hsBlogPostGridColumn${columns}`]
        }`
      : `${styles.hsBlogPostListing}`;

  return (
    <StyledJSXRegistry>
      <style jsx>{`
        ${setStyledJsx(groupStyle)}
      `}</style>
      <section className={blogPostWrapperClass}>
        {blogPosts.map((blogPost, loopIndex) => {
          return (
            <BlogPost
              key={blogPost.id}
              groupStyle={groupStyle}
              loopIndex={loopIndex}
              columns={columns}
              groupDefaultText={groupDefaultText}
              blogPost={blogPost}
              layout={layout}
              displayForEachListItem={displayForEachListItem}
              showPostImage={showPostImage}
              useImageAsBackground={useImageAsBackground}
              hasAlternatingImage={hasAlternatingImage}
              buttonText={buttonText}
            />
          );
        })}
      </section>
    </StyledJSXRegistry>
  );
};

export { fields } from './fields.tsx';
export const meta = {
  label: `Blog posts`,
  host_template_types: ['BLOG_LISTING'],
  icon: blogIcon,
  categories: ['blog'],
};

export { default as hublDataTemplate } from './hubl_data.hubl.html?raw';

export const defaultModuleConfig = {
  moduleName: 'blog_posts',
  version: 0,
};
