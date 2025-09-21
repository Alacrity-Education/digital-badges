"use client";

import React, { useState } from "react";
import Navbar from "./Navbar";

export default function Badge() {
  const [events, setEvents] = useState<{ id: number; name: string }[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const handleAddEvent = () => {
    const nextId = events.length + 1;
    setEvents([...events, { id: nextId, name: `Event ${nextId}` }]);
  };

  const handleDeleteEvent = (id: number) => {
    setEvents(events.filter((event) => event.id !== id));
    if (selectedId === id) setSelectedId(null);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col text-black">
      <Navbar />
      {/* Mobile Version */}
      <div className="block md:hidden pb-40">
        {/* Badge List */}
        <div className="flex flex-col space-y-4 px-4 pt-6">
          {events.map((event) => (
            <div
              key={event.id}
              className={`border-2 border-black rounded-lg px-4 py-4 ${selectedId === event.id ? "ring-2 ring-blue-500" : ""}`}
              onClick={() => setSelectedId(event.id)}
            >
              <div className="flex justify-between items-center">
                <span className="font-bold">{event.name}</span>
                <span className="font-bold text-2xl">Image</span>
              </div>
            </div>
          ))}
        </div>

        {/* Create Badge Button */}
        <div className="flex justify-center pt-8">
          <button
            className="bg-black text-white font-bold text-lg py-3 rounded-lg px-14"
            onClick={handleAddEvent}
          >
            CREATE BADGE
          </button>
        </div>

        {/* Sticky Bottom Action Bar */}
        <div className="fixed bottom-0 left-0 w-full z-50 bg-white border-t border-black rounded-t-2xl px-4 py-6">
          <div className="flex flex-col items-center space-y-4">
            <button className="w-full max-w-xs bg-accent-content text-white font-bold py-2 rounded-md">
              GRANT
            </button>
            <div className="flex w-full max-w-xs space-x-4">
              <button
                className="flex-1 bg-accent text-white font-bold py-2 rounded-md"
                onClick={() => {
                  if (selectedId !== null) handleDeleteEvent(selectedId);
                }}
                disabled={selectedId === null}
              >
                DELETE
              </button>
              <button className="flex-1 bg-info text-white font-bold py-2 rounded-md">
                EDIT
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Version */}
      <div className="hidden md:block">
        {/* Badge Grid */}
        <div className="grid grid-cols-3 gap-8 px-16 pt-12">
          {events.map((event) => (
            <div
              key={event.id}
              className="group flex flex-col justify-between border-2 border-black rounded-lg px-6 py-6 min-h-[120px] relative transition-shadow hover:shadow-lg"
            >
              <div className="flex justify-between items-center">
                <span className="font-bold">{event.name}</span>
                <span className="font-bold text-2xl">Image</span>
              </div>
              {/* Action Buttons (hidden by default, visible on hover) */}
              <div className="absolute inset-0 flex items-center justify-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none group-hover:pointer-events-auto bg-white/80">
                <button className="bg-accent text-white font-bold px-4 py-2 rounded-md">
                  GRANT
                </button>
                <button className="bg-info text-white font-bold px-4 py-2 rounded-md">
                  EDIT
                </button>
                <button
                  className="bg-accent-content text-white font-bold px-4 py-2 rounded-md"
                  onClick={() => handleDeleteEvent(event.id)}
                >
                  DELETE
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Create Badge Button */}
        <div className="flex justify-center pt-8">
          <button
            className="md:w-full bg-black text-white font-bold py-3 rounded-lg md:max-w-md md:text-2xl md:py-5"
            onClick={handleAddEvent}
          >
            CREATE BADGE
          </button>
        </div>
      </div>
    </div>
  );
}