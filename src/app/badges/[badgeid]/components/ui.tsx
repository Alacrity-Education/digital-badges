import { CreateAssertionModal } from "@/app/assertions/components/crud";
import { Modal } from "@/app/components/Modal";
import { Badge } from "@/db/schema";
import Image from "next/image";
import { DeleteBadgeModal, EditBadgeModal } from "../../components/crud";
import { BulkGrantModal } from "@/app/assertions/components/crud";
import { RecipientWithDate } from "../page";

export const Actions = (badge: Badge) => {
  return (
    <ActionsLayout>
      <CreateAssertionModal {...badge} />
      <BulkGrantModal {...badge} />
      <div className="divider sm:hidden"></div>
      <EditBadgeModal {...badge} />
      <DeleteBadgeModal {...badge} />
    </ActionsLayout>
  );
};
const ActionsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Modal
      modalId="actions-modal"
      buttonTitle="Actions"
      className="btn btn-neutral btn-sm "
    >
      <div className="flex flex-col sm:grid grid-cols-2 gap-2">{children}</div>
    </Modal>
  );
};
export const BadgeView = (badge: Badge) => {
  return (
    <div className=" flex flex-col gap-4 items-center max-w-screen h-max  overflow-x-hidden px-2">
      <Image
        height={500}
        width={500}
        alt={"badge-" + badge.name}
        src={badge.imageUrl || ""}
        className="rounded-sm border-2 bg-base-100 border-neutral/30 shadow-xl h-32 w-32 object-cover"
      />
      <Image
        height={500}
        width={500}
        alt={"badge-" + badge.name}
        src={badge.imageUrl || ""}
        className="absolute -z-10 top-20 left-1/3 rounded-sm border-neutral/30 h-64 w-64 object-cover blur-3xl brightness-125 opacity-80"
      />
      <h1 className="text-xl sm:text-4xl text-center">
        Badge <span className="font-semibold">{badge.name}</span>
      </h1>
      <div className="badge badge-sm sm:badge-md  badge-neutral shadow-lg">
        Created on: {badge.createdAt}
      </div>
      <div className="min-w-full sm:min-w-sm lg:min-w-md ">
        <div className="font-semibold pt-2">Description</div>
        <div>{badge.description}</div>
        <div className="font-semibold pt-2">Criteria</div>
        <div>{badge.criteria}</div>
      </div>
    </div>
  );
};
export const AwardeeView = ({
  recipients,
}: {
  recipients: RecipientWithDate[];
}) => {
  return (
    <div className=" flex flex-col items-center py-4 sm:w-sm lg:w-md px-2 sm:p-0 ">
      <div className="font-bold text-lg w-full text-center sm:text-start pb-2">
        Awardees
      </div>
      <div className="flex flex-col gap-2 w-full">
        {recipients &&
          recipients.map((r) => (
            <div
              key={r.id}
              className="border border-neutral rounded-lg p-2 shadow-sm w-full flex flex-row justify-between"
            >
              <div className="">
                <div className="font-semibold">{r.name}</div>
                <div className="text-sm">{r.identity}</div>
                <div className="text-sm">Granted on: {r.issuedOn} </div>
              </div>
              <button className="btn btn-error ">Revoke</button>
            </div>
          ))}
      </div>
    </div>
  );
};
