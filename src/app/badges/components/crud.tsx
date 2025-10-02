import React from "react";
import ImageUploadControl from "../../components/ImageUploadControl";
import { Modal } from "../../components/Modal";
import { createBadge, deleteBadge } from "../actions";
import { Badge } from "@/db/schema";

export const CreateBadgeModal = () => {
  return (
    <div className="fixed bottom-4 right-4">
      <Modal buttonTitle="Create Badge" modalId="create-badge-modal">
        <div className="p-4 min-h-screen w-full">
          <h2 className="text-2xl mb-4 ">Create New Badge</h2>
          <form
            action={createBadge}
            className="space-y-4 flex flex-col items-center w-full"
          >
            <ImageUploadControl existingImageUrl={null} />

            <fieldset className="fieldset">
              <legend className="fieldset-legend">Badge Name</legend>
              <input
                required
                name="name"
                type="text"
                className="input "
                placeholder="Type here"
              />
            </fieldset>
            <fieldset className="fieldset ">
              <legend className="fieldset-legend">Badge Description</legend>
              <textarea
                required
                name="description"
                className="textarea h-24 "
                placeholder="Type here"
              ></textarea>
            </fieldset>
            <fieldset className="fieldset ">
              <legend className="fieldset-legend flex justify-between">
                Badge Criteria (mdx)
              </legend>
              <textarea
                required
                name="criteria"
                className="textarea h-24"
                placeholder="Type here"
              ></textarea>
            </fieldset>
            <button type="submit" className="btn btn-neutral ">
              Submit
            </button>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export const DeleteBadgeModal = ({ id }: { id: number }) => {
  const deleteBadgeWithId = deleteBadge.bind(null, id);
  return (
    <Modal
      buttonTitle="Delete Badge"
      className="btn btn-error "
      modalId={"delete-badge-modal-" + id}
    >
      <form action={deleteBadgeWithId} className="p-4">
        <h2 className="text-xl  mb-4">
          Are you sure you want to delete this badge? This action cannot be
          undone.
        </h2>

        <div className="space-y-4">
          <button className="btn btn-error btn-block">Delete Badge</button>
        </div>
      </form>
    </Modal>
  );
};

export const EditBadgeModal = (badge: Badge) => {
  return (
    <Modal
      buttonTitle="Edit Badge"
      className="btn btn-info"
      modalId={"edit-badge-modal-" + badge.id}
    >
      <div className="p-4 min-h-screen w-full">
        <h2 className="text-2xl mb-4 ">Edit Badge</h2>
        <form
          action={createBadge}
          className="space-y-4 flex flex-col items-center w-full"
        >
          <ImageUploadControl existingImageUrl={badge.imageUrl} />

          <fieldset className="fieldset">
            <legend className="fieldset-legend">Badge Name</legend>
            <input
              defaultValue={badge.name}
              required
              name="name"
              type="text"
              className="input "
              placeholder="Type here"
            />
          </fieldset>
          <fieldset className="fieldset ">
            <legend className="fieldset-legend">Badge Description</legend>
            <textarea
              defaultValue={badge.description + ""}
              required
              name="description"
              className="textarea h-24 "
              placeholder="Type here"
            ></textarea>
          </fieldset>
          <fieldset className="fieldset ">
            <legend className="fieldset-legend flex justify-between">
              Badge Criteria (mdx)
            </legend>
            <textarea
              defaultValue={badge.criteria + ""}
              required
              name="criteria"
              className="textarea h-24"
              placeholder="Type here"
            ></textarea>
          </fieldset>
          <button type="submit" className="btn btn-neutral ">
            Submit
          </button>
        </form>
      </div>
    </Modal>
  );
};
