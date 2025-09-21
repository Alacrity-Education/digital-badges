// Modal has a factory method called createModal
// we need to create a specific instance of the modal for Awardees

"use client";

import { Badge } from "../models/Badge";
import { createModal, modalProps } from "./Modal";

interface IAwardeesModalProps extends modalProps {
    badges: Badge[],
    awardeeName: string,
}

export default function createAwardeesModal({ awardeeName, modalId, badges }: IAwardeesModalProps) {
    const awardeesModalId = "awardees-" + modalId;
    const [ModalButton, ModalComponent] = createModal({ modalId: awardeesModalId });


    const AwardeesModal = () => (
        <ModalComponent>
            <div className="p-4">
                <h2 className="text-2xl  mb-4">Awardee <span className="font-semibold">{awardeeName}</span> badges:</h2>
                <div className="space-y-4">
                    {badges.map((badge, index) => (
                        <div key={index} className="p-4 border rounded-lg shadow-sm">
                            <h3 className="text-lg font-semibold mb-2">{badge.name}</h3>
                            <p className="text-sm text-gray-600 mb-4">{badge.description}</p>
                            <div className="flex space-x-2">
                                <button
                                    className="bg-accent-content text-white px-4 py-2 rounded-lg"
                                    onClick={() => alert(`Granting badge: ${badge.name}`)}
                                >
                                    GRANT
                                </button>
                                <button
                                    className="bg-accent text-white px-4 py-2 rounded-lg"
                                    onClick={() => alert(`Revoking badge: ${badge.name}`)}
                                >
                                    REVOKE
                                </button>
                            </div>
                        </div>
                    ))}
                    <button
                        // onClick={() => handleDeleteAwardee(awardee.id)}
                        className="btn btn-error btn-block"
                    >
                        Revoke All
                    </button>
                </div>
            </div>
        </ModalComponent>
    );

    return [ModalButton, AwardeesModal];
}