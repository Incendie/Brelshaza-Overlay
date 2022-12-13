import { useRef } from "react";
import "./styles.scss";

interface ITimer {
  className: string;
  time: number;
}

const Timer: React.FC<ITimer> = ({ className, time }) => {
  const ref = useRef(null);

  return <div ref={ref} className={className}></div>;
};

export default Timer;
