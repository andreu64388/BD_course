import { useState, useEffect } from "react";
import "./Dashboard.css";

interface Props {
   value: number;
   max: number;
}

const Dashboard = ({ value, max }: Props) => {
   const [percent, setPercent] = useState(0);
   const [dashOffset, setDashOffset] = useState(400);
   const [counter, setCounter] = useState(0);

   useEffect(() => {
      const animationDuration = 5000;
      const animationStartTime = performance.now();

      const animationFrame = () => {
         const timeFraction =
            (performance.now() - animationStartTime) / animationDuration;
         if (timeFraction > 1) {
            setDashOffset((1 - value / max) * 400);
            return;
         }

         setDashOffset((1 - value / max) * 400 * (1 - timeFraction));

         requestAnimationFrame(animationFrame);
      };

      const animationId = requestAnimationFrame(animationFrame);

      return () => {
         cancelAnimationFrame(animationId);
      };
   }, [value, max]);

   useEffect(() => {
      document.documentElement.style.setProperty(
         "--progress",
         `${(counter / max) * 100}%`
      );
   }, [counter, max]);

   useEffect(() => {
      const intervalId = setInterval(() => {
         if (counter >= value) {
            clearInterval(intervalId);
         } else {
            setCounter(counter + 1);
         }
      }, 100);

      return () => clearInterval(intervalId);
   }, [counter, value]);

   return (
      <div className="dashboards">
         <svg
            className="dashboard-circle"
            width="200"
            height="200"
            viewBox="0 0 200 200"
            xmlns="http://www.w3.org/2000/svg"
         >
            <circle
               className="dashboard-background"
               cx="100"
               cy="100"
               r="80"
               strokeWidth="40"
               stroke="#222"
               fill="none"
            />
            <circle
               className="dashboard-progress"
               cx="100"
               cy="100"
               r="80"
               strokeWidth="40"
               stroke="#ffcc00"
               strokeDasharray="400"
               strokeDashoffset={dashOffset}
               fill="none"
               transform="rotate(-90,100,100)"
               style={{
                  strokeDashoffset: dashOffset,
                  transition: "stroke-dashoffset 1s",

               }}
            />

            <text
               className="dashboard-value"
               x="100"
               y="100"
               dominantBaseline="middle"
               textAnchor="middle"

            >
               <tspan className="dashboard-value">{counter}</tspan>
               <tspan className="dashboard-max">{max}</tspan>
            </text>
         </svg>
      </div>
   );
};

export default Dashboard;
