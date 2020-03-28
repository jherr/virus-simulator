import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import {
  Container,
  CssBaseline,
  Button,
  makeStyles,
} from '@material-ui/core';

import {
  createInitialState,
  runGeneration,
} from './engine';
import {
  SIMULATOR_SIZE,
} from './constants';
import useInterval from './useInterval';

import GenerationsGraph from './components/GenerationsGraph';
import Simulator from './components/Simulator';
import Controls from './components/Controls';

const useStyles = makeStyles({
  root: {
    display: 'grid',
    gridTemplateColumns: `500px ${SIMULATOR_SIZE}px`,
    marginTop: '1em',
    gridGap: 10,
  },
  graphBox: {
    padding: 2,
    border: '1px solid #ccc',
    margin: 5,
  }
})

const initialState = createInitialState();

const App = () => {
  const classes = useStyles();

  const [state, setState] = useState(initialState);

  const onRestart = () => {
    setState(createInitialState(state));
  }

  useInterval(() => {
    setState(runGeneration(state));
  }, 50);

  return (
    <Container>
      <CssBaseline />
      <div className={classes.root}>
        <div>
          <Controls
            state={state}
            onChange={(key, value) => setState({
              ...state,
              [key]: value,
            })}
          />
          <Button
            variant="contained"
            onClick={onRestart}
            fullWidth
          >
            Restart
          </Button>
        </div>
        <div>
          <div className={classes.graphBox}>
            <GenerationsGraph
              generations={state.generations}
            />
          </div>
          <Simulator
            people={state.people}
            radius={state.radius}
          />
        </div>
      </div>
    </Container>
  )
};

ReactDOM.render(<App />, document.getElementById('app'));
