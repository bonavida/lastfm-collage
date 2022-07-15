import { useState, useEffect, RefObject } from 'react';

/**
 * Hook for handling closing when clicking outside of an element
 * @param {React.node} element
 * @param {boolean} initialState
 */
const useClickOutside = (
  element: RefObject<Element> | null,
  initialState: boolean
) => {
  const [isActive, setIsActive] = useState<boolean>(initialState);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      // If the active element exists and is clicked outside of
      if (
        element?.current !== null &&
        !element?.current?.contains(e.target as Node)
      ) {
        setIsActive((active) => !active);
      }
    };

    // If the item is active (ie open) then listen for clicks outside
    if (isActive) {
      window.addEventListener('click', onClick);
    }

    return () => {
      window.removeEventListener('click', onClick);
    };
  }, [isActive, element]);

  return [isActive, setIsActive] as const;
};

export default useClickOutside;
