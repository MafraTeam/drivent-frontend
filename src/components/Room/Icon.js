import { useState } from 'react';
import { place } from './icontypes.js';
import { useEffect } from 'react';

export default function Icon({ index, isItTaken, selectedRoom, fullRooms, roomId }) {
  const [iconType, setIconType] = useState(place.available);

  useEffect(() => {
    if (selectedRoom === index) {
      setIconType(place.selected);
    }
    if (!isItTaken) {
      setIconType(place.available);
    }
    if (isItTaken) {
      if (fullRooms.includes(roomId)) {
        setIconType(place.unavailableAndFull);
      } else {
        setIconType(place.unavailable);
      }
    }
    console.log(fullRooms);
  }, []);

  return (
    <div>{iconType}</div>
  );
}
