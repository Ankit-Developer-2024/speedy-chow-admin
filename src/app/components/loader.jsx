  import { useEffect, useState } from 'react';
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
        import 'react-circular-progressbar/dist/styles.css'; // Import default styles

export const Loader = function Loader() {
          const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      if (percentage < 100) {
        setPercentage(percentage + 10);
      } else {
        setPercentage(0); // Reset for continuous animation
      }
    }, 100);
  }, [percentage]);
          return (
            <div style={{ width: 60, height: 60 }}>
              <CircularProgressbar 
                 styles={buildStyles({ 
                   pathColor:'var(--color-orange-400)'
                 })}
              value={percentage}    />
            </div>
          );
        }