import { Modal } from "@/app/components/Modal";
import { Award } from "@/app/types";
import { Recipient } from "@/db/schema";
import { DeleteAwardeeModal } from "./crud";
import {
  RevokeAllModal,
  RevokeOneModal,
} from "@/app/assertions/components/crud";

export enum SortOrder {
  NONE = "none",
  A_Z = "a-z",
  Z_A = "z-a",
}

export const AwardeeEntry = ({
  awardee,
  awards,
}: {
  awardee: Recipient;
  awards: Award[];
}) => {
  return (
    <div
      key={awardee.id}
      className="flex items-center border border-neutral w-full sm:max-w-sm   p-2 rounded-lg shadow-xl"
    >
      <div>
        <div className="text-lg font-semibold">{awardee.name}</div>
        <div className="font-light ">{awardee.identity}</div>
      </div>
      <div className=" grow"> </div>
      <div className="flex items-center space-x-2">
        <Modal buttonTitle="Actions" modalId={awardee.name + "modal"}>
          <div className="p-4">
            <h2 className="text-lg  mb-4">
              Awardee <span className="font-semibold">{awardee.name}</span>{" "}
              badges:
              <p className="text-sm">{awardee.identity}</p>
            </h2>

            <div className="space-y-4">
              {awards.length !== 0 ? (
                awards.map((award, index) => (
                  <AwardEntry key={index} award={award} />
                ))
              ) : (
                <div className="italic text-center">No awards found</div>
              )}
              {awards.length !== 0 && <RevokeAllModal awardeeId={awardee.id} />}
              <div className="divider"></div>
              <DeleteAwardeeModal awardeeId={awardee.id} />
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export const AwardEntry = ({ award }: { award: Award }) => {
  console.log(award.assertion.issuedOn);
  return (
    <div className="p-4 border border-neutral rounded-lg shadow-sm w-full flex flex-row justify-between">
      <div>
        <h3 className="text-lg font-semibold ">{award.badge.name}</h3>
        <p className="text-sm">Granted on {award.assertion.issuedOn}</p>
      </div>
      <div className="flex space-x-2 mt-2">
        <RevokeOneModal assertionId={award.assertion.id} />
      </div>
    </div>
  );
};

export const AwardeeSearch = () => {
  return (
    <form className="sm:max-w-md flex items-center space-x-2 mb-2 p-4 w-full">
      <input
        type="text"
        placeholder="Search For Awardee"
        className="w-full grow input"
      />

      <select className="select">
        {Object.values(SortOrder).map((order) => (
          <option key={order} value={order}>
            {order === SortOrder.NONE ? "FILTER" : order.toUpperCase()}
          </option>
        ))}
      </select>
      <button type="submit">Search</button>
    </form>
  );
};
