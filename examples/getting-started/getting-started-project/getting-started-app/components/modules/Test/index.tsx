import weatherStyles from '../../../styles/weather.module.css';

import {
  BooleanField,
  ModuleFields,
  RepeatedFieldGroup,
  TextField,
  VideoField,
  RichTextField,
  ImageField,
} from '@hubspot/cms-components/fields';
import VideoIsland from '../../islands/VideoIsland.tsx?island';
import MyTeam from '../../islands/MyTeam.tsx?island';

import {
  RichText,
  getHubID,
  // VideoPlayer,
  // Image,
  Island,
} from '@hubspot/cms-components';
// import { RichText } from '@hubspot/cms-components';

export function Component(props: any) {
  console.log('props', arguments);
  const { fieldValues } = props;
  // const { hubspotVideo, default_todos } = fieldValues;

  return (
    <div>
      {/* <Image imageField={imageField} /> */}
      Video in Island
      {/* <Island module={VideoIsland} hubspotVideo={hubspotVideo} /> */}
      <hr />
      Video Not in Island
      {/* <VideoPlayer
        tag={'div'}
        style={{ border: '1px solid red' }}
        hubspotVideo={hubspotVideo}
      /> */}
      Richtext2
      <div className={weatherStyles.testClass} />
      <RichText fieldPath="richTextField" data-attr="test" />
      {/* player_id="52655782663" /> */}
      {/* <RichText fieldPath="@hubspot/richtest" /> */}
      <hr></hr>
      Todos :
      <br />
      {/* {default_todos.map((todo, idx) => (
        <p key={'todo' + idx}>
          Todo: {todo.text} - {todo.completed ? 'Complete' : 'Incomplete'}
        </p>
      ))} */}
    </div>
  );
}

export const meta = {
  label: 'Test Module',
};
