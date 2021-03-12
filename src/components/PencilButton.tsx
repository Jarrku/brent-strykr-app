import { PencilIcon } from '@/components/icons/PencilIcon';
import clsx from 'clsx';

export interface IconButtonProps
  extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  children: React.ReactNode;
}

export function IconButton({ className, ...props }: ButtonProps) {
  return (
    <button
      type="button"
      className={clsx(
        'inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-white focus:outline-none focus:ring-2 focus:ring-offset-2',
        className,
      )}
      {...props}
    ></button>
  );
}

export function PencilButton({ className, ...props }: IconButtonProps) {
  return (
    <IconButton className={clsx('bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500', className)} {...props}>
      <PencilIcon className="w-3 h-3" />
    </IconButton>
  );
}
