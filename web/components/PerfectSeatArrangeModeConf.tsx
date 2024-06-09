"use client";

import React, { useContext } from "react";
import { perfectSeatArrangeModeContext } from "../app/page";
import { Switch } from "@headlessui/react";

const PerfectSeatArrangeModeConf = () => {
  const perfectSeatArrangeMode = useContext(perfectSeatArrangeModeContext);
  if (!perfectSeatArrangeMode) {
    throw new Error("perfectSeatArrangeModeContext is not available");
  }
  return (
    <div className="flex items-center justify-between my-2 py-2 bg-white hover:bg-gray-100 cursor-pointer rounded-lg transition-colors duration-200 ease-in-out shadow-sm">
      <div className="flex items-center">
        <img src="/menuIcon/layout.png" alt="Menu Icon" className="ml-2 mr-1" />
        <span>同席NG</span>
      </div>
      <Switch 
        checked={perfectSeatArrangeMode.perfectSeatArrangeMode}
        onChange={() => perfectSeatArrangeMode.setPerfectSeatArrangeMode(!perfectSeatArrangeMode.perfectSeatArrangeMode)}
        className={`${perfectSeatArrangeMode.perfectSeatArrangeMode ? "bg-blue-500" : "bg-gray-300"} relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none mr-2`}
      >
        <span className={`${perfectSeatArrangeMode.perfectSeatArrangeMode ? "translate-x-6" : "translate-x-1"} inline-block w-4 h-4 transform bg-white rounded-full transition-transform`} />
      </Switch>
    </div>
  );
};

export default PerfectSeatArrangeModeConf;