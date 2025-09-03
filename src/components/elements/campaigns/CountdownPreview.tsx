import React, { useEffect, useState } from "react";

interface CountdownPreviewProps {
  minutes: number;
  seconds: number;
  onTimeout: () => void;
  setIsSubmitting: (value: boolean) => void;
}

const CountdownPreview: React.FC<CountdownPreviewProps> = ({
  minutes,
  seconds,
  onTimeout,
  setIsSubmitting,
}) => {
  const [time, setTime] = useState({ minutes, seconds });

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime.minutes === 0 && prevTime.seconds === 0) {
          clearInterval(timer);
          setIsSubmitting(true);
          onTimeout();
          return { minutes: 0, seconds: 0 };
        }

        const newMinutes =
          prevTime.seconds === 0 ? prevTime.minutes - 1 : prevTime.minutes;
        const newSeconds = prevTime.seconds === 0 ? 59 : prevTime.seconds - 1;

        return { minutes: newMinutes, seconds: newSeconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [onTimeout]);

  return (
    <>
      {time.minutes === 0 && time.seconds === 0 ? (
        <span className="animate-pulse">Submitting...</span>
      ) : (
        <span
          className={`countdown${
            time.minutes === 0 && time.seconds <= 10
              ? " animate-pulse text-red-500"
              : ""
          }`}
        >
          <span style={{ "--value": time.minutes } as any}>{time.minutes}</span>
          m
          <span style={{ "--value": time.seconds } as any}>{time.seconds}</span>
          s
        </span>
      )}
    </>
  );
};

export default CountdownPreview;
