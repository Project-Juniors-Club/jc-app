import { SAMPLE_BASE64_LEFT_IMAGE, SAMPLE_BASE64_RIGHT_IMAGE } from '../../components/games/spotTheDifference/constants';
import { DifferenceBoxInfo } from '../../components/games/spotTheDifference/DifferenceBox';
import Game from '../../components/games/spotTheDifference/Game';

const SpotTheDiffGame = () => {
  // TODO: retrieve from db
  const leftImage = SAMPLE_BASE64_LEFT_IMAGE;

  const rightImage = SAMPLE_BASE64_RIGHT_IMAGE;

  const differenceBoxes: DifferenceBoxInfo[] = [
    {
      id: 'c60802c7-2555-42a4-a502-2d732167a14e',
      x: 284,
      y: 103,
      width: 50,
      height: 50,
    },
    {
      id: '92c5461c-ec2a-4875-9953-5bd25266f9f6',
      x: 295.2352128332212,
      y: 173.14259077336766,
      width: 61.41411460573546,
      height: 56.11209492913349,
    },
    {
      id: '4904987a-97bc-465a-9ff7-a7d54e76ebfd',
      x: 159.94444942465762,
      y: 1.920548934633441,
      width: 103.11110115068428,
      height: 40.15890213073308,
    },
    {
      id: '90a40902-a919-4d82-b31f-b25e0ab08c33',
      x: 1.6153846153846152,
      y: 132.99999999999986,
      width: 30.769230769230766,
      height: 49.999999999999986,
    },
    {
      id: 'd29a0100-dfda-42e5-a752-dfb9b411e343',
      x: 379.61538461538464,
      y: 116.92307692307679,
      width: 30.769230769230738,
      height: 46.153846153846146,
    },
  ];

  return <Game leftImageSrc={leftImage} rightImageSrc={rightImage} diffBoxes={differenceBoxes} />;
};

export default SpotTheDiffGame;
