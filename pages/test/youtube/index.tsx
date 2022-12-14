import { useState } from 'react';
import YouTube from 'react-youtube';
import axios from 'axios';
import { Button, Text, Input } from '@chakra-ui/react';

const YoutubeVideo = () => {
  const opts = {
    height: '390',
    width: '640',
    playerVars: {
      autoplay: 1,
    },
  };

  const [videoTitle, setVideoTitle] = useState('');
  const [videoId, setVideoId] = useState('I9q5eBizPHI');
  const appUrl = 'http://localhost:3000/'; // to be replaced with env variable during deployment

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
      <Text mb='8px'>Video Title: {videoTitle}</Text>
      <Input value={videoTitle} onChange={event => setVideoTitle(event.target.value)} placeholder='Type in Video Title' size='sm' />
      <Button
        colorScheme='green'
        onClick={async () => {
          const response = await axios.post(appUrl + 'api/youtube', { videoTitle: videoTitle });
          const { data } = response;
          setVideoId(data.videoId);
          setVideoTitle('');
        }}
      >
        Click to Upload
      </Button>
    </>
  );
};

export default YoutubeVideo;
