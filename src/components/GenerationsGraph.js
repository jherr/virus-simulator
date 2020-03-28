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
      height={PEOPLE / 2}
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
              height={counts[-1] / 2}
              style={{
                fill: COLORS[-1]
              }}
            />)}
            {counts[1] > 0 && (<rect
              x={`${index * widthFactor}%`}
              width={`${widthFactor}%`}
              y={(PEOPLE - counts[1]) / 2}
              height={counts[1] / 2}
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
