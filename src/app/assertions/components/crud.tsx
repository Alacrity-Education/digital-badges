import { Modal } from "@/app/components/Modal";
import { Badge } from "@/db/schema";
import React from "react";
import {
  deleteAssertionByAssertionId,
  deleteAssertionByUserId,
  grantBadge,
} from "../actions";

export const BulkGrantModal = ({ id, name }: { id: number; name: string }) => {
  return (
    <Modal
      buttonTitle="Bulk Grant"
      className="btn btn-neutral "
      modalId={"bulk-grant-modal-" + id}
    >
      <form action={""} className="p-4">
        <h2 className="text-xl  mb-4">
          Bulk Grant <span className="font-semibold underline">{name}</span>
        </h2>
        <a download={true} className="link" href="/resources/sample.csv">
          Download sample csv
        </a>
        <div className="space-y-4">
          <fieldset className="fieldset ">
            <input type="file" className="file-input" accept=".csv,text/csv" />
          </fieldset>

          <button className="btn btn-neutral btn-block">Grant Badge</button>
        </div>
      </form>
    </Modal>
  );
};
export const CreateAssertionModal = (badge: Badge) => {
  const grantBadgeWithBadgeData = grantBadge.bind(
    null,
    badge.id,
    1 // issuerId will be fetched from session
  );
  return (
    <Modal
      modalId={badge.name + "-grant-badge-modal"}
      buttonTitle="Grant Badge"
      className="btn btn-success"
    >
      <div className="p-4">
        <h2 className="text-2xl mb-4 ">
          Grant Badge{" "}
          <span className="font-semibold underline">{badge.name}</span>
        </h2>
        <form
          className="w-full flex sm:block flex-col items-center"
          action={grantBadgeWithBadgeData}
        >
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Name</legend>
            <input
              required
              name="name"
              type="text"
              className="input"
              placeholder="Type here"
            />
          </fieldset>
          <fieldset className="fieldset ">
            <legend className="fieldset-legend">Email</legend>
            <input
              required
              name="email"
              type="email"
              className="input"
              placeholder="Type here"
            />
          </fieldset>
          <button type="submit" className="btn btn-neutral  mt-4 ">
            Submit
          </button>
        </form>
      </div>
    </Modal>
  );
};
export const RevokeOneModal = ({ assertionId }: { assertionId: number }) => {
  const deleteAssertion = deleteAssertionByAssertionId.bind(null, assertionId);
  return (
    <Modal
      buttonTitle="Revoke"
      className="btn btn-error"
      modalId={"revoke-modal-" + assertionId}
    >
      <form action={deleteAssertion} className="p-4">
        <h2 className="text-xl  mb-4">
          Are you sure you want to revoke this badge?
        </h2>

        <div className="space-y-4">
          <button className="btn btn-error btn-block">Revoke Badge</button>
        </div>
      </form>
    </Modal>
  );
};

export const RevokeAllModal = ({ awardeeId }: { awardeeId: number }) => {
  const deleteAllAssertions = deleteAssertionByUserId.bind(null, awardeeId);

  return (
    <Modal
      buttonTitle="Revoke All"
      className="btn btn-error btn-block text-white bg-red-800 border-red-800"
      modalId={"revoke-all-modal-" + awardeeId}
    >
      <form action={deleteAllAssertions} className="p-4">
        <h2 className="text-xl  mb-4">
          Are you sure you want to revoke all badges for this awardee?
        </h2>

        <div className="space-y-4">
          <button className="btn btn-error text-white bg-red-800 border-red-800btn-block">
            Revoke All Badges
          </button>
        </div>
      </form>
    </Modal>
  );
};
