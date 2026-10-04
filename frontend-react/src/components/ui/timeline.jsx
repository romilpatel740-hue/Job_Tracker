import { useScroll, useTransform, motion } from "motion/react";
import React, { useEffect, useRef, useState } from "react";

export const Timeline = ({
  data,
  title = "Application Overview",
  description = "A clear overview of this job application.",
}) => {
  const ref = useRef(null);
  const containerRef = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(
    scrollYProgress,
    [0, 1],
    [0, height]
  );

  const opacityTransform = useTransform(
    scrollYProgress,
    [0, 0.1],
    [0, 1]
  );

  return (
    <div
      ref={containerRef}
      className="w-full overflow-hidden bg-gradient-to-br from-white via-slate-50 to-indigo-50/40 font-sans"
    >
      {/* Timeline Header */}
      <div className="mx-auto max-w-7xl px-5 pb-4 pt-8 sm:px-8 md:px-10 md:pt-10">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-indigo-700">
          <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
          Application Journey
        </div>

        <h2 className="max-w-4xl bg-gradient-to-r from-slate-900 via-indigo-700 to-cyan-600 bg-clip-text text-3xl font-extrabold tracking-tight text-transparent sm:text-4xl">
          {title}
        </h2>

        <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
          {description}
        </p>
      </div>

      {/* Timeline */}
      <div
        ref={ref}
        className="relative mx-auto max-w-7xl pb-12"
      >
        {data.map((item, index) => (
          <div
            key={index}
            className="group relative flex justify-start gap-4 pt-10 md:gap-10 md:pt-16"
          >
            {/* Timeline Marker */}
            <div className="sticky top-40 z-40 flex h-fit max-w-xs flex-col items-center self-start md:w-full md:max-w-sm md:flex-row">
              <div className="absolute left-[19px] flex h-9 w-9 items-center justify-center rounded-full border border-indigo-200 bg-white shadow-md shadow-indigo-100">
                <div className="h-3.5 w-3.5 rounded-full bg-gradient-to-br from-indigo-500 to-cyan-500 shadow-sm shadow-indigo-300 transition-transform duration-300 group-hover:scale-125" />
              </div>

              <h3 className="hidden pl-20 text-xl font-extrabold tracking-tight text-slate-700 transition-colors duration-300 group-hover:text-indigo-700 md:block md:text-2xl">
                {item.title}
              </h3>
            </div>

            {/* Content */}
            <div className="relative w-full pl-16 pr-5 md:pl-4 md:pr-8">
              <h3 className="mb-4 block text-xl font-extrabold tracking-tight text-slate-800 md:hidden">
                {item.title}
              </h3>

              {item.content}
            </div>
          </div>
        ))}

        {/* Base Timeline Line */}
        <div
          style={{
            height: height + "px",
          }}
          className="absolute left-[36px] top-0 w-[2px] overflow-hidden bg-gradient-to-b from-transparent via-indigo-200 to-transparent"
        >
          {/* Animated Progress */}
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0 w-[2px] rounded-full bg-gradient-to-b from-indigo-500 via-cyan-500 to-indigo-400"
          />
        </div>
      </div>
    </div>
  );
};