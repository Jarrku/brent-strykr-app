import * as React from 'react';

interface InputProps {
  id: string;
  name?: string;
  rows?: number;
  label: string;
  className?: string;
  autoComplete?: string;
  placeholder?: string;
  textarea?: boolean;
}

const inputClassName =
  'py-3 px-4 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md';

export function Input({ label, className, id, autoComplete, placeholder, textarea, rows = 4, name = id }: InputProps) {
  return (
    <div className={className}>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="mt-1">
        {textarea ? (
          <textarea
            id={id}
            name={name}
            autoComplete={autoComplete}
            placeholder={placeholder}
            rows={rows}
            className={inputClassName}
          />
        ) : (
          <input
            type="text"
            name={name}
            id={id}
            autoComplete={autoComplete}
            placeholder={placeholder}
            className={inputClassName}
          />
        )}
      </div>
    </div>
  );
}
