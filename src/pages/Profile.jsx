import React from "react";
import { Address, UserInfo, OrderListing } from "../components";

function Profile() {
  return (
    <div className="user-profile extra-margin mx-auto py-4  bdrs-2">
      <UserInfo />
      <div className="flex-layout ai-flex-start mt-6">
        <OrderListing />
        <Address />
      </div>
    </div>
  );
}
export { Profile };
