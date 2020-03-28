import React from 'react';
import {
  PEOPLE,
  COLORS,
  HISTORY
} from '../constants';

export default ({ generations }) => {
  const widthFactor = 100 / HISTORY;
  return (
    <svg
      width="100%"
      height={PEOPLE}
    >
      {
        generations.map(({ generation, counts }, index) => (
          <g
            key={generation}
          >
            {counts[-1] > 0 && (<rect
              x={`${index * widthFactor}%`}
              width={`${widthFactor}%`}
              y={0}
              height={counts[-1]}
              style={{
                fill: COLORS[-1]
              }}
            />)}
            {counts[1] > 0 && (<rect
              x={`${index * widthFactor}%`}
              width={`${widthFactor}%`}
              y={PEOPLE - counts[1]}
              height={counts[1]}
              style={{
                fill: COLORS[1]
              }}
            />)}
          </g>
        ))
      }
    </svg>
  );
};
