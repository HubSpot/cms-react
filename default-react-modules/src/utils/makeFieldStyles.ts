import {
  UnitValue,
  BorderFieldProps,
  SpacingFieldProps,
  FontFieldProps,
  GradientFieldProps,
  GradientColor,
  GradientSide,
} from '../types/styleFields.js';

export function isEmpty(obj: object): boolean {
  return Object.keys(obj).length === 0;
}

export function getRgbaColor(colorField) {
  if (!colorField || isEmpty(colorField)) {
    return null;
  }

  return colorField.rgba;
}

export function getAlignmentCss(alignmentField) {
  if (!alignmentField || isEmpty(alignmentField)) {
    return null;
  }

  return { textAlign: `${alignmentField.alignment.horizontal_align}` };
}

function getSpacingFieldCss(spacingField: SpacingFieldProps) {
  const { margin = {}, padding = {} } = spacingField;

  function getSpacingValue(spacingValue?: UnitValue): string | null {
    return spacingValue ? `${spacingValue.value}${spacingValue.units}` : null;
  }

  return {
    paddingTop: getSpacingValue(padding.top),
    paddingRight: getSpacingValue(padding.right),
    paddingBottom: getSpacingValue(padding.bottom),
    paddingLeft: getSpacingValue(padding.left),
    marginTop: getSpacingValue(margin.top),
    marginRight: getSpacingValue(margin.right),
    marginBottom: getSpacingValue(margin.bottom),
    marginLeft: getSpacingValue(margin.left),
  };
}

export function makeSpacingStyle(spacingField: SpacingFieldProps) {
  if (!spacingField || isEmpty(spacingField)) {
    return null;
  }

  const spacingStyle = getSpacingFieldCss(spacingField);
  return { ...spacingStyle };
}

function getBorderFieldCss(borderField: BorderFieldProps) {
  const {
    top: { style = '', width = {}, color = '', opacity },
  } = borderField;

  /*
   *When opacity is <100% the generated CSS for this field produces an rgba field i.e
   *rgba(0, 0, 0, 95) for a black border with a 95% opacity. Since we only have access to
   *the hex code, we cannot apply opacity.
   */

  const borderSize = isEmpty(width) ? '' : `${width.value}${width.units}`;

  return { border: `${borderSize} ${style} ${color}`.trim() };
}

function getFontFieldCss(fontField: FontFieldProps) {
  const { color, font, size, size_unit, styles = {} } = fontField;

  return {
    color,
    fontSize: size ? `${size}${size_unit}` : null,
    fontFamily: font,
    fontWeight: styles ? styles['font-weight'] : null,
    fontStyle: styles ? styles['font-style'] : null,
    textDecoration: styles ? styles['text-decoration'] : null,
  };
}

export function makeFontStyle(fontField: FontFieldProps | null) {
  if (!fontField || isEmpty(fontField)) {
    return null;
  }

  const fontStyle = getFontFieldCss(fontField);
  return {
    color: fontStyle.color,
    fontSize: fontStyle.fontSize,
    fontWeight: fontStyle.fontWeight,
    textDecoration: fontStyle.textDecoration,
    fontStyle: fontStyle.fontStyle,
    fontFamily: fontStyle.fontFamily,
  };
}

export function makeFontHoverStyle(hoverFontField: FontFieldProps | null) {
  if (!hoverFontField || isEmpty(hoverFontField)) {
    return null;
  }

  const hoverFontStyle = getFontFieldCss(hoverFontField);
  return {
    hoverColor: hoverFontStyle.color,
    hoverFontSize: hoverFontStyle.fontSize,
    hoverFontWeight: hoverFontStyle.fontWeight,
    hoverTextDecoration: hoverFontStyle.textDecoration,
    hoverFontStyle: hoverFontStyle.fontStyle,
    hoverFontFamily: hoverFontStyle.fontFamily,
  };
}

function getBackgroundPosition(positionToMap: string): string {
  const positionMapping = {
    BOTTOM: 'bottom',
    LEFT: 'left',
    RIGHT: 'right',
    MIDDLE: 'center',
    CENTER: 'center',
    TOP: 'top',
  };

  return positionToMap
    .split('_')
    .map(pos => positionMapping[pos])
    .join(' ');
}

interface BackgroundImageField {
  src?: string;
  background_position?: string;
  background_size?: string;
}

export function makeBackgroundImageStyle(
  backgroundImageField: BackgroundImageField = {}
) {
  const { src, background_position, background_size } = backgroundImageField;

  return {
    '--background-image': src ? `url('${src}')` : undefined,
    '--background-position': background_position
      ? getBackgroundPosition(background_position)
      : undefined,
    '--background-size': background_size
      ? background_size.toLowerCase()
      : undefined,
  };
}

export function makeBorderStyle(borderField: BorderFieldProps) {
  if (!borderField || isEmpty(borderField)) {
    return null;
  }

  const borderStyle = getBorderFieldCss(borderField);
  return { border: borderStyle.border };
}

export function makeBorderHoverStyle(hoverBorderField: BorderFieldProps) {
  if (!hoverBorderField || isEmpty(hoverBorderField)) {
    return null;
  }

  const hoverBorderStyle = getBorderFieldCss(hoverBorderField);
  return { hoverBorder: hoverBorderStyle.border };
}

function generateGradientColorsArray(
  colorStopArray: Array<GradientColor>
): string[] {
  return colorStopArray.reduce((result: string[], curColor: GradientColor) => {
    const {
      color: { r, g, b, a },
    }: GradientColor = curColor;

    if (r == null || g == null || b == null || a == null) {
      return result;
    }
    result.push(`rgba(${r}, ${g}, ${b}, ${a})`);
    return result;
  }, []);
}

function generateGradientDirectionString(directionObj: GradientSide): string {
  const { verticalSide, horizontalSide } = directionObj;

  let directionString = `${
    verticalSide != null ? verticalSide.toLowerCase() : ''
  } ${horizontalSide != null ? horizontalSide.toLowerCase() : ''}`;

  return 'to ' + directionString.trim();
}

export function makeGradientStyle(gradientField: GradientFieldProps) {
  if (isEmpty(gradientField)) {
    return null;
  }

  const { colors, side_or_corner: direction } = gradientField;

  // parse color
  const colorArray = generateGradientColorsArray(colors);

  // parse direction
  const directionString = generateGradientDirectionString(direction);
  const gradientStr = `linear-gradient(${directionString}, ${colorArray.join(
    ', '
  )})`;

  return { '--linear-gradient': gradientStr };
}

function applyCssIfPresent(cssProperty: string, styleFieldCss?: string) {
  return `${styleFieldCss ? `${cssProperty}: ${styleFieldCss};` : ''}`;
}

export function getStyledJsx(
  styleField: { [key: string]: string },
  className: string
): string {
  return `
    .${className} {
      ${applyCssIfPresent('background-color', styleField.backgroundColor)}
      ${applyCssIfPresent('opacity', styleField.opacity)}
      ${applyCssIfPresent('border-radius', styleField.borderRadius)}
      ${applyCssIfPresent('border', styleField.border)}
      ${applyCssIfPresent('padding-top', styleField.paddingTop)}
      ${applyCssIfPresent('padding-right', styleField.paddingRight)}
      ${applyCssIfPresent('padding-bottom', styleField.paddingBottom)}
      ${applyCssIfPresent('padding-left', styleField.paddingLeft)}
      ${applyCssIfPresent('margin-top', styleField.marginTop)}
      ${applyCssIfPresent('margin-right', styleField.marginRight)}
      ${applyCssIfPresent('margin-bottom', styleField.marginBottom)}
      ${applyCssIfPresent('margin-left', styleField.marginLeft)}
      ${applyCssIfPresent('color', styleField.color)}
      ${applyCssIfPresent('font-family', styleField.fontFamily)}
      ${applyCssIfPresent('font-size', styleField.fontSize)}
      ${applyCssIfPresent('font-style', styleField.fontStyle)}
      ${applyCssIfPresent('font-weight', styleField.fontWeight)}
      ${applyCssIfPresent('text-decoration', styleField.textDecoration)}
    }
    .${className}:hover {
      ${applyCssIfPresent('background-color', styleField.hoverBackgroundColor)}
      ${applyCssIfPresent('opacity', styleField.hoverOpacity)}
      ${applyCssIfPresent('border', styleField.hoverBorder)}
      ${applyCssIfPresent('color', styleField.hoverColor)}
      ${applyCssIfPresent('font-family', styleField.hoverFontFamily)}
      ${applyCssIfPresent('font-size', styleField.hoverFontSize)}
      ${applyCssIfPresent('font-style', styleField.hoverFontStyle)}
      ${applyCssIfPresent('font-weight', styleField.hoverFontWeight)}
      ${applyCssIfPresent('text-decoration', styleField.hoverTextDecoration)}
    }
  `
    .replace(/\s+/g, ' ')
    .trim();
}
