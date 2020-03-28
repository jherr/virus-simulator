import React from 'react';
import {
  SIMULATOR_SIZE,
  BOX_SIZE,
  COLORS
} from '../constants';

export default ({ people, radius }) => (
  <svg
    width={SIMULATOR_SIZE}
    height={SIMULATOR_SIZE}
    viewBox={`0 0 ${BOX_SIZE} ${BOX_SIZE}`}
    style={{
      overflow: 'hidden'
    }}
  >
    {
      people.map(({ id, x, y, status }) => (
        <g
          key={id}
        >
          <circle
            cx={x}
            cy={y}
            r={3}
            style={{
              stroke: 'none',
              strokeWidth: 0,
              fill: COLORS[status]
            }}
          />
          {status === 1 && (
            <circle
              cx={x}
              cy={y}
              r={radius}
              style={{
                stroke: COLORS[status],
                strokeWidth: 1,
                fill: 'none',
              }}
            />
          )}
        </g>
      ))
    }
  </svg>
)
