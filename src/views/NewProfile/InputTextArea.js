export const InputTextArea = ({
  label,
  register,
  name,
  isRequired = false,
  error,
  value,
  disabled = false,
}) => {
  return (
    <div className="flex flex-1 flex-col w-full ">
      <div className="flex flex-1 flex-row h-3">
      <label className="font-semibold text-sm leading-18px">{label}</label>
        {isRequired && <span className="text-red-500 text-base leading-18px">*</span>}
      </div>
      <textarea
        className={`
        block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-transparent bg-clip-padding
        border border-solid ${error ? "border-red-500" : "border-gray-300"}
        ${disabled === true ? 'bg-disable_bg_color' : 'bg-transparent'}
        rounded
        transition
        ease-in-out
        m-0
        resize-none
        focus:text-gray-700 focus:bg-transparent focus:border-blue-600 focus:outline-none
      `}
        id="exampleFormControlTextarea1"
        rows={3}
        placeholder={label}
        aria-required={isRequired}
        {...register?.(name, { required: isRequired, value })}
      ></textarea>
    </div>
  );
};
