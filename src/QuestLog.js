import { useState } from 'react';
import { Modal, Carousel } from 'react-bootstrap';
import PopupTemplate from './PopupTemplate';
import projectList from './projectList';

// status colors:
const greenColor = '#3ca370';
const yellowColor = '#f2a65e';
const blueColor = '#4b5bab';
const redColor = '#b0305c';
const blackColor = '#272736';

function statusColor(status) {
  switch (status) {
    case 'COMPLETED':
      return greenColor;
    case 'IN PROGRESS':
      return yellowColor;
    case 'PLANNED':
      return blueColor;
    case 'NOT STARTED':
      return redColor;
    default:
      return blackColor;
  }
}

function statusName(status) {
  switch (status) {
    case 'COMPLETED':
      return 'Quest Cleared';
    case 'IN PROGRESS':
      return 'Quest Active';
    case 'PLANNED':
      return 'Quest Accepted';
    case 'NOT STARTED':
      return 'Quest Locked';
    default:
      return 'Unknown Status';
  }
}

function QuestLog({ onClose, onActivate, initialPosition, onPositionChange, zIndex, width = 840, height = 560 }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [showPreview, setShowPreview] = useState(false);
  const selectedProject = projectList[selectedIndex] || projectList[0];
  const hasPreviewImages = Array.isArray(selectedProject.images) && selectedProject.images.length > 0;

  return (
    <PopupTemplate
      title="quest log"
      subtitle="Select a quest to view details"
      onClose={onClose}
      onActivate={onActivate}
      initialPosition={initialPosition}
      onPositionChange={onPositionChange}
      zIndex={zIndex}
      width={width}
      height={height}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '240px minmax(0, 1fr)',
          gap: '14px',
          height: '100%',
          minHeight: 0,
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            padding: '10px',
            backgroundColor: '#fff7d6',
            border: '2px solid #272736',
            borderRadius: '14px',
            minHeight: 0,
            height: '100%',
          }}
        >
          <div style={{ fontSize: '12px', fontWeight: 700, color: '#272736' }}>Quests</div>
          <div className="quest-log-scroll" style={{ flex: 1, minHeight: 0, display: 'grid', gap: '10px', paddingRight: '2px' }}>
            {projectList.map((project, index) => {
              const isActive = index === selectedIndex;
              return (
                <button
                  key={project.title}
                  type="button"
                  onClick={() => setSelectedIndex(index)}
                  style={{
                    display: 'block',
                    width: '100%',
                    textAlign: 'left',
                    padding: '12px 14px',
                    backgroundColor: isActive ? '#bd4882' : '#ffffeb',
                    color: isActive ? '#ffffeb' : '#272736',
                    border: `2px solid #272736`,
                    borderRadius: '12px',
                    cursor: 'pointer',
                    fontSize: '12px',
                    fontWeight: isActive ? 700 : 500,
                    whiteSpace: 'normal',
                    wordBreak: 'break-word',
                    boxSizing: 'border-box',
                  }}
                >
                  {project.title}
                </button>
              );
            })}
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            padding: '14px',
            backgroundColor: '#fff7d6',
            border: '2px solid #272736',
            borderRadius: '14px',
            minHeight: 0,
            height: '100%',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px' }}>
            <div>
              <h3 style={{ margin: 0, fontSize: '16px' }}>{selectedProject.title}</h3>
              <p style={{ margin: '6px 0 0', fontSize: '11px', color: '#43434f' }}>{selectedProject.subtitle}</p>
            </div>
            <span style={{ fontSize: '10px', color: statusColor(selectedProject.status), letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              {statusName(selectedProject.status)}
            </span>
          </div>

          <div style={{ height: '2px', width: '120px', backgroundColor: '#272736', margin: '0 0 10px' }} />

          <div className="quest-log-scroll" style={{ flex: 1, minHeight: 0 }}>
            <p style={{ margin: 0, fontSize: '12px', lineHeight: 1.6 }}>{selectedProject.description}</p>
          </div>

          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            {selectedProject.tags.map((tag) => (
              <span
                key={tag}
                style={{
                  fontSize: '10px',
                  padding: '5px 10px',
                  borderRadius: '999px',
                  backgroundColor: '#e9e3bc',
                  color: '#272736',
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
            <div style={{ fontSize: '11px' }}>
              <div style={{ fontWeight: 700 }}>Progress</div>
              <div>{selectedProject.progress}% complete</div>
            </div>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {hasPreviewImages ? (
                <button
                  type="button"
                  onClick={() => setShowPreview(true)}
                  style={{
                    padding: '10px 14px',
                    border: '2px solid #272736',
                    borderRadius: '999px',
                    backgroundColor: '#272736',
                    color: '#ffffeb',
                    fontSize: '11px',
                    cursor: 'pointer',
                  }}
                >
                  Preview Images
                </button>
              ) : null}
              {selectedProject.link ? (
                <button
                  type="button"
                  onClick={() => window.open(selectedProject.link, '_blank', 'noopener')}
                  style={{
                    padding: '10px 14px',
                    border: '2px solid #272736',
                    borderRadius: '999px',
                    backgroundColor: '#272736',
                    color: '#ffffeb',
                    fontSize: '11px',
                    cursor: 'pointer',
                  }}
                >
                  Open Link
                </button>
              ) : null}
            </div>
          </div>
        </div>
      </div>

      {hasPreviewImages ? (
        <Modal show={showPreview} onHide={() => setShowPreview(false)} size="lg" centered>
          <Modal.Header closeButton closeVariant='white' style={{ backgroundColor: '#272736', borderBottom: '2px solid #ff', color: '#ffffeb' }}>
            <Modal.Title>Preview: {selectedProject.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Carousel>
              {selectedProject.images.map((image, index) => {
                const imageSrc = typeof image === 'string' ? image : image.src;
                const imageAlt = typeof image === 'string' ? `${selectedProject.title} preview ${index + 1}` : image.alt || `${selectedProject.title} preview ${index + 1}`;
                return (
                  <Carousel.Item key={imageSrc || index}>
                    <img
                      src={imageSrc}
                      alt={imageAlt}
                      style={{ width: '100%', maxHeight: '480px', objectFit: 'contain' }}
                    />
                    {typeof image === 'object' && image.caption ? (
                      <Carousel.Caption>
                        <p>{image.caption}</p>
                      </Carousel.Caption>
                    ) : null}
                  </Carousel.Item>
                );
              })}
            </Carousel>
          </Modal.Body>
        </Modal>
      ) : null}
    </PopupTemplate>
  );
}

export default QuestLog;
