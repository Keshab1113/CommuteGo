import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './select';

const SimpleSelect = ({
  value,
  onChange,
  options,
  placeholder,
  className,
  triggerClassName,
  required,
}) => {
  return (
    <div className="relative">
      {required && (
        <input
          type="text"
          required
          value={value || ''}
          onChange={() => {}}
          className="absolute inset-0 opacity-0 pointer-events-none"
          aria-hidden="true"
        />
      )}
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className={triggerClassName}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent className={className}>
          {options.map((option) => {
            const optionValue = typeof option === 'string' ? option : option.value;
            const optionLabel = typeof option === 'string' ? option : option.label;
            return (
              <SelectItem key={optionValue} value={optionValue}>
                {optionLabel}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </div>
  );
};

export default SimpleSelect;
