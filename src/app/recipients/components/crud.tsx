import { Modal } from "@/app/components/Modal";
import { deleteRecipientByRecipientId } from "../actions";

export const DeleteAwardeeModal = ({ awardeeId }: { awardeeId: number }) => {
  const deleteAwardee = deleteRecipientByRecipientId.bind(null, awardeeId);

  return (
    <Modal
      buttonTitle="Delete Awardee"
      className="btn btn-error btn-block"
      modalId={"delete-awardee-modal-" + awardeeId}
    >
      <form action={deleteAwardee} className="p-4">
        <h2 className="text-xl  mb-4">
          Are you sure you want to delete this awardee? This action cannot be
          undone.
        </h2>

        <div className="space-y-4">
          <button className="btn btn-error btn-block">Delete Awardee</button>
        </div>
      </form>
    </Modal>
  );
};
