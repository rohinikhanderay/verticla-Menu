const options = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const InputMonthSelect = ({
  label,
  register,
  name,
  isRequired = false,
  error,
  value,
  disabled = false,
}) => {
  return (
    <div className="flex flex-1 flex-col w-full gap-[2px]">
      <div className="flex flex-1 flex-row h-3">
      <label className="font-semibold text-sm leading-18px">{label}</label>
        {label && isRequired && <span className="text-red-500 text-base leading-18px">*</span>}
      </div>
      <select
        className={`
          block
          w-full
          px-2
          py-1
          text-sm
          font-normal
          text-gray-700
          ${disabled === true ? 'bg-disable_bg_color' : 'bg-transparent'}
          bg-clip-padding bg-no-repeat
          border border-solid ${error ? "border-red-500" : "border-gray-300"}
          rounded
          transition
          ease-in-out
          m-0
          focus:text-gray-700 focus:bg-transparent focus:border-blue-700 focus:outline-none`}
        aria-label=".form-select-sm example"
        aria-required={isRequired}
        {...register?.(name, { required: isRequired, value, disabled})}
      >
        <option value={""}>Select...</option>
        {options.map((option, index) => {
          return (
            <option key={index} value={option}>
              {option}
            </option>
          );
        })}
      </select>
    </div>
  );
};
