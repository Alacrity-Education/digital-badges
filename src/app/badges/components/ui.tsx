"use client";

import React, { Suspense, useState } from "react";
import { Badge } from "@/db/schema";
import { Modal } from "../../components/Modal";
import Link from "next/link";
import { CreateAssertionModal } from "@/app/assertions/components/crud";
import { BulkGrantModal } from "@/app/assertions/components/crud";

export default function BadgeEntry(badge: Badge) {
  return (
    <div className="w-full p-2 border border-base-content/50 flex flex-row rounded-lg items-center">
      <div>
        <div className=" font-semibold">{badge.name}</div>
        <div className="font-light text-sm">
          {badge.createdAt && badge.createdAt}
        </div>
      </div>
      <div className="grow"></div>
      <Modal modalId={badge.name + "-badge-modal"} buttonTitle="actions">
        <div className="p-4">
          <h2 className="text-2xl mb-4 ">
            Badge <span className="font-semibold underline">{badge.name}</span>{" "}
            actions:
          </h2>
          <div className="space-y-4 ">
            <BadgeActions badge={badge} />
          </div>
        </div>
      </Modal>
    </div>
  );
}

const BadgeActions = ({ badge }: { badge: Badge }) => {
  return (
    <>
      <div className="flex flex-col gap-2 w-full">
        <CreateAssertionModal {...badge} />
        <BulkGrantModal {...badge} />
      </div>
      <div className="divider "></div>
      <Link href={`/badges/${badge.id}`} className="btn btn-info btn-block">
        Go to Badge Page
      </Link>
    </>
  );
};
