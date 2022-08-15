export const InputText = ({
  name,
  label,
  isRequired = false,
  placeholder,
  register,
  error,
  value,
  disabled = false,
}) => {
  return (
    <div className="flex flex-1 flex-col w-full">
      <div className="flex flex-1 flex-row h-3">
        <label className="font-semibold text-sm leading-18px">{label}</label>
        {isRequired && <span className="text-red-500 text-base leading-18px">*</span>}
      </div>
      <input
        name={name}
        type="text"
        className={`
          block
          w-full
          px-2
          py-1
          text-base
          font-normal
          text-gray-700
          bg-transparent bg-clip-padding
          border border-solid
          ${error ? "border-red-500" : " border-gray-300"}
          ${disabled === true ? 'bg-disable_bg_color' : 'bg-transparent'}
          rounded
          transition
          ease-in-out
          m-0
          focus:text-gray-700 focus:bg-transparent focus:border-blue-700 focus:outline-none
        `}
        placeholder={placeholder ? placeholder : label}
        aria-required={isRequired}
        {...register?.(name, { required: isRequired, value })}
      />
    </div>
  );
};
