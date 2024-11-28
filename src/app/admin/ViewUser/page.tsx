'use client';

import React, { useState, useEffect, useRef } from 'react';
import { AiOutlineEdit, AiOutlineStop } from 'react-icons/ai';
import { BiArchive } from 'react-icons/bi';
import { BsThreeDots } from "react-icons/bs";
import Modal from '@/app/components/Modal/Modal';
import ArchiveModal from '@/app/components/Archive/ArchiveModal';
import UserHeader from '../../components/Header';
import Pagination from '../../components/Pagination';
import AddUserForm from '../../components/Form/AddForm';
import UploadUserFrom from '../../components/Form/UploadFrom';

type User = {
    id: number;
    name: string;
    userId: string;
    patientsReached: number;
    callsMade: number;
    timeouts: number;
    
};

const usersData: User[] = [
    { id: 1, name: "Elizabeth Lee", userId: "lbmc001", patientsReached: 200, callsMade: 400, timeouts: 0 },
    { id: 2, name: "Carlos Garcia", userId: "lbmc002", patientsReached: 200, callsMade: 400, timeouts: 0 },
    { id: 3, name: "Elizabeth Bailey", userId: "lbmc003", patientsReached: 400, callsMade: 400, timeouts: 0 },
    { id: 4, name: "Ryan Brown", userId: "lbmc004", patientsReached: 200, callsMade: 400, timeouts: 0 },
    { id: 5, name: "Elizabeth Lee", userId: "lbmc001", patientsReached: 200, callsMade: 400, timeouts: 0 },
    { id: 6, name: "Carlos Garcia", userId: "lbmc002", patientsReached: 200, callsMade: 400, timeouts: 0 },
    { id: 7, name: "Elizabeth Bailey", userId: "lbmc003", patientsReached: 400, callsMade: 400, timeouts: 0 },
    { id: 8, name: "Ryan Brown", userId: "lbmc004", patientsReached: 200, callsMade: 400, timeouts: 0 },
];

const ViewUser: React.FC = () => {
    const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const dropdownRef = useRef<HTMLDivElement | null>(null);
    // const [isModalOpen, setIsModalOpen] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
    const [isBulkUploadModalOpen, setIsBulkUploadModalOpen] = useState(false);

    const handleOpenAddUserModal = () => {
        setIsAddUserModalOpen(true);
    };

    const handleCloseAddUserModal = () => {
        setIsAddUserModalOpen(false);
    };

    const handleOpenBulkUploadModal = () => {
        setIsBulkUploadModalOpen(true);
    };

    const handleCloseBulkUploadModal = () => {
        setIsBulkUploadModalOpen(false);
    };


    const handleArchiveClick = (user: User): void => {
        setSelectedUser(user);
        setShowDeleteModal(true);
    };

    const closeDeleteModal = () => {
        setShowDeleteModal(false);
        setSelectedUser(null);
    };

    const confirmDelete = () => {
        if (selectedUser) {
            console.log(`Archived user: ${selectedUser.name}`);
        }
        closeDeleteModal();
    };

    const toggleDropdown = (id: number) => {
        setSelectedUserId(selectedUserId === id ? null : id);
    };

    const totalPages = 11;

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setSelectedUserId(null);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="w-11/12 p-4 m-9">
            {/* Heading */}
            <div className="pb-2 mb-4 ">
                <h1 className="text-4xl font-semibold text-gray-800">USER LIST</h1>
            </div>


            <UserHeader title="Users" onAddUser={handleOpenAddUserModal} onUploadUser={handleOpenBulkUploadModal} label={"Add Users"} uploadLabel={"Import Users"} />

            <div className="overflow-x-auto  ">
                <table className="min-w-full bg-white border border-gray-200 rounded-xl shadow-sm">
                    <thead>
                        <tr className="min-w-full bg-gray-100 border-b">
                            <th className="py-3 px-4 text-left font-semibold text-gray-600">Sl No</th>
                            <th className="py-3 px-4 text-left font-semibold text-gray-600">Name</th>
                            <th className="py-3 px-4 text-center font-semibold text-gray-600">User ID</th>
                            <th className="py-3 px-4 text-center font-semibold text-gray-600">Patients Reached</th>
                            <th className="py-3 px-4 text-center font-semibold text-gray-600">Calls Made</th>
                            <th className="py-3 px-4 text-center font-semibold text-gray-600">Timeouts</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        {usersData.map((user, index) => (
                            <tr key={user.id} className="hover:bg-gray-300 border-b">
                                <td className="py-3 text-gray-900 px-4 text-left font-semibold">{index + 1}</td>
                                <td className="py-3 text-gray-900 px-4 text-left font-semibold">{user.name}</td>
                                <td className="py-3 text-gray-900 px-4 text-center font-semibold">{user.userId}</td>
                                <td className="py-3 text-gray-900 px-4 text-center">{user.patientsReached}</td>
                                <td className="py-3  px-4 text-red-500 font-semibold text-center">{user.callsMade}</td>
                                {/* <td className="py-3 text-gray-900 px-4">{user.timeouts}</td> */}
                                <td className="py-3 text-gray-900 px-4 text-center relative">
                                    <button
                                        onClick={() => toggleDropdown(user.id)}
                                        className="text-gray-600 hover:text-gray-800 focus:outline-none"
                                    >
                                        <BsThreeDots size={20} />
                                    </button>
                                    {selectedUserId === user.id && (
                                        <div ref={dropdownRef} className="absolute z-30 right-0 mt-2 w-32 bg-white border border-gray-200 rounded-lg shadow-lg">
                                            <ul>
                                                <li className="flex items-center py-2 px-4 hover:bg-gray-100 cursor-pointer">
                                                    <AiOutlineEdit className="mr-2" />
                                                    Edit
                                                </li>
                                                <li className="flex items-center py-2 px-4 text-red-500 hover:bg-gray-100 cursor-pointer">
                                                    <AiOutlineStop className="mr-2" />
                                                    Block
                                                </li>
                                                <li
                                                    className="flex items-center py-2 px-4 text-orange-500 hover:bg-gray-100 cursor-pointer"
                                                    onClick={() => handleArchiveClick(user)}
                                                >
                                                    <BiArchive className="mr-2" />
                                                    Archive
                                                </li>
                                            </ul>
                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />

            <Modal isOpen={isAddUserModalOpen} onClose={handleCloseAddUserModal}>
                <AddUserForm onClose={handleCloseAddUserModal} title="Add User" />
            </Modal>

            {/* Bulk Upload User Modal */}
            <Modal isOpen={isBulkUploadModalOpen} onClose={handleCloseBulkUploadModal}>
                <UploadUserFrom onClose={handleCloseBulkUploadModal}  title="Bulk Upload User" />
            </Modal>

            {showDeleteModal && selectedUser && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">

                    <ArchiveModal
                        title="Delete user(s)"
                        message="Are you sure? This process is irrevocable."
                        isOpen={showDeleteModal}
                        onClose={closeDeleteModal}
                        onConfirm={confirmDelete}
                    />
                </div>
            )}


        </div>
    );
};

export default ViewUser;
