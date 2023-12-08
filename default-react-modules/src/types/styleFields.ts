export interface UnitValue {
  value: number;
  units: string;
}

export interface FontFieldProps {
  font: string | null;
  font_set: string;
  size: number;
  size_unit: string;
  color: string;
  styles?: {
    'font-weight': string | number;
    'font-style': string;
    'text-decoration': string;
  };
  variant: string | null;
  fallback: string | null;
}

interface MarginProps {
  margin?: {
    top: UnitValue;
    bottom: UnitValue;
    right: UnitValue;
    left: UnitValue;
  };
}

interface PaddingProps {
  padding?: {
    top: UnitValue;
    bottom: UnitValue;
    right: UnitValue;
    left: UnitValue;
  };
}

export interface SpacingFieldProps extends MarginProps, PaddingProps {}

interface BorderSide {
  style: string;
  width: UnitValue;
  color: string;
  opacity: number;
}

export interface BorderFieldProps {
  top: BorderSide;
  right: BorderSide;
  bottom: BorderSide;
  left: BorderSide;
}

export interface GradientColor {
  color: {
    r: number;
    g: number;
    b: number;
    a: number;
  };
}

export interface GradientSide {
  verticalSide: string;
  horizontalSide: string;
}

export interface GradientFieldProps {
  colors: Array<GradientColor>;
  side_or_corner: GradientSide;
}
