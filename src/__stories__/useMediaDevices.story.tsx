import * as React from 'react';
import {storiesOf} from '@storybook/react';
import {useMediaDevices} from '..';

const Demo = () => {
  const state = useMediaDevices();

  return (
    <pre>
      {JSON.stringify(state, null, 2)}
    </pre>
  );
};

storiesOf('useMediaDevices', module)
  .add('Example', () =>
    <Demo/>
  )
