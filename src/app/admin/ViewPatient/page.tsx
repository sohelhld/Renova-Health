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

type Patient = {
    id: number;
    name: string;
    patientId: string;
    lastCalled: string;
};

const patientsData: Patient[] = [
    { id: 1, name: "Elizabeth Lee", patientId: "lbmc001", lastCalled: "20/12/2024, 5:30pm" },
    { id: 2, name: "Carlos Garcia", patientId: "lbmc002", lastCalled: "20/12/2024, 5:30pm" },
    { id: 3, name: "Elizabeth Bailey", patientId: "lbmc003", lastCalled: "20/12/2024, 5:30pm" },
    { id: 4, name: "Ryan Brown", patientId: "lbmc004", lastCalled: "20/12/2024, 5:30pm" },
    { id: 5, name: "Ryan Young", patientId: "lbmc005", lastCalled: "20/12/2024, 5:30pm" },
    { id: 6, name: "Hailey Adams", patientId: "lbmc006", lastCalled: "20/12/2024, 5:30pm" },
    { id: 7, name: "Ashley Anderson", patientId: "lbmc007", lastCalled: "20/12/2024, 5:30pm" },
    { id: 8, name: "Emma Wilson", patientId: "lbmc008", lastCalled: "20/12/2024, 5:30pm" },
    { id: 9, name: "Hailey Adams", patientId: "lbmc009", lastCalled: "20/12/2024, 5:30pm" },
];

const ViewPatient: React.FC = () => {
    const [selectedPatientId, setSelectedPatientId] = useState<number | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const dropdownRef = useRef<HTMLDivElement | null>(null);
    // const [isModalOpen, setIsModalOpen] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
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


    const handleArchiveClick = (user: Patient): void => {
        setSelectedPatient(user);
        setShowDeleteModal(true);
    };
    // Function to close the modal
    const closeDeleteModal = () => {
        setShowDeleteModal(false);
        setSelectedPatient(null);
    };

    const confirmDelete = () => {
        if (selectedPatient) {
            console.log(`Archived user: ${selectedPatient.name}`);
        }
        closeDeleteModal();
    };

    const toggleDropdown = (id: number) => {
        setSelectedPatientId(selectedPatientId === id ? null : id);
    };

    const totalPages = 11;

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setSelectedPatientId(null);
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
            <div className="pb-2 mb-4">
                <h1 className="text-4xl font-semibold text-gray-800">Patient List</h1>
            </div>

            <UserHeader title="Users" onAddUser={handleOpenAddUserModal} onUploadUser={handleOpenBulkUploadModal} label={"Add Patient"} uploadLabel={"Import Patient"} />


            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200 rounded-xl shadow-sm">
                    <thead>
                        <tr className="min-w-full bg-gray-100 border-b">
                            <th className="py-3 px-4 text-left font-semibold text-gray-600">Sl No</th>
                            <th className="py-3 px-4 text-left font-semibold text-gray-600">Name</th>
                            <th className="py-3 px-4 text-left font-semibold text-gray-600">Patient ID</th>
                            <th className="py-3 px-4 text-left font-semibold text-gray-600">Last called</th>
                            <th className="py-3 px-4 text-center font-semibold text-gray-600">Edit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {patientsData.map((patient, index) => (
                            <tr key={patient.id} className="hover:bg-gray-100 border-b">
                                <td className="py-3 text-gray-900 px-4 text-left font-semibold">{index + 1}</td>
                                <td className="py-3 text-gray-900 px-4 text-left font-semibold">{patient.name}</td>
                                <td className="py-3 text-gray-900 px-4 text-left font-semibold">{patient.patientId}</td>
                                <td className="py-3 text-gray-900 px-4 text-left">{patient.lastCalled}</td>
                                <td className="py-3 text-gray-900 px-4 text-center relative">
                                    <button
                                        onClick={() => toggleDropdown(patient.id)}
                                        className="text-gray-600 hover:text-gray-800 focus:outline-none"
                                    >
                                        <BsThreeDots size={20} />
                                    </button>
                                    {selectedPatientId === patient.id && (
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
                                                    onClick={() => handleArchiveClick(patient)}
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
                <AddUserForm onClose={handleCloseAddUserModal} title="Add Patient" />
            </Modal>

            {/* Bulk Upload User Modal */}
            <Modal isOpen={isBulkUploadModalOpen} onClose={handleCloseBulkUploadModal}>
                <UploadUserFrom onClose={handleCloseBulkUploadModal}  title="Bulk Upload Patient" />
            </Modal>

            {showDeleteModal && selectedPatient && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">

                    <ArchiveModal
                        title="Delete Patient(s)"
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

export default ViewPatient;
