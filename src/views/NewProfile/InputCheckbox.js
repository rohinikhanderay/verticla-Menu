export const InputCheckbox = ({
  label,
  register,
  name,
  isRequired = false,
  error,
  value,
  checked,
  disabled = false,
}) => {
  return (
      <div className="flex flex-1 flex-row w-full">
      <input
        className={`h-4 w-4 border border-gray-300 rounded-sm text-black-500 bg-transparent hover:bg-black-700 
        border border-solid ${error ? "border-red-500" : "border-gray-300"}
        ${disabled === true ? 'bg-disable_bg_color' : 'bg-transparent'}
        checked:bg-teal-700 checked:border-black-700 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer`}
        type="checkbox"
        aria-required={isRequired}
        {...register?.(name, { required: isRequired, value, disabled, checked })}
      />
      <label className="font-normal text-lg leading-6">{label}</label>
      </div>
  );
};
