import React, { forwardRef } from "react";

const Input = forwardRef(
  (
    {
      label,
      error,
      helperText,
      icon,
      iconPosition = "left",
      className = "",
      containerClassName = "",
      ...props
    },
    ref,
  ) => {
    const inputClasses = `
    w-full px-4 py-3 border rounded-lg transition-colors duration-200 outline-none
    ${
      error
        ? "border-red-300 focus:border-red-500 focus:ring-1 focus:ring-red-500"
        : "border-gray-300 focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
    }
    ${icon ? (iconPosition === "left" ? "pl-10" : "pr-10") : ""}
    ${className}
  `;

    return (
      <div className={containerClassName}>
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {label}
          </label>
        )}

        <div className="relative">
          {icon && iconPosition === "left" && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <div className="w-5 h-5 text-gray-400">{icon}</div>
            </div>
          )}

          <input ref={ref} className={inputClasses} {...props} />

          {icon && iconPosition === "right" && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <div className="w-5 h-5 text-gray-400">{icon}</div>
            </div>
          )}
        </div>

        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}

        {helperText && !error && (
          <p className="mt-1 text-sm text-gray-500">{helperText}</p>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";

export const TextArea = forwardRef(
  (
    {
      label,
      error,
      helperText,
      rows = 4,
      className = "",
      containerClassName = "",
      ...props
    },
    ref,
  ) => {
    const textareaClasses = `
    w-full px-4 py-3 border rounded-lg transition-colors duration-200 outline-none resize-none
    ${
      error
        ? "border-red-300 focus:border-red-500 focus:ring-1 focus:ring-red-500"
        : "border-gray-300 focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
    }
    ${className}
  `;

    return (
      <div className={containerClassName}>
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {label}
          </label>
        )}

        <textarea
          ref={ref}
          rows={rows}
          className={textareaClasses}
          {...props}
        />

        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}

        {helperText && !error && (
          <p className="mt-1 text-sm text-gray-500">{helperText}</p>
        )}
      </div>
    );
  },
);

TextArea.displayName = "TextArea";

export const Select = forwardRef(
  (
    {
      label,
      error,
      helperText,
      options = [],
      placeholder = "Select an option",
      className = "",
      containerClassName = "",
      ...props
    },
    ref,
  ) => {
    const selectClasses = `
    w-full px-4 py-3 border rounded-lg transition-colors duration-200 outline-none bg-white
    ${
      error
        ? "border-red-300 focus:border-red-500 focus:ring-1 focus:ring-red-500"
        : "border-gray-300 focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
    }
    ${className}
  `;

    return (
      <div className={containerClassName}>
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {label}
          </label>
        )}

        <select ref={ref} className={selectClasses} {...props}>
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}

        {helperText && !error && (
          <p className="mt-1 text-sm text-gray-500">{helperText}</p>
        )}
      </div>
    );
  },
);

Select.displayName = "Select";

export default Input;
