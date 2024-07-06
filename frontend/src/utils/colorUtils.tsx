// Utility function to convert hex to RGB
export const hexToRgb = (hex) => {
    const bigint = parseInt(hex.slice(1), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return [r, g, b];
  };
  
  // Utility function to convert RGB to hex
  export const rgbToHex = (r, g, b) => {
    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
  };
  
  // Function to darken a color by a percentage
  const darkenColor = (hex, percent) => {
    const [r, g, b] = hexToRgb(hex);
    const newR = Math.max(0, Math.min(255, Math.floor(r * (1 - percent))));
    const newG = Math.max(0, Math.min(255, Math.floor(g * (1 - percent))));
    const newB = Math.max(0, Math.min(255, Math.floor(b * (1 - percent))));
    return rgbToHex(newR, newG, newB);
  };
  
  const DarkenButton = (initialColor, customClass) => {
    const [color, setColor] = useState(initialColor);
    const [hoverColor, setHoverColor] = useState(darkenColor(initialColor, 0.2));

    return(
      <button className={{customClass} + 'px-4 py-2 text-white rounded'} 
      style={{backgroundColor: color}}
      onMouseEnter={setColor(hoverColor)} />
    )
  }


  function newColor(initialColor){
    return darkenColor(initialColor, 0.2);
  }