import React, { useState, useEffect } from "react";
import { useSpring, animated } from "react-spring";
import PairSelecter from "./PairSelecter";

interface StudentSelecterProps {
  isActive: boolean;
  label: string | null;
}

const StudentSelecter: React.FC<StudentSelecterProps> = ({
  isActive,
  label,
}) => {
  const [pairSelecters, setPairSelecters] = useState([
    {
      id: 0,
      component: (
        <PairSelecter key={0} onRemove={() => removePairSelecter(0)} />
      ),
    },
  ]);

  const addPairSelecter = () => {
    const newId = pairSelecters.length;
    setPairSelecters([
      ...pairSelecters,
      {
        id: newId,
        component: (
          <PairSelecter
            key={newId}
            onRemove={() => removePairSelecter(newId)}
          />
        ),
      },
    ]);
  };

  const removePairSelecter = (id: number) => {
    setPairSelecters(pairSelecters.filter((pair) => pair.id !== id));
  };

  const extensionAnimation = useSpring({
    to: {
      width: isActive ? "300px" : "0px",
      opacity: isActive ? 1 : 0,
    },
    from: {
      width: "0px",
      opacity: 0,
    },
    config: { tension: 500, friction: 50 },
  });

  return (
    <animated.div
      style={extensionAnimation}
      className="bg-white flex-shrink-0 z-50 p-4 rounded-lg shadow-sm overflow-hidden"
    >
      <h2 className="text-lg font-semibold text-gray-800 mb-4">{label}</h2>
      {pairSelecters.map((pair) => pair.component)}
        <button
          onClick={addPairSelecter}
          className="mt-4 ml-8 px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition duration-300"
        >
          組み合わせを追加
        </button>
    </animated.div>
  );
};

export default StudentSelecter;
