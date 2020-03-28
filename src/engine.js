import { quadtree } from 'd3-quadtree';
import {
  PEOPLE,
  BOX_SIZE,
  HISTORY
} from './constants';

export const generatePeople = (state) =>
  new Array(PEOPLE)
    .fill({})
    .map((n, i) => ({
      id: i,
      x: Math.random() * BOX_SIZE,
      y: Math.random() * BOX_SIZE,
      direction: Math.random() * (Math.PI * 2),
      speed: Math.random() * state.motion,
      status: i === 0 ? 1 : 0,
      sickness: state.infectionLength,
    }));

export const runGenerationOnPerson = (person, state) => {
  let { speed, direction, x, y, sickness, status } = person;
  x += Math.sin(direction) * speed;
  y += Math.cos(direction) * speed;

  if (
    x <= state.radius ||
    y <= state.radius ||
    x >= BOX_SIZE - state.radius ||
    y >= BOX_SIZE - state.radius ||
    Math.random() < 0.1
  ) {
    x = Math.min(BOX_SIZE - state.radius, Math.max(x, state.radius));
    y = Math.min(BOX_SIZE - state.radius, Math.max(y, state.radius));
    direction += Math.random() * (Math.PI / 4);
    speed = state.motion;
  }

  if (status === 1 && sickness > 0) {
    sickness -= 0.2;
    if (sickness < 1) {
      status = -1;
    }
  }

  return {
    ...person,
    x,
    y,
    speed,
    direction,
    sickness,
    status,
  };
}

export const runGeneration = (state) => {
  if (state.paused) {
    return state;
  }

  const people = state.people.map((person) => runGenerationOnPerson(person, state, qt));

  const qt = quadtree()
    .extent([[0, 0], [BOX_SIZE, BOX_SIZE]])
    .addAll(
      people
        .filter(({ status }) => status === 0)
        .map(({ x, y, id }) => ([x, y, id]))
    );

  people
    .filter(({ status }) => status === 1)
    .forEach((person) => {
      const found = qt.find(person.x, person.y, state.radius);
      if (found) {
        const [x, y, id] = found;
        if (Math.random() < state.infectionRate) {
          people[id].status = 1;
          people[id].sickness = state.infectionLength;
        }
      }
    });

  const counts = people.reduce((a, { status }) => {
    a[status] += 1;
    return a;
  }, {
    [-1]: 0,
    0: 0,
    1: 0,
  });
  state.generations.push({
    generation: state.generation,
    counts,
  });
  if (state.generations.length > HISTORY) {
    state.generations.splice(0, 1);
  }

  return {
    ...state,
    people,
    generations: state.generations,
    generation: state.generation + 1,
    paused: counts[1] === 0,
  };
};

export const createInitialState = (state = {
  motion: 3,
  radius: 5,
  infectionRate: 0.5,
  infectionLength: 14,
  generations: [],
  generation: 0,
}) => {
  const initialState = {
    ...state,
    paused: false,
    generations: [],
    people: generatePeople(state)
  };
  return initialState;
};
