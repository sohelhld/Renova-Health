'use client';

import FormInput from '@/app/components/FormInput/FormInput';
import React, { useState } from 'react';
// import FormInput from './FormInput';

const ProfileForm: React.FC = () => {
    const [profileImage, setProfileImage] = useState<File | null>(null);
    const [name, setName] = useState('Emily');
    const [email, setEmail] = useState('emily@gmail.com');
    const [contact, setContact] = useState('+91 98765 64379');
    const [location, setLocation] = useState('');
    const [aboutMe, setAboutMe] = useState('');

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files ? event.target.files[0] : null;
        setProfileImage(file);
    };

    const handleRemoveImage = () => {
        setProfileImage(null);
    };

    // const handleSave = () => {
    //     console.log('Form saved');
    // };

    // const handleCancel = () => {
    //     console.log('Form canceled');
    // };

    return (
        <div className="w-full max-w-2xl mx-auto p-8 bg-white rounded-lg  text-gray-500">
            <h1 className="text-xl font-semibold mb-6">Profile Photo</h1>

            {/* Profile Image Upload Section */}
            <div className="flex items-start gap-6 mb-4">
                {profileImage ? (
                    <img
                        src={URL.createObjectURL(profileImage)}
                        alt="Profile"
                        className="w-36 h-36 object-cover "
                    />
                ) : (
                    <div className="w-28 h-28 bg-gray-200 flex items-center justify-center ">
                        <span className="text-gray-500">No Image</span>
                    </div>
                )}
                <div className="flex flex-col">
                    <p className="font-medium text-gray-800 mb-1">Upload your photo</p>
                    <p className="text-sm text-gray-600 mb-3">Your photo should be in PNG or JPG format</p>
                    <div className="flex items-center gap-5">
                        <label className="bg-white border border-gray-700 text-gray-700 px-4 py-1 rounded-lg cursor-pointer hover:bg-gray-100">
                            Choose image
                            <input
                                type="file"
                                accept="image/png, image/jpeg"
                                className="hidden"
                                onChange={handleImageChange}
                            />
                        </label>
                        {profileImage && (
                            <button
                                onClick={handleRemoveImage}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                Remove
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Form Fields using FormInput component */}
            <div className="space-y-3">
                <FormInput
                    label="Name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                />
                <FormInput
                    label="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                />
                <FormInput
                    label="Contact No."
                    type="tel"
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    placeholder="Enter your contact number"
                />

                {/* Location Dropdown */}
                <div className="w-full">
                    <label className="block text-lg font-semibold text-gray-700 mb-1">Location</label>
                    <select
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md bg-gray-100 h-[46px] text-gray-500"
                    >
                        <option value="">-Select your country-</option>
                        <option value="India">India</option>
                        <option value="USA">USA</option>
                        <option value="Canada">Canada</option>
                        <option value="Australia">Australia</option>
                    </select>
                </div>

                {/* About Me Textarea */}
                <div className="w-full">
                    <label className="block text-lg font-semibold text-gray-700 mb-1">About me</label>
                    <textarea
                        value={aboutMe}
                        onChange={(e) => setAboutMe(e.target.value)}
                        placeholder="Tell something about yourself"
                        className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md bg-gray-100 h-28"
                    />
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center space-x-3 gap-11 pt-8">
                <button
                    type="button"
                    // onClick={onClose}
                    className="bg-gray-300 text-gray-700 px-6 py-2 rounded-md font-medium hover:bg-gray-400 transition w-[129px]"
                >
                    Cancel
                </button>

                <button
                    type="submit"
                    className="bg-gray-800 text-white px-6 py-2 rounded-md font-medium hover:bg-blue-900 transition w-[129px]"
                >
                    Register
                </button>
            </div>
        </div>
    );
};

export default ProfileForm;
