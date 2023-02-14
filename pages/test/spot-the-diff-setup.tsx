import dynamic from 'next/dynamic';

//Needed No SSR as react canva library needs to be imported dynamically
const NoSSRSetUp = dynamic(() => import('../../components/games/spotTheDifference/SetUp'), {
  ssr: false,
});

const spotTheDiffSetUp = () => {
  return <NoSSRSetUp />;
};

export default spotTheDiffSetUp;
