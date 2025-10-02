"use client";

export interface modalProps {
  children?: React.ReactNode;
  modalId: string;
}

export interface createModalProps {
  modalId: string;
  children: React.ReactNode;
  buttonTitle?: string;
  className?: string;
}

export function Modal({
  modalId = "modal",
  children,
  buttonTitle,
  className,
}: createModalProps) {
  const ModalButton = ({ children }: { children?: React.ReactNode }) => (
    <button
      className={className || "btn btn-neutral"}
      onClick={() =>
        (document.getElementById(modalId) as HTMLDialogElement)?.showModal()
      }
    >
      {children || "Open Modal"}
    </button>
  );

  const ModalComponent = ({ children }: { children: React.ReactNode }) => (
    <dialog
      key={modalId}
      id={modalId}
      className="modal modal-bottom sm:modal-middle"
    >
      <div className="modal-box">
        {children}
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );

  return (
    <>
      <ModalButton>{buttonTitle}</ModalButton>
      <ModalComponent>{children}</ModalComponent>
    </>
  );
}
