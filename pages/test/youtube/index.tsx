import React from 'react';
import YouTube from 'react-youtube';
import { Text } from '@chakra-ui/react';

const YoutubeVideo = () => {
  const opts = {
    height: '390',
    width: '640',
    playerVars: {
      autoplay: 1,
    },
  };

  const [videoId, setVideoId] = React.useState('I9q5eBizPHI');

  return (
    <>
      <div>
        <h3>Junior Club Food Bank Video</h3>
        <YouTube
          videoId={videoId}
          opts={opts}
          onReady={event => {
            event.target.pauseVideo();
          }}
        />
      </div>
      <Text mb='8px'>Current Video Id: {videoId}</Text>
    </>
  );
};

export default YoutubeVideo;
