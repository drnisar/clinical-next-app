import React, { PropsWithChildren } from "react";
import DashboardNav from "./DashboardNav";

const DashBoardLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <DashboardNav />

      <div>{children}</div>
    </>
  );
};

export default DashBoardLayout;
