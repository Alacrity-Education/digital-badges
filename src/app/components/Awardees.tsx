"use client"
import React, { useState } from 'react';
import Navbar from './Navbar';

const AwardeesPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [action, setAction] = useState(null);
  const [selectedAwardeeName, setSelectedAwardeeName] = useState('');
  const [awardees, setAwardees] = useState([
    { id: 1, name: 'Zoe Davis' },
    { id: 2, name: 'Alice Smith' },
    { id: 3, name: 'Charlie Brown' },
    { id: 4, name: 'David Evans' },
    { id: 5, name: 'Fiona Green' },
  ]);
  const [sortOrder, setSortOrder] = useState('none');
  const [searchQuery, setSearchQuery] = useState('');

  const handleAddAwardee = () => {
    const newAwardeeName = `New Awardee ${Math.random().toString(36).substring(7)}`;
    const newAwardee = {
      id: awardees.length + 1,
      name: newAwardeeName,
    };
    setAwardees([...awardees, newAwardee]);
  };

  const handleDeleteAwardee = (id) => {
    const updatedAwardees = awardees.filter(awardee => awardee.id !== id);
    setAwardees(updatedAwardees);
  };

  const handleSort = (order) => {
    setSortOrder(order);
    const sortedAwardees = [...awardees].sort((a, b) => {
      if (order === 'a-z') {
        return a.name.localeCompare(b.name);
      } else if (order === 'z-a') {
        return b.name.localeCompare(a.name);
      }
      return 0;
    });
    setAwardees(sortedAwardees);
  };

  const openPopup = (actionType) => {
    setAction(actionType);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setAction(null);
  };

  const confirmAction = () => {
    alert(`Action Confirmed: ${action} badge for ${selectedAwardeeName}`);
    closePopup();
  };
  
  // Filter awardees based on the search query
  const filteredAwardees = awardees.filter(awardee =>
    awardee.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-gray-100 min-h-screen relative text-black">
      <Navbar />
      <div className="p-4">
        {/* Search and Filter Section */}
        <div className="flex items-center space-x-2 mb-6">
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Search For Awardee"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            />
          </div>
          <div className="relative">
            <select
              onChange={(e) => handleSort(e.target.value)}
              className="p-3 rounded-lg bg-white border border-gray-300 font-bold"
            >
              <option value="none">FILTER</option>
              <option value="a-z">Name (A-Z)</option>
              <option value="z-a">Name (Z-A)</option>
            </select>
          </div>
        </div>

        {/* Awardee List */}
        <div className="space-y-4">
          {filteredAwardees.map((awardee) => (
            <div
              key={awardee.id}
              className="flex items-center justify-between bg-white p-4 rounded-lg shadow"
            >
              <span className="font-medium text-lg text-black">{awardee.name}</span>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => {
                    setSelectedAwardeeName(awardee.name);
                    setIsModalOpen(true);
                  }}
                  className="px-4 py-2 text-white bg-black rounded-lg font-bold"
                >
                  ACTIONS
                </button>
                <button
                  onClick={() => handleDeleteAwardee(awardee.id)}
                  className="text-white p-2 rounded-lg bg-accent"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 48 48" fill="#FFFFFF">
                    <path d="M34,44H14c-2.2,0-4-1.8-4-4V10c0-2.2,1.8-4,4-4h4.4c0.8-1.5,2.4-2.5,4.3-2.5h1.9c1.9,0,3.5,1.1,4.3,2.5H34c2.2,0,4,1.8,4,4v30C38,42.2,36.2,44,34,44z M12,10c0-1.1,0.9-2,2-2h3.9c-0.1,0.5-0.2,1-0.2,1.5c0,1.9,1.6,3.5,3.5,3.5h1.9c1.9,0,3.5-1.6,3.5-3.5c0-0.5-0.1-1-0.2-1H34c1.1,0,2,0.9,2,2v30c0,1.1-0.9,2-2,2H14c-1.1,0-2-0.9-2-2V10z M22,17c-0.6,0-1,0.4-1,1v16c0,0.6,0.4,1,1,1s1-0.4,1-1V18C23,17.4,22.6,17,22,17z M18,17c-0.6,0-1,0.4-1,1v16c0,0.6,0.4,1,1,1s1-0.4,1-1V18C19,17.4,18.6,17,18,17z M26,17c-0.6,0-1,0.4-1,1v16c0,0.6,0.4,1,1,1s1-0.4,1-1V18C27,17.4,26.6,17,26,17z M30,17c-0.6,0-1,0.4-1,1v16c0,0.6,0.4,1,1,1s1-0.4,1-1V18C31,17.4,30.6,17,30,17z"/>
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Add Awardee Button */}
        <div className="flex justify-center mt-8">
          <button
            onClick={handleAddAwardee}
            className="w-full md:w-1/2 bg-black text-white font-bold text-lg py-4 rounded-lg"
          >
            ADD AWARDEE
          </button>
        </div>
      </div>

      {/* Main Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-end justify-center z-50">
          <div className="bg-white rounded-t-3xl p-6 w-full transform transition-transform duration-300 ease-in-out">
            <h2 className="text-xl font-bold text-center mb-6 text-black">{selectedAwardeeName}</h2>

            {/* Badge List */}
            <div className="space-y-4 mb-6">
              <div className="flex items-center justify-between border-b pb-4">
                <span className="font-medium text-black">Badge 1</span>
                <div className="space-x-2">
                  <button onClick={() => openPopup('grant')} className="bg-accent-content text-white px-4 py-2 rounded-lg">
                    GRANT
                  </button>
                  <button onClick={() => openPopup('revoke')} className="bg-accent text-white px-4 py-2 rounded-lg">
                    REVOKE
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between border-b pb-4">
                <span className="font-medium text-black">Badge 2</span>
                <div className="space-x-2">
                  <button onClick={() => openPopup('grant')} className="bg-accent-content text-white px-4 py-2 rounded-lg">
                    GRANT
                  </button>
                  <button onClick={() => openPopup('revoke')} className="bg-accent text-white px-4 py-2 rounded-lg">
                    REVOKE
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium text-black">Badge 3</span>
                <div className="space-x-2">
                  <button onClick={() => openPopup('grant')} className="bg-accent-content text-white px-4 py-2 rounded-lg">
                    GRANT
                  </button>
                  <button onClick={() => openPopup('revoke')} className="bg-accent text-white px-4 py-2 rounded-lg">
                    REVOKE
                  </button>
                </div>
              </div>
            </div>

            {/* Modal Action Buttons */}
            <div className="flex space-x-4 mt-6">
              <button className="flex-1 bg-accent text-white font-bold py-3 rounded-lg">
                REVOKE ALL
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="flex-1 bg-gray-300 text-black font-bold py-3 rounded-lg"
              >
                CLOSE
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Pop-up */}
      {isPopupOpen && (
        <div className="fixed inset-0 bg-black/50  flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center mx-4">
            <h3 className="text-xl font-bold mb-4">Confirm Action</h3>
            <p className="mb-6">
              Are you sure you want to <span className="font-bold text-lg">{action}</span> a badge for{" "}
              <span className="font-bold">{selectedAwardeeName}</span>?
            </p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={closePopup}
                className="px-4 py-2 bg-gray-300 text-black rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={confirmAction}
                className="px-4 py-2 bg-info text-white rounded-lg"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AwardeesPage;