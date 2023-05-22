import { useState } from 'react';
import { place } from './icontypes.js';
import { useEffect } from 'react';

export default function Icon({ index, isItTaken, selectedRoom, fullRooms, roomId, freePlacesInRoom }) {
  const [iconType, setIconType] = useState(place.available);

  useEffect(() => {
    if (!isItTaken) {
      if ((selectedRoom === roomId) & (index === freePlacesInRoom - 1)) {
        setIconType(place.selected);
      } else {
        setIconType(place.available);
      }
    }
    if (isItTaken) {
      if (fullRooms.includes(roomId)) {
        setIconType(place.unavailableAndFull);
      } else {
        setIconType(place.unavailable);
      }
    }
  }, [selectedRoom]);

  return <div>{iconType}</div>;
}
