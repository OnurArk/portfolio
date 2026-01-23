import {
  CustomColors,
  DEFAULT_THEME_COLORS,
  DEFAULT_THEME_CUSTOM,
  CardColors,
  NavbarColors,
  NavbarCustomKey,
  SurfaceColors,
  ThemeColorKey,
  ThemeColorOverrides,
  ThemeCustomOverrides,
  ThemeMode,
  ButtonColors,
  ButtonVariantColors,
  InputColors,
  SelectColors,
  CheckboxColors,
  ResponseColors,
} from "@/constants/theme";

const COLOR_KEYS: ThemeColorKey[] = [
  "primary",
  "text",
  "background",
  "disabled",
];

const isValidColorValue = (value: unknown): value is string =>
  typeof value === "string" && value.trim().length > 0;

export function mergeColors(
  mode: ThemeMode,
  overrides?: ThemeColorOverrides
): Record<ThemeColorKey, string> {
  const base = DEFAULT_THEME_COLORS[mode];

  return COLOR_KEYS.reduce((acc, key) => {
    const candidate = overrides?.[key];
    acc[key] = isValidColorValue(candidate) ? candidate : base[key];
    return acc;
  }, {} as Record<ThemeColorKey, string>);
}

const NAVBAR_COLOR_KEYS: NavbarCustomKey[] = [
  "bgColor",
  "textColor",
  "activeBgColor",
  "activeTextColor",
  "hoverBgColor",
  "hoverTextColor",
  "shadowColor",
];

const pickColor = (base: string, override?: string) =>
  isValidColorValue(override) ? override : base;

const pickNumber = (base: number, override?: number) =>
  typeof override === "number" && Number.isFinite(override) ? override : base;

const mergeSurfaceColors = (
  base: SurfaceColors,
  overrides?: Partial<SurfaceColors>
): SurfaceColors => ({
  default: pickColor(base.default, overrides?.default),
  paper: pickColor(base.paper, overrides?.paper),
});

const mergeCardColors = (
  base: CardColors,
  overrides?: Partial<CardColors>
): CardColors => ({
  borderRadius: pickNumber(base.borderRadius, overrides?.borderRadius),
  borderSize: pickNumber(base.borderSize, overrides?.borderSize),
  borderColor: pickColor(base.borderColor, overrides?.borderColor),
  shadowColor: pickColor(base.shadowColor, overrides?.shadowColor),
  bgColor: pickColor(base.bgColor, overrides?.bgColor),
  primaryColor: pickColor(base.primaryColor, overrides?.primaryColor),
  secondaryColor: pickColor(base.secondaryColor, overrides?.secondaryColor),
  ternaryColor: pickColor(base.ternaryColor, overrides?.ternaryColor),
});

const mergeNavbarColors = (
  base: NavbarColors,
  overrides?: Partial<NavbarColors>
): NavbarColors =>
  NAVBAR_COLOR_KEYS.reduce(
    (acc, key) => {
      acc[key] = pickColor(base[key], overrides?.[key]);
      return acc;
    },
    { ...base }
  );

const mergeButtonVariant = (
  base: ButtonVariantColors,
  overrides?: Partial<ButtonVariantColors>
): ButtonVariantColors => ({
  bgColor: pickColor(base.bgColor, overrides?.bgColor),
  textColor: pickColor(base.textColor, overrides?.textColor),
  borderColor: pickColor(base.borderColor, overrides?.borderColor),
  hoverBgColor: pickColor(base.hoverBgColor, overrides?.hoverBgColor),
  hoverTextColor: pickColor(base.hoverTextColor, overrides?.hoverTextColor),
});

const mergeButtonColors = (
  base: ButtonColors,
  overrides?: Partial<ButtonColors>
): ButtonColors => ({
  contained: mergeButtonVariant(base.contained, overrides?.contained),
  outlined: mergeButtonVariant(base.outlined, overrides?.outlined),
  text: mergeButtonVariant(base.text, overrides?.text),
});

const mergeInputColors = (
  base: InputColors,
  overrides?: Partial<InputColors>
): InputColors => ({
  bgColor: pickColor(base.bgColor, overrides?.bgColor),
  borderColor: pickColor(base.borderColor, overrides?.borderColor),
  hoverBorderColor: pickColor(base.hoverBorderColor, overrides?.hoverBorderColor),
  focusBorderColor: pickColor(base.focusBorderColor, overrides?.focusBorderColor),
  textColor: pickColor(base.textColor, overrides?.textColor),
  placeholderColor: pickColor(base.placeholderColor, overrides?.placeholderColor),
});

const mergeSelectColors = (
  base: SelectColors,
  overrides?: Partial<SelectColors>
): SelectColors => ({
  bgColor: pickColor(base.bgColor, overrides?.bgColor),
  borderColor: pickColor(base.borderColor, overrides?.borderColor),
  hoverBorderColor: pickColor(base.hoverBorderColor, overrides?.hoverBorderColor),
  focusBorderColor: pickColor(base.focusBorderColor, overrides?.focusBorderColor),
  textColor: pickColor(base.textColor, overrides?.textColor),
  placeholderColor: pickColor(base.placeholderColor, overrides?.placeholderColor),
  iconColor: pickColor(base.iconColor, overrides?.iconColor),
});

const mergeCheckboxColors = (
  base: CheckboxColors,
  overrides?: Partial<CheckboxColors>
): CheckboxColors => ({
  checkColor: pickColor(base.checkColor, overrides?.checkColor),
  borderColor: pickColor(base.borderColor, overrides?.borderColor),
  hoverBorderColor: pickColor(base.hoverBorderColor, overrides?.hoverBorderColor),
  disabledCheckedColor: pickColor(
    base.disabledCheckedColor,
    overrides?.disabledCheckedColor
  ),
  disabledUncheckedColor: pickColor(
    base.disabledUncheckedColor,
    overrides?.disabledUncheckedColor
  ),
});

const mergeResponseColors = (
  base: ResponseColors,
  overrides?: Partial<ResponseColors>
): ResponseColors => ({
  success: pickColor(base.success, overrides?.success),
  error: pickColor(base.error, overrides?.error),
  warning: pickColor(base.warning, overrides?.warning),
  info: pickColor(base.info, overrides?.info),
});

export function mergeCustomColors(
  mode: ThemeMode,
  overrides?: ThemeCustomOverrides
): CustomColors {
  const base = DEFAULT_THEME_CUSTOM[mode];
  return {
    paper: mergeSurfaceColors(base.paper, overrides?.paper),
    card: mergeCardColors(base.card, overrides?.card),
    navbar: mergeNavbarColors(base.navbar, overrides?.navbar),
    buttons: mergeButtonColors(base.buttons, overrides?.buttons),
    inputs: mergeInputColors(base.inputs, overrides?.inputs),
    selects: mergeSelectColors(base.selects, overrides?.selects),
    checkboxes: mergeCheckboxColors(base.checkboxes, overrides?.checkboxes),
    response: mergeResponseColors(base.response, overrides?.response),
  };
}
