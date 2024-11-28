'use client';

import React, { useState, useEffect, useRef } from 'react';
import { AiOutlineEdit, AiOutlineEye } from 'react-icons/ai';
import { BsThreeDots } from 'react-icons/bs';
import Modal from '@/app/components/Modal/Modal';
import ArchiveModal from '@/app/components/Archive/ArchiveModal';
import UserHeader from '@/app/components/Header';
import { BiArchive } from 'react-icons/bi';
import { FiToggleLeft, FiToggleRight } from 'react-icons/fi';
import Pagination from '../../components/Pagination';
import AddTemplateForm from '../../components/Form/AddTemplatesForm';
import UploadTemplatesFrom from '../../components/Form/UploadTemplatesFrom';

type Template = {
    id: number;
    title: string;
    status: 'Activated' | 'Deactivated';
};

const templateData: Template[] = [
    { id: 1, title: 'Elizabeth Lee', status: 'Deactivated' },
    { id: 2, title: 'Carlos Garcia', status: 'Activated' },
    { id: 3, title: 'Elizabeth Bailey', status: 'Deactivated' },
    { id: 4, title: 'Ryan Brown', status: 'Deactivated' },
    { id: 5, title: 'Ryan Young', status: 'Activated' },
    { id: 6, title: 'Hailey Adams', status: 'Activated' },
    { id: 7, title: 'Ashley Anderson', status: 'Activated' },
    { id: 8, title: 'Emma Wilson', status: 'Activated' },
    { id: 9, title: 'Hailey Adams', status: 'Activated' },
];

const ViewTemplate: React.FC = () => {
    const [selectedTemplateId, setSelectedTemplateId] = useState<number | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const dropdownRef = useRef<HTMLDivElement | null>(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
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

    const handleArchiveClick = (template: Template): void => {
        setSelectedTemplate(template);
        setShowDeleteModal(true);
    };

    const closeDeleteModal = () => {
        setShowDeleteModal(false);
        setSelectedTemplate(null);
    };

    const confirmDelete = () => {
        if (selectedTemplate) {
            console.log(`Archived template: ${selectedTemplate.title}`);
        }
        closeDeleteModal();
    };

    const toggleDropdown = (id: number) => {
        setSelectedTemplateId(selectedTemplateId === id ? null : id);
    };

    const totalPages = 11;

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setSelectedTemplateId(null);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleToggleStatus = (template: Template) => {
        template.status = template.status === 'Activated' ? 'Deactivated' : 'Activated';
        console.log(`Status changed for ${template.title}: ${template.status}`);
        setSelectedTemplateId(null);
    };

    return (
        <div className="w-11/12 p-4 m-9">
            {/* Heading */}
            <div className="pb-2 mb-4">
                <h1 className="text-4xl font-semibold text-gray-800">Template List</h1>
            </div>
            <UserHeader title="Users" onAddUser={handleOpenAddUserModal} onUploadUser={handleOpenBulkUploadModal} label={"Add Templates"} uploadLabel={"Import Template"} />

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200 rounded-xl shadow-sm">
                    <thead>
                        <tr className="min-w-full bg-gray-100 border-b">
                            <th className="py-3 px-4 text-left font-semibold text-gray-600">Sl No</th>
                            <th className="py-3 px-4 text-left font-semibold text-gray-600">Template Title</th>
                            <th className="py-3 px-4 text-center font-semibold text-gray-600">Status</th>
                            <th className="py-3 px-4 text-center font-semibold text-gray-600">Edit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {templateData.map((template, index) => (
                            <tr key={template.id} className="hover:bg-gray-100 border-b">
                                <td className="py-3 text-gray-900 px-4 text-left font-semibold">{index + 1}</td>
                                <td className="py-3 text-gray-900 px-4 text-left font-semibold">{template.title}</td>
                                <td className="py-3 text-gray-900 px-4 text-center">
                                    <span
                                        className={`px-2 py-1 rounded-full font-medium ${template.status === 'Activated'
                                            ? 'bg-blue-50 text-blue-600'
                                            : 'bg-red-50 text-red-600'
                                            }`}
                                    >
                                        {template.status}
                                    </span>
                                </td>
                                <td className="py-3 text-gray-900 px-4 text-center relative">
                                    <button
                                        onClick={() => toggleDropdown(template.id)}
                                        className="text-gray-600 hover:text-gray-800 focus:outline-none"
                                    >
                                        <BsThreeDots size={20} />
                                    </button>
                                    {selectedTemplateId === template.id && (
                                        <div
                                            ref={dropdownRef}
                                            className="absolute z-30 right-0 mt-2 w-36 bg-white border border-gray-200 rounded-lg shadow-lg"
                                        >
                                            <ul>
                                                <li
                                                    className="flex items-center py-2 px-4 hover:bg-gray-100 cursor-pointer"
                                                    onClick={() => console.log('Edit clicked')}
                                                >
                                                    <AiOutlineEdit className="mr-2" /> Edit
                                                </li>
                                                <li
                                                    className="flex items-center py-2 px-4 hover:bg-gray-100 cursor-pointer"
                                                    onClick={() => console.log('View clicked')}
                                                >
                                                    <AiOutlineEye className="mr-2" /> View
                                                </li>
                                                <li
                                                    className={`flex items-center py-2 px-4 cursor-pointer hover:bg-gray-100 ${template.status === 'Activated' ? 'text-red-600' : 'text-blue-600'
                                                        }`}
                                                    onClick={() => handleToggleStatus(template)}
                                                >
                                                    {template.status === 'Activated' ? (
                                                        <>
                                                            <FiToggleLeft className="mr-2" />
                                                            Deactivate
                                                        </>
                                                    ) : (
                                                        <>
                                                            <FiToggleRight className="mr-2" />
                                                            Activate
                                                        </>
                                                    )}
                                                </li>
                                                <li
                                                    className="flex items-center py-2 px-4 text-red-500 hover:bg-gray-100 cursor-pointer"
                                                    onClick={() => handleArchiveClick(template)}
                                                >
                                                    <BiArchive className="mr-2" /> Archive
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
                <AddTemplateForm onClose={handleCloseAddUserModal} title="Add Templates" />
            </Modal>

            {/* Bulk Upload Templates Modal */}
            <Modal isOpen={isBulkUploadModalOpen} onClose={handleCloseBulkUploadModal}>
                <UploadTemplatesFrom onClose={handleCloseBulkUploadModal} title="Bulk Upload Templates" />
            </Modal>

            {/* Archive Modal */}

            {showDeleteModal && selectedTemplate && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">

                    <ArchiveModal
                        title="Delete Templates(s)"
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

export default ViewTemplate;
