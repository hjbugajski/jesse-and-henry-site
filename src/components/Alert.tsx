import { Color } from '@/types/color';
import { backgroundColorClass, classes, textColorClass } from '@/utils/classes';

import Icon from './Icon';

export type AlertProps = {
  children: React.ReactNode;
  className?: string;
  color?: Color;
  icon: string;
};

function Alert({ children, className, color = 'neutral', icon }: AlertProps) {
  return (
    <div
      className={classes(
        className,
        backgroundColorClass[color],
        textColorClass[color],
        'flex flex-row gap-4 rounded-xl p-4 text-left text-sm',
      )}
    >
      <Icon name={icon} className={classes(textColorClass[color], 'text-2xl leading-[1.15]')} />
      <div>{children}</div>
    </div>
  );
}

function AlertTitle({ children }: { children: React.ReactNode }) {
  return <h1 className="mb-1 font-sans text-base font-bold normal-case tracking-wider">{children}</h1>;
}

function AlertBody({ children }: { children: React.ReactNode }) {
  return <div className="my-1 first:mt-0 last:mb-0">{children}</div>;
}

function AlertActions({ children }: { children: React.ReactNode }) {
  return <div className="mt-4 flex flex-row items-center gap-2">{children}</div>;
}

const Root = Alert;
const Title = AlertTitle;
const Body = AlertBody;
const Actions = AlertActions;

export { Alert, AlertTitle, AlertBody, Root, Title, Body, Actions };
