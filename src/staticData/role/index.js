import topIcon from "./top_small.png";
import jgIcon from "./jungle_small.png";
import midIcon from "./mid_small.png";
import botIcon from "./bot_small.png";
import supIcon from "./support_small.png";

export default function getRoleImg(lane) {
  switch (lane) {
    case "Top":
      return topIcon;
    case "Jungle":
      return jgIcon;
    case "Mid":
      return midIcon;
    case "Support":
      return supIcon;
    case "Bottom":
      return botIcon;
    default:
      return midIcon;
  }
}
