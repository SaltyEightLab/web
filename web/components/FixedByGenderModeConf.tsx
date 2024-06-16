"use client";

import React, { useContext } from "react";
import { fixedByGenderModeContext } from "../app/page";
import { Switch } from "@headlessui/react";

const FixedByGenderModeConf = () => {
  const fixedByGenderMode = useContext(fixedByGenderModeContext);
  if (!fixedByGenderMode) {
    throw new Error("fixedByGenderModeContext is not available");
  }
  return (
    <div className="flex items-center justify-between my-2 py-2 bg-white hover:bg-gray-100 cursor-pointer rounded-lg transition-colors duration-200 ease-in-out shadow-sm">
      <div className="flex items-center">
        <img src="/menuIcon/seibetsudekotei.png" alt="Menu Icon" className="mx-3 w-6 h-6" />
        <span>性別で固定</span>
      </div>
      <Switch 
        checked={fixedByGenderMode.fixedByGenderMode}
        onChange={() => fixedByGenderMode.setFixedByGenderMode(!fixedByGenderMode.fixedByGenderMode)}
        className={`${fixedByGenderMode.fixedByGenderMode ? "bg-blue-500" : "bg-gray-300"} relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none mr-2`}
      >
        <span className={`${fixedByGenderMode.fixedByGenderMode ? "translate-x-6" : "translate-x-1"} inline-block w-4 h-4 transform bg-white rounded-full transition-transform`} />
      </Switch>
    </div>
  );
};

export default FixedByGenderModeConf;

