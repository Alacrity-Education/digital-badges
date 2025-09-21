"use client";

export interface modalProps {
    children?: React.ReactNode;
    modalId: string;
}

export interface createModalProps {
    modalId: string;
}

export function createModal({ modalId = "modal" }: createModalProps) {
    const modalIdUnique = "modal-" + modalId;

    const ModalButton = ({ children, className = "btn" }: { children?: React.ReactNode, className?: string }) => (
        <button
            className={className}
            onClick={() => (document.getElementById(modalIdUnique) as HTMLDialogElement)?.showModal()}
        >
            {children || "Open Modal"}
        </button>
    );

    const ModalComponent = ({ children }: { children: React.ReactNode }) => (
        <Modal modalId={modalIdUnique} >
            {children}
        </Modal>
    );

    return [ModalButton, ModalComponent];
}

const Modal = ({ children, modalId }: modalProps) => {
    return (
        <dialog key={modalId} id={modalId} className="modal modal-bottom sm:modal-middle">
            <div className="modal-box">
                {children}
                <div className="modal-action">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn btn-neutral">Close</button>
                    </form>
                </div>
            </div>
        </dialog>
    );
}