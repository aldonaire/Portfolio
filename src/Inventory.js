import { useState } from 'react';
import PopupTemplate from './PopupTemplate';
import inventoryItems from './inventoryItems';

function Inventory({ onClose, onActivate, initialPosition, onPositionChange, zIndex }) {
  const [hoveredItem, setHoveredItem] = useState(null);
  // const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const slots = Array.from({ length: 24 }, (_, index) => inventoryItems[index] || null);

  return (
    <PopupTemplate
      title="inventory"
      subtitle="List of tools that I use to build software and web applications."
      onClose={onClose}
      onActivate={onActivate}
      initialPosition={initialPosition}
      onPositionChange={onPositionChange}
      zIndex={zIndex}
      width={600}    >
      <div
        style={{
          position: 'relative',
          display: 'grid',
          gridTemplateColumns: 'repeat(6, minmax(0, 1fr))',
          gap: '10px',
          padding: '8px',
          border: '3px solid #272736',
          borderRadius: '16px',
          backgroundColor: '#e9dfb7',
          overflow: 'visible',
        }}
      >
        {slots.map((item, index) => (
          <div
            key={item ? item.id : `empty-${index}`}
            style={{
              position: 'relative',
              aspectRatio: '1 / 1',
              border: '2px solid #272736',
              borderRadius: '12px',
              backgroundColor: item ? '#f5f1dc' : '#c8be8f',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'visible',
              boxShadow: 'inset 0 0 0 1px rgba(39,39,54,0.15)',
            }}
            onMouseEnter={(event) => {
              if (item) {
                // const rect = event.currentTarget.getBoundingClientRect();
                // setHoveredItem(item.name);
                // setTooltipPosition({ x: rect.left, y: rect.top, width: rect.width, height: rect.height });
                setHoveredItem(item.name);
              }
            }}
            // onMouseMove={(event) => {
            //   if (item) {
            //     const rect = event.currentTarget.getBoundingClientRect();
            //     setTooltipPosition({ x: rect.left, y: rect.top, width: rect.width, height: rect.height });
            //   }
            // }}
            onMouseLeave={() => setHoveredItem(null)}
          >
            {item ? (
              <img
                src={item.icon}
                alt={item.name}
                style={{
                  width: '70%',
                  height: '70%',
                  objectFit: 'contain',
                  imageRendering: 'pixelated',
                }}
              />
            ) : null}

            {hoveredItem === item?.name ? (
              <div
                style={{
                  position: 'absolute',
                  left: '50%',
                  top: '50%',
                  transform: 'translate(-50%, -50%)',
                  zIndex: 20,
                  display: 'inline-block',
                  width: 'fit-content',
                  maxWidth: 'none',
                  padding: '6px 8px',
                  backgroundColor: 'rgba(39,39,54,0.96)',
                  color: '#fff',
                  fontSize: '9px',
                  textAlign: 'center',
                  borderRadius: '8px',
                  whiteSpace: 'nowrap',
                  pointerEvents: 'none',
                  boxSizing: 'border-box',
                  boxShadow: '0 4px 10px rgba(0,0,0,0.25)',
                }}
              >
                {item.name}
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </PopupTemplate>
  );
}

export default Inventory;
