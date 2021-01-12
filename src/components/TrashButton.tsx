import 'twin.macro';
import { TrashIcon } from '@/components/icons/TrashIcon';

interface ButtonProps
  extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {}

export function TrashButton(props: ButtonProps) {
  return (
    <button
      type="button"
      tw="inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
      {...props}
    >
      <TrashIcon tw="w-6 h-6" />
    </button>
  );
}
