export const INPUT_SIZE: Record<string, string> = {
  small: 'h-4 w-4 checked:after:h-[0.625rem] checked:after:w-[0.25rem]',
  default: 'h-6 w-6 checked:after:h-[0.825rem] checked:after:w-[0.375rem]',
  large: 'h-6 w-6 checked:after:h-[0.825rem] checked:after:w-[0.375rem]',
};

export const LABEL_SIZE: Record<string, string> = {
  small: 'text-gray-900 text-sm',
  default: 'text-gray-900 text-base',
  large: 'text-gray-900 text-base',
};

export const VARIANT: Record<string, string> = {
  primary:
    'accent-purple-600 checked:border-purple-600 checked:bg-purple-600 indeterminate:border-purple-600 indeterminate:bg-purple-600',
  secondary:
    'accent-secondary checked:border-secondary checked:bg-secondary indeterminate:border-secondary indeterminate:bg-secondary',
  danger:
    'accent-danger checked:border-danger checked:bg-danger indeterminate:border-danger indeterminate:bg-danger',
  error:
    'accent-red-500 checked:border-red-500 checked:bg-red-500 indeterminate:border-red-500 indeterminate:bg-red-500',
  warning:
    'accent-warning checked:border-warning checked:bg-warning indeterminate:border-warning indeterminate:bg-warning',
  success:
    'accent-success checked:border-success checked:bg-success indeterminate:border-success indeterminate:bg-success',
};
