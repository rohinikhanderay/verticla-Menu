// import { InputText } from "./InputText";
import DeleteIcon from '../../assets/images/icons/trash.svg';
import AddIcon from '../../assets/images/icons/add.svg';
import React, { useState, useEffect, useRef } from 'react';
import CloseIcon from '../../assets/images/icons/close_icon.svg';
import { WithContext as ReactTags } from 'react-tag-input';

const KeyCodes = {
  comma: 188,
  enter: 13
};
const delimiters = [KeyCodes.comma, KeyCodes.enter];

export const SkillsEdit = ({ onConfirm, onClose, editData, type }) => {
  const [tags, setTags] = useState([]);
  const [disableSave, setDisableSave] = useState(true);
  const [doSave, setDoSave] = useState(false);
  const handleDelete = i => {
    const arr = tags.filter((tag, index) => index !== i);
    setTags([...arr]);
    setDoSave(true);
  };

  const handleAddition = tag => {
    setTags([...tags, tag]);
    setDoSave(true);
  };

  const setTagsData = () => {
    setTags(editData.map((e) => ({ id: e, text: e })));
  }
  useEffect(() => {
    if (doSave) {
      if ((editData?.length > 0 && tags.length !== editData?.length) || tags.length > 0) {
        setDisableSave(false)
      } else setDisableSave(true)
      setDoSave(false);
    }
  }, [tags])

  useEffect(() => {
    if (editData?.length > 0) {
      setTagsData();
    }
  }, [editData])
  return (
    <div
      className={`fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity overflow-auto w-full h-full outline-none z-40`}
    >
      <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-40 outline-none focus:outline-none">
        <div className="relative mx-auto max-w-3xl xs:w-full sm:w-4/5 md:w-4/5 w-2/5 xs:h-screen">
          <div className="border-0 md:rounded-lg shadow-lg relative flex flex-col w-full h-full bg-white outline-none focus:outline-none">
            <div className="flex items-start justify-between p-5 border-b border-solid border-gray-200 md:rounded-t shadow-modal_header">
              <h5
                className="text-xl font-medium leading-normal text-gray-800"
                id="exampleModalCenteredScrollableLabel"
              >
                {type === 'add' ? 'Add' : 'Edit'} Skills
              </h5>
              <button
                type="button"
                onClick={() => onClose(type)}
                className="btn-close box-content w-5 h-5 py-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
              >
                <img src={CloseIcon} alt="close-icon" />
              </button>
            </div>
              <div className="relative overflow-y-auto p-6 pb-10 xs:p-4 xs:h-83vh md:h-auto md:max-h-70vh">
              <div className="flex flex-1 items-start flex-col">
                  <label className="font-semibold text-lg leading-6">Skills</label>
                  <ReactTags
                    tags={tags}
                    delimiters={delimiters}
                    handleDelete={handleDelete}
                    handleAddition={handleAddition}
                    inputFieldPosition="bottom"
                    autocomplete
                    placeholder="What special skills do you want to highlight?"
                  />
                </div>
              </div>
              <div className="md:flex items-center justify-between p-6 border-t border-solid border-gray-200 md:rounded-b xs:hidden shadow-modal_footer">
                <div className="">
                </div>
                <div className="">
                  <button
                    type="button"
                    className="bg-white text-teal-700 rounded-3xl px-6 py-1 font-normal border border-teal-700 mr-4"
                    onClick={() => onClose(type)}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="bg-teal-600 text-white rounded-3xl px-4 py-1 font-normal"
                    onClick={() => onConfirm(tags, type)}
                  disabled={disableSave}
                  >
                    Save
                  </button>
                </div>
              </div>
              <div className="md:hidden items-center justify-end p-6 border-t border-solid border-gray-200 rounded-b xs:block shadow-modal_footer">
                <button
                  type="button"
                  className="bg-teal-600 w-full text-white rounded-3xl px-4 py-1 font-normal"
                  onClick={() => onConfirm(tags, type)}
                  disabled={disableSave}
                >
                  Save
                </button>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};
