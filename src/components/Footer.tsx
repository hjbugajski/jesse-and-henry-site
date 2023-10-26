import Countdown from '@/components/Countdown';
import AppLink from '@/lib/components/AppLink';
import Icon from '@/lib/components/Icon';

export default function Footer() {
  return (
    <footer className="bg-neutral-99 p-4 pb-20 md:pb-4">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-center gap-6 rounded-3xl bg-neutral-variant-90/75 p-6 text-neutral-variant-30 md:rounded-3xl">
        <Countdown />
        <div className="flex flex-col items-center justify-center gap-2">
          <p className="flex flex-row items-center text-sm">
            Made with&nbsp;
            <Icon name="favorite" className="text-sm text-danger-40" />
            &nbsp;in NYC
          </p>
          <p className="text-xs">
            &copy; {new Date().getFullYear()}{' '}
            <AppLink href="https://bugajski.io" target="_blank" rel="noreferrer">
              Henry Bugajski
            </AppLink>
          </p>
        </div>
      </div>
    </footer>
  );
}
