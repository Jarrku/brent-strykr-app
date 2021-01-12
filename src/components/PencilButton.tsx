import 'twin.macro';
import { PencilIcon } from '@/components/icons/PencilIcon';

interface ButtonProps
  extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {}

export function PencilButton(props: ButtonProps) {
  return (
    <button
      type="button"
      tw="inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      {...props}
    >
      <PencilIcon tw="w-3 h-3" />
    </button>
  );
}
