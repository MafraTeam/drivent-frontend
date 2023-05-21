import { useState } from 'react';
import { place } from './icontypes.js';
import { useEffect } from 'react';

export default function Icon({ index, isItTaken }) {
  const [iconType, setIconType] = useState(place.available);

  useEffect(() => {
    // if (selectedRoom === index) {
    //   setIconType(place.selected);
    // }
    if (!isItTaken) {
      setIconType(place.available);
    }
    if (isItTaken) {
      setIconType(place.unavailable);
    }
  }, []);

  return (
    <div onClick={() => console.log(index)}>{iconType}</div>
  );
}
