export default function Layout({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col px-4">{children}</div>;
}
