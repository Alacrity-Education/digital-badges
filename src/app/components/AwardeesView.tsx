"use client"
import React, { useEffect, useState } from 'react';
import { Awardee } from '../models/Awardee';
import createAwardeesModal from './AwardeesModal';

const AwardeesView = ({ awardees }: { awardees: Awardee[] }) => {

  enum SortOrder {
    NONE = 'none',
    A_Z = 'a-z',
    Z_A = 'z-a'
  }


  const [sortOrder, setSortOrder] = useState<SortOrder>(SortOrder.NONE);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [awardeeList, setAwardeeList] = useState<Awardee[]>(awardees);

  const handleSortAndFilter = () => {
    setAwardeeList([...awardees].sort((a, b) => {
      if (sortOrder === 'a-z') {
        return a.name.localeCompare(b.name);
      } else if (sortOrder === 'z-a') {
        return b.name.localeCompare(a.name);
      }
      return 0;
    }).filter(awardee =>
      awardee.name.toLowerCase().includes(searchQuery.toLowerCase())
    ));
  };

  // use useEffect to update awardeeList when sortOrder or searchQuery changes
  useEffect(
    () => {
      handleSortAndFilter();
    }, [sortOrder, searchQuery, awardees]
  )


  return (
    <div className="p-4">
      {/* Search and Filter Section */}
      <div className="flex items-center space-x-2 mb-6">

        <input
          type="text"
          placeholder="Search For Awardee"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value)
          }}
          className="w-full grow input"
        />

        <select
          onChange={(e) => {
            setSortOrder(e.target.value as SortOrder)
          }}
          className="select"
        >
          {Object.values(SortOrder).map((order) => (
            <option key={order} value={order}>
              {order === SortOrder.NONE ? 'FILTER' : `Name (${order.toUpperCase()})`}
            </option>
          ))}
        </select>

      </div>

      {/* Awardee List */}
      <div className="space-y-4">
        {awardeeList.map((awardee) => {



          const [AwardeeModalButton, AwardeeModal] = createAwardeesModal({ modalId: `awardee-modal-${awardee.id}`, badges: [], awardeeName: awardee.name });


          return (
            <div
              key={awardee.id}
              className="flex items-center border  bg-white p-4 rounded-lg shadow-xl"
            >
              <span className="font-medium text-lg text-black">{awardee.name}</span>
              <div className=' grow'> </div>

              <div className="flex items-center space-x-2">
                <AwardeeModalButton
                  className="btn btn-neutral  font-bold hover:-translate-y-1 transition-all"
                >
                  ACTIONS
                </AwardeeModalButton>

              </div>
              <AwardeeModal> </AwardeeModal>
            </div>
          )
        })}
      </div>

      {/* Add Awardee Button */}
      <div className="flex justify-center mt-8 fixed bottom-5 left-5 right-5">
        <button
          // onClick={handleAddAwardee}
          className=" sm:w-sm btn-neutral font-bold  btn btn-block "
        >
          GRANT BADGE
        </button>
      </div>
    </div>
  )
}

export default AwardeesView;