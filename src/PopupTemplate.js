import { useRef } from 'react';
import Draggable from 'react-draggable';
import { Container, Row, Col, Button } from 'react-bootstrap';

function PopupTemplate({ title, subtitle, children, onClose, onActivate, initialPosition, onPositionChange, zIndex, width = '420px', height = 'auto' }) {
  const nodeRef = useRef(null);

  const handleDrag = (_, data) => {
    onPositionChange({ x: data.x, y: data.y });
  };

  return (
    <Draggable
      nodeRef={nodeRef}
      handle=".drag-handle"
      bounds="parent"
      position={initialPosition}
      onStart={() => onActivate && onActivate()}
      onDrag={handleDrag}
    >
      <div
        ref={nodeRef}
        onMouseDown={() => onActivate && onActivate()}
        style={{
          position: 'absolute',
          width,
          height,
          zIndex: zIndex || 20,
        }}
      >
        <Container
          fluid
          className="rounded overflow-hidden mx-auto"
          style={{ backgroundColor: '#ffffeb', border: '3px solid #272736', height: '100%', display: 'flex', flexDirection: 'column' }}
          onMouseDown={() => onActivate && onActivate()}
        >
          <Row className="px-3 py-2 drag-handle align-items-center" style={{ backgroundColor: '#422445' }}>
            <Col className="d-flex align-items-center justify-content-between">
              <span className="fw-bold fs-5" style={{ color: '#ffffeb' }}>{title}</span>
              <Button variant="outline-light" size="lg" onClick={onClose}>
                ×
              </Button>
            </Col>
          </Row>
          <Row className="p-3" style={{ backgroundColor: '#f5f1dc', flex: 1, minHeight: 0, overflow: 'hidden', display: 'flex' }}>
            <Col style={{ height: '100%', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
              {subtitle && <p className="mb-3">{subtitle}</p>}
              {children}
            </Col>
          </Row>
        </Container>
      </div>
    </Draggable>
  );
}

export default PopupTemplate;
