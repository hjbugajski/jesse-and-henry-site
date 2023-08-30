import { ButtonLink } from '@/components/Button';
import Icon from '@/components/Icon';

export default function NotFound() {
  return (
    <section className="flex flex-1 flex-col items-center justify-center gap-8 p-4 text-center">
      <div>
        <h1 className="mb-4 text-2xl">Page Not Found</h1>
        <p>The page you&apos;re looking for does not exist or has been moved.</p>
      </div>
      <ButtonLink href="/" iconPosition="right" size="md">
        Home
        <Icon name="arrow_right_alt" className="text-2xl" />
      </ButtonLink>
    </section>
  );
}
