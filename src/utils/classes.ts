export const classes = (...classNames: any[]) =>
  classNames
    .filter((value) => typeof value === 'string')
    .join(' ')
    .trim();

export const backgroundColorClass = {
  neutral: 'bg-neutral-90/50',
  'neutral-variant': 'bg-neutral-variant-90/50',
  primary: 'bg-primary-90/50',
  secondary: 'bg-secondary-90/50',
  tertiary: 'bg-tertiary-90/50',
  danger: 'bg-danger-90/50',
};

export const borderColorClass = {
  neutral: 'border-neutral-10/80',
  'neutral-variant': 'border-neutral-variant-30/80',
  primary: 'border-primary-20/80',
  secondary: 'border-secondary-20/80',
  tertiary: 'border-tertiary-20/80',
  danger: 'border-danger-20/80',
};

export const borderColorHoverClass = {
  neutral: 'hover:border-neutral-10',
  'neutral-variant': 'hover:border-neutral-variant-30',
  primary: 'hover:border-primary-10',
  secondary: 'hover:border-secondary-10',
  tertiary: 'hover:border-tertiary-10',
  danger: 'hover:border-danger-10',
};

export const focusColorClass = {
  neutral: 'focus:ring-neutral-40/50',
  'neutral-variant': 'focus:ring-neutral-variant-40/50',
  primary: 'focus:ring-primary-40/50',
  secondary: 'focus:ring-secondary-40/50',
  tertiary: 'focus:ring-tertiary-40/50',
  danger: 'focus:ring-danger-40/50',
};

export const textColorClass = {
  neutral: 'text-neutral-10/80',
  'neutral-variant': 'text-neutral-variant-30/80',
  primary: 'text-primary-20/80',
  secondary: 'text-secondary-20/80',
  tertiary: 'text-tertiary-20/80',
  danger: 'text-danger-20/80',
};

export const textColorHoverClass = {
  neutral: 'hover:text-neutral-10',
  'neutral-variant': 'hover:text-neutral-variant-30',
  primary: 'hover:text-primary-10',
  secondary: 'hover:text-secondary-10',
  tertiary: 'hover:text-tertiary-10',
  danger: 'hover:text-danger-10',
};
