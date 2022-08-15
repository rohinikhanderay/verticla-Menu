import DatePicker from "react-multi-date-picker"
import "react-multi-date-picker/styles/colors/teal.css"
import CalendarIcon from '../../assets/images/icons/calendar.svg';

export const InputMonthYearSelect = ({
    label,
    onChange,
    isRequired = false,
    value,
    disabled = false,
    error,
    format,
}) => {
    return (
        <div className="flex flex-1 flex-col w-full gap-[2px]">
            <div className="flex flex-1 flex-row h-3">
                <label className="font-semibold text-sm leading-18px">{label}</label>
                {label && isRequired && <span className="text-red-500 text-base leading-18px">*</span>}
            </div>
            <div className="relative flex flex-1 flex-col w-full">
                <img src={CalendarIcon} className="absolute top-2 left-2.5" alt="calendar-icon" width="20" height="20" />
                <DatePicker
                    value={(!disabled && value) || ''}
                    onChange={(date) => {
                        onChange(date?.isValid ? date : "");
                    }}
                    disabled={disabled}
                    placeholder={label}
                    format={format}
                    inputClass={`
                      block
                      w-full
                      h-9
                      pl-10
                      pr-2
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
                    onlyMonthPicker
                    className="teal"
                />
            </div>
        </div>
    );
};
