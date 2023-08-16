import AppLink from './AppLink';

export default function Navigation() {
  return (
    <nav className="sticky top-0 z-50 flex h-14 min-h-[56px] flex-row items-center justify-between gap-4 bg-neutral-99/75 px-4 backdrop-blur-md">
      <ul className="flew-row flex items-center gap-1">
        <li>
          <AppLink href="/" className="h-6 px-2 font-serif text-sm uppercase tracking-widest">
            Jesse & Henry
          </AppLink>
        </li>
      </ul>
    </nav>
  );
}
