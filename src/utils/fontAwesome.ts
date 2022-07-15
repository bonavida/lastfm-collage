import { library, config } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import {
  faRightFromBracket,
  faAngleDown,
} from '@fortawesome/free-solid-svg-icons';

export const registerIcons = (): void => {
  // Add fontawesome icons to the library in order to import just used icons
  library.add(fab, faRightFromBracket, faAngleDown);
  // Disable add automatically the css styles into the <head> for Next.js
  config.autoAddCss = false;
};
