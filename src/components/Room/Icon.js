import { useState } from 'react';
import { place } from './icontypes.js';
import { useEffect } from 'react';

export default function Icon({ index, handleClick, selected, availablePlacesInRoom }) {
  const [iconType, setIconType] = useState(place.available);

  useEffect(() => {
    //Se escolher 1a opçao de mapear:
    if (selected === index) {
      setIconType(place.selected);
    }
    if (availablePlacesInRoom[index] === true) {
      setIconType(place.available);
    }
    if (availablePlacesInRoom[index] === false) {
      setIconType(place.unavailable);
    }
  }, [selected]);

  return (
    <div onClick={() => handleClick(index)}>{iconType}</div>
  );
}
