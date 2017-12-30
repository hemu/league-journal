import topIcon from './new/top.png';
import jgIcon from './new/jungle.png';
import midIcon from './new/mid.png';
import botIcon from './new/bottom.png';
import supIcon from './new/support.png';

export default function getRoleImg(lane) {
  switch (lane) {
    case 'Top':
      return topIcon;
    case 'Jungle':
      return jgIcon;
    case 'Mid':
      return midIcon;
    case 'Support':
      return supIcon;
    case 'Bottom':
      return botIcon;
    default:
      return midIcon;
  }
}
