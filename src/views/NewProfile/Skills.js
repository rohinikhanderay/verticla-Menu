import React, { useEffect } from "react";
import { SkillsEdit } from "./SkillsEdit";
import EditIcon from '../../assets/images/icons/edit.svg';
import AddIcon from '../../assets/images/icons/add.svg';
import SkillsIcon from '../../assets/images/icons/Skills.svg';
import { useSetState } from "react-use";
import { useDispatch } from "react-redux";
import { updateUserDetails } from "../../store/profile";
import { ToastContainer, toast } from 'react-toastify';
import {
    VIEW_PROFILE,
} from '../../store/profile/types';

export const Skills = ({ selectedProfile }) => {
    const [isSkillEditOpen, setIsSkillEditOpen] = React.useState(false);
    const [isSkillAddOpen, setIsSkillAddOpen] = React.useState(false);
    const [editData, setEditData] = React.useState(null);
    const dispatch = useDispatch();
    const onClose = (type) => {
        if (type === 'add') {
            setIsSkillAddOpen(false);
            return;
        }
        if (type === 'edit') {
            setEditData(null);
            setIsSkillEditOpen(false);
            return;
        }
    };
    const onSave = async (data, type, id) => {
        const skills = selectedProfile?.skills?.length ? [...selectedProfile?.skills] : [];
        const reqskills = data.map((e) => e.text);
        const res = await dispatch(
            updateUserDetails({
                role: selectedProfile?.userRef.role,
                skills: type === 'add' ? [...skills, ...reqskills] : [...reqskills],
            }),
        )
        if (res?.success) {
            dispatch({
                type: VIEW_PROFILE,
                payload: res.data,
            });
            setTimeout(() => {
                toast.success('Profile successfully updated');
                if (type === 'edit') {
                    setEditData(null);
                    setIsSkillEditOpen(false);
                    return;
                }
                if (type === 'add') {
                    if (isSkillEditOpen) onEdit(res?.data?.skills);
                    setIsSkillAddOpen(false);
                    return;
                }
            }, 2000)
        } else {
            toast.error(res?.data?.error);
        }

    };
    const onEdit = (skills) => {
        setEditData(skills?.length > 0 ? [...skills] : []);
        setIsSkillEditOpen(true);
    };
    return (
        <>
            <div className="flex flex-1 flex-col shrink-0 border md:rounded-xl md:shadow-lg xs:py-6 xs:px-4 md:p-10 bg-white">
                <ToastContainer />
                <div>
                    <div className="flex flex-1 justify-between items-center">
                        <h4 className="text-2xl leading-8 font-bold">Skills</h4>
                        {selectedProfile?.skills?.length > 0 && (
                        <button
                            className="text-white border-2 rounded-full border-teal-700 flex pl-2 pr-3 py-1"
                            onClick={() => setIsSkillAddOpen(true)}
                        >
                            <img src={AddIcon} alt="edit-icon" /><span className="text-teal-700 font-normal">Add Skills</span>
                        </button>
                        )}
                    </div>
                    {selectedProfile?.skills?.length > 0 &&
                        (<div className="grid mt-4">
                            <div className="flex flex-1 flex-row gap-4 pt-4">
                                <div className="shrink-0">
                                    <img className="h-14 w-14 rounded" src={SkillsIcon} alt="career" />
                                </div>
                                <div className="w-full">
                                    <div className="flex flex-1 gap-2 py-4">
                                        {selectedProfile?.skills && selectedProfile?.skills.map(
                                            (skill, skillIndex) => {
                                                return (
                                                    <span
                                                        key={`res_${skillIndex}`}
                                                        className="text-base inline-block py-1 px-2.5 leading-5 text-center font-semibold bg-bg_yellow text-black rounded border border-border_yellow"
                                                    >
                                                        {skill}
                                                    </span>
                                                );
                                            }
                                        )}
                                    </div>
                                </div>
                                <button className="text-white"><img alt="Edit-Button-Icon" src={EditIcon} onClick={() => onEdit(selectedProfile?.skills)} /></button>
                            </div>
                        </div>
                        )}
                    {isSkillEditOpen && (
                        <SkillsEdit onClose={onClose} onConfirm={onSave} editData={editData} type='edit' />
                    )}
                    {!selectedProfile?.skills?.length && (<div className="py-4">
                        <div className="font-normal mb-2 text-lg leading-6">What special skills do you want to highlight?</div>
                        <button
                            className="text-white border-2 rounded-full border-teal-700 flex pl-2 pr-3 py-1"
                            onClick={() => setIsSkillAddOpen(true)}
                        >
                            <img src={AddIcon} alt="edit-icon" /><span className="text-teal-700 font-normal">Add Skills</span>
                        </button>
                    </div>)}
                    {isSkillAddOpen && (
                        <SkillsEdit onClose={onClose} onConfirm={onSave} editData={[]} type='add' />
                    )}
                </div>
            </div>
        </>
    );
};
