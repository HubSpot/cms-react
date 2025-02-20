import { VideoPlayer } from '@hubspot/cms-components';
type PlayerType = 'hsvideo2' | 'simple-html5';
type ConversionAsset = {
  type: 'CTA' | 'FORM';
  id: string;
  position: 'PRE' | 'POST' | 'CUSTOM';
};
type HubSpotVideoParams = {
  player_id: number;
  width: number;
  height: number;
  max_width?: number;
  max_height?: number;
  autoplay: boolean;
  hide_controls: boolean;
  loop_video: boolean;
  mute_by_default: boolean;
  player_type: PlayerType;
};

type VideoPlayerProps = {
  hubspotVideo: HubSpotVideoParams;
};

export default function VideoIsland(props: VideoPlayerProps) {
  const { hubspotVideo } = props;
  return (
    <>
      <VideoPlayer hubspotVideo={hubspotVideo} />
    </>
  );
}
