import { createAvatar } from "@dicebear/core";
import {
  avataaars,
  micah,
  bottts,
  adventurer,
  identicon,
  initials,
} from "@dicebear/collection";

const getCuteAvatar = (author) => {
  if (!author) return "";
  const styles = [avataaars, micah, bottts, adventurer, identicon, initials];
  const style = styles[author?.length % styles.length];
  const avatar = createAvatar(style, {
    seed: author,
    size: 128,
  });
  return avatar.toDataUri();
};
export default getCuteAvatar;
