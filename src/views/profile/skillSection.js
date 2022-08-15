import React, { useState, useEffect } from "react";
import { WithContext as ReactTags } from "react-drag-tags-input";
import { useDispatch, useSelector } from "react-redux";
import { updateUserDetails, viewProfile } from "../../store/profile/index";
const KeyCodes = {
  comma: 188,
  enter: 13,
};
const delimiters = [KeyCodes.comma, KeyCodes.enter];

const SkillSection = ({ data, id, val }) => {
  const dispatch = useDispatch();
  const [tags, setTags] = useState();

  const [dataLength, setLength] = useState(10);
  const [editSkillmodel, setEditSkillModel] = useState(false);
  const profileData = useSelector((state) => state.profile);
  const editSkillModelOpen = () => {
    setEditSkillModel(true);
  };
  const editSkillModelClose = () => {
    setEditSkillModel(false);
  };
  const handleDelete = (i) => {
    setTags(tags.filter((tag, index) => index !== i));
  };
  const handleAddition = (tag) => {
    setTags([...tags, tag]);
  };
  useEffect(() => {
    setTags(
      data?.map((item) => {
        return { id: item, text: item };
      })
    );
  }, [data, editSkillmodel]);
  const handleDrag = (tag, currPos, newPos) => {
    const newTags = [...tags].slice();
    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);
    setTags(newTags);
  };
  const handleTagClick = (index) => {
    console.log("The tag at index " + index + " was clicked");
    // tags[index].id="test"
    // tags[index].text="test"
    //onTagUpdate(index, { id: "test", text: "test" });
  };
  const onClearAll = () => {
    setTags([]);
  };

  const dataSave = () => {
    dispatch(
      updateUserDetails({
        role: profileData?.selectedProfile?.userRef.role,
        skills: tags?.map((item) => {
          return item.text;
        }),
      })
    );
    setTimeout(() => {
      dispatch(viewProfile(id));
    }, 2000);
    editSkillModelClose();
  };

  const onTagUpdate = (i, newTag) => {
    const updatedTags = tags.slice();
    updatedTags.splice(i, 1, newTag);
    setTags(updatedTags);
  };
  return (
    <div>
      <div
        className="flex justify-center h-screen items-center bg-opacity-50 bg-black antialiased fixed top-0 right-0  w-full"
        style={{ zIndex: "9999", display: editSkillmodel ? "block" : "none" }}
      >
        <div
          className="flex flex-col absolute top-2/4	right-0 left-0 w-11/12 sm:w-5/6 lg:w-1/2 max-w-2xl mx-auto rounded-lg shadow-xl"
          style={{ transform: "translateY(-50%)" }}
        >
          <div className="flex flex-row bg-teal-600 text-white justify-between p-6 bg-white border-b border-gray-200 rounded-tl-lg rounded-tr-lg">
            <p className="font-semibold text-white">Edit skills </p>
            <svg
              onClick={editSkillModelClose}
              className="w-6 h-6 cursor-pointer"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
          <div className="p-5 bg-gray-50">
            <div className="flex flex-col px-6 pb-4">
              <ReactTags
                handleDelete={handleDelete}
                handleAddition={handleAddition}
                handleDrag={handleDrag}
                delimiters={delimiters}
                handleTagClick={handleTagClick}
                onClearAll={onClearAll}
                onTagUpdate={onTagUpdate}
                placeholder="Add skill..."
                minQueryLength={2}
                autofocus={false}
                allowDeleteFromEmptyInput={true}
                autocomplete={false}
                readOnly={false}
                allowUnique={true}
                allowDragDrop={true}
                inline={true}
                allowAdditionFromPaste={true}
                editable={true}
                clearAll={true}
                tags={tags}
              />
            </div>{" "}
          </div>

          <div className="flex flex-row items-center justify-between p-5 bg-white border-t border-gray-200 rounded-bl-lg rounded-br-lg">
            <button
              onClick={editSkillModelClose}
              className="px-4 py-2 text-white font-semibold bg-red-500	rounded"
            >
              Cancel
            </button>
            <button
              //  onClick={expDataSave}
              type="submit"
              className="px-4 py-2 text-white font-semibold bg-teal-600 rounded"
              onClick={dataSave}
            >
              Save
            </button>
          </div>
        </div>
      </div>
      <div className="mb-8 items-center" style={{ display: "flex" }}>
        <h1 className="font-semibold text-4xl sm:text-3xl xs:text-2xl xs:mb-5 ">
          Skills{" "}
        </h1>
        {/* <svg
          onClick={editSkillModelOpen}
          style={{
            margin: "7px",
            cursor: "pointer",
            display: val ? "none" : "block",
          }}
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path d="M18.363 8.464l1.433 1.431-12.67 12.669-7.125 1.436 1.439-7.127 12.665-12.668 1.431 1.431-12.255 12.224-.726 3.584 3.584-.723 12.224-12.257zm-.056-8.464l-2.815 2.817 5.691 5.692 2.817-2.821-5.693-5.688zm-12.318 18.718l11.313-11.316-.705-.707-11.313 11.314.705.709z" />
        </svg> */}
        <span
          className="pen pl-2"
          onClick={editSkillModelOpen}
          style={{
            margin: "7px",
            cursor: "pointer",
            display: val ? "none" : "block",
          }}
        ></span>
      </div>
      <div className="btn-skills flex flex-wrap -ml-6 -mr-6 sm:-ml-3 sm:-mr-3 w-full">
        {data?.slice(0, dataLength)?.map((item) => {
          return (
            <div className="bt-skill pl-6 pr-6 mb-4 sm:pl-4 sm:pr-2">
              <button
                className="font-medium text-font_18 border border-black rounded-full flex  justify-center pl-5 pr-5 h-8  bg-white"
                style={{ fontSize: "18px" }}
              >
                {item}
              </button>
            </div>
          );
        })}
        {data?.length > 10 && data?.length !== dataLength ? (
          <div className="pl-6 pr-6 mb-4 sm:pl-4 sm:pr-2">
            <button
              className="font-medium text-font_18 border border-black rounded-full flex  justify-center pl-5 pr-5 h-8  bg-teal-600 text-white"
              style={{ fontSize: "18px" }}
              onClick={() => {
                setLength(data?.length);
              }}
            >
              Show more
            </button>
          </div>
        ) : data?.length != 0 && data?.length > 10 ? (
          <button
            className="font-medium text-font_18 border border-black rounded-full flex  justify-center pl-5 pr-5 h-8  bg-teal-600 text-white"
            style={{ fontSize: "18px" }}
            onClick={() => {
              setLength(10);
            }}
          >
            Show less
          </button>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};
export default SkillSection;
