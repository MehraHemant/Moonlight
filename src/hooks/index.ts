import { useEffect, useState } from 'react';

const useInfiniteScroll = (callback: () => void): boolean => {
  const [isNearBottom, setIsNearBottom] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;
      const fullHeight = document.documentElement.offsetHeight;

      if (scrollTop + windowHeight + 50 >= fullHeight) {
        setIsNearBottom(true);
      } else {
        setIsNearBottom(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isNearBottom) {
      callback();
    }
  }, [isNearBottom, callback]);

  return isNearBottom;
};

export default useInfiniteScroll;
