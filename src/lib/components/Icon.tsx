import { classes } from '@/lib/utils/classes';

export default function Icon({ name, className }: { name: string; className?: string }) {
  return <i className={classes('material-symbols-rounded', className)}>{name}</i>;
}
