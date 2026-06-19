import React, { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const SWIPE_THRESHOLD = 50;

export default function PortfolioCarousel({
  items,
  renderSlide,
  autoPlayMs = 5000,
  ariaLabel = 'Portfolio carousel',
}) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const touchStartX = useRef(null);
  const touchStartY = useRef(null);
  const indexRef = useRef(0);
  const pausedUntilRef = useRef(0);
  const count = items.length;

  useEffect(() => {
    indexRef.current = index;
  }, [index]);

  const pauseBriefly = useCallback((ms = 10000) => {
    pausedUntilRef.current = Date.now() + ms;
  }, []);

  const goTo = useCallback(
    (nextIndex, slideDirection) => {
      if (count === 0) return;
      const normalized = ((nextIndex % count) + count) % count;
      setDirection(slideDirection ?? (normalized > indexRef.current ? 1 : -1));
      setIndex(normalized);
    },
    [count],
  );

  const goNext = useCallback(() => {
    goTo(indexRef.current + 1, 1);
    pauseBriefly();
  }, [goTo, pauseBriefly]);

  const goPrev = useCallback(() => {
    goTo(indexRef.current - 1, -1);
    pauseBriefly();
  }, [goTo, pauseBriefly]);

  useEffect(() => {
    if (count <= 1) return undefined;

    const timer = setInterval(() => {
      if (Date.now() < pausedUntilRef.current) return;
      const next = (indexRef.current + 1) % count;
      setDirection(1);
      setIndex(next);
    }, autoPlayMs);

    return () => clearInterval(timer);
  }, [autoPlayMs, count]);

  const onTouchStart = (e) => {
    if (e.target.closest('iframe')) return;
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const onTouchEnd = (e) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const diffX = touchStartX.current - e.changedTouches[0].clientX;
    const diffY = touchStartY.current - e.changedTouches[0].clientY;
    touchStartX.current = null;
    touchStartY.current = null;

    if (Math.abs(diffX) < SWIPE_THRESHOLD || Math.abs(diffX) < Math.abs(diffY)) return;

    if (diffX > 0) goNext();
    else goPrev();
  };

  if (count === 0) {
    return (
      <p className="text-gray-500 text-sm text-center py-8">
        No items to display. Add entries to the data file and images to the portfolio folder.
      </p>
    );
  }

  const slideVariants = {
    enter: (d) => ({ x: d > 0 ? 80 : -80, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d) => ({ x: d > 0 ? -80 : 80, opacity: 0 }),
  };

  return (
    <div
      className="relative"
      aria-roledescription="carousel"
      aria-label={ariaLabel}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div className="relative overflow-hidden rounded-xl border border-gray-200 bg-gray-50 min-h-[280px]">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={items[index].id ?? index}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.45, ease: 'easeInOut' }}
            className="w-full"
          >
            {renderSlide(items[index], index, index)}
          </motion.div>
        </AnimatePresence>
      </div>

      {count > 1 && (
        <>
          <button
            type="button"
            onClick={goPrev}
            className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/95 border border-gray-200 shadow-md flex items-center justify-center text-gray-700 hover:border-orange-300 hover:text-orange-600 transition-colors"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={goNext}
            className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/95 border border-gray-200 shadow-md flex items-center justify-center text-gray-700 hover:border-orange-300 hover:text-orange-600 transition-colors"
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          <div className="flex justify-center gap-2 mt-5" role="tablist" aria-label="Slide pagination">
            {items.map((item, i) => (
              <button
                key={item.id ?? i}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => {
                  goTo(i, i > indexRef.current ? 1 : -1);
                  pauseBriefly();
                }}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === index ? 'w-8 bg-orange-500' : 'w-2 bg-gray-300 hover:bg-orange-300'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
