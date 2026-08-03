import PopupTemplate from './PopupTemplate';

function GuildHall({ onClose, onActivate, initialPosition, onPositionChange, zIndex }) {
  return (
    <PopupTemplate
      title="guild hall"
      subtitle="Connect with me, view contact options, and send a message."
      onClose={onClose}
      onActivate={onActivate}
      initialPosition={initialPosition}
      onPositionChange={onPositionChange}
      zIndex={zIndex}
      width={500}
    >
      <div style={{ display: 'grid', gap: '16px' }}>
        <div style={{ padding: '12px', backgroundColor: '#f7f0d8', borderRadius: '14px', border: '2px solid #272736' }}>
          <h5 style={{ margin: 0 }}>Status</h5>
          <p style={{ margin: '8px 0 0', color: '#8fde5d' }}>Available for Hire</p>
        </div>
        <div style={{ padding: '12px', backgroundColor: '#f7f0d8', borderRadius: '14px', border: '2px solid #272736' }}>
          <h5 style={{ margin: 0 }}>Current quest</h5>
          <p style={{ margin: '8px 0 0', color: '#272736' }}>Join a development
team and contribute
to production-ready
software while
gaining experience.</p>
        </div>
        <div style={{ padding: '12px', backgroundColor: '#f7f0d8', borderRadius: '14px', border: '2px solid #272736' }}>
          <h5 style={{ margin: 0 }}>Preferred Roles</h5>
          <ul style={{ margin: 0, paddingLeft: '18px', color: '#333' }}>
              <li>Backend</li>
              <li>Full Stack</li>
              <li>Web Developer</li>
            </ul>
        </div>
        <div style={{ padding: '12px', backgroundColor: '#f7f0d8', borderRadius: '14px', border: '2px solid #272736' }}>
          <h5 style={{ margin: 0 }}>Preferred Work Setup</h5>
          <ul style={{ margin: 0, paddingLeft: '18px', color: '#333' }}>
              <li>Remote</li>
              <li>Davao Onsite</li>
            </ul>
        </div>

        <div style={{ display: 'grid', gap: '10px' }}>
          <div style={{ padding: '12px', backgroundColor: '#fff4c4', borderRadius: '14px', border: '2px solid #272736' }}>
            <div style={{ fontWeight: 700, marginBottom: '8px' }}>Contacts</div>
            <ul style={{ margin: 0, paddingLeft: '18px', color: '#333' }}>
              <li>Email: <a href="mailto:aidan.donaire@gmail.com" style={{ color: '#272736', textDecoration: 'underline' }}>aidan.donaire@gmail.com</a></li>
              <li>GitHub: <a href="https://github.com/aldonaire" target="_blank" rel="noreferrer" style={{ color: '#272736', textDecoration: 'underline' }}>https://github.com/aldonaire</a></li>
              <li>LinkedIn: <a href="https://www.linkedin.com/in/aidanlloyddonaire/" target="_blank" rel="noreferrer" style={{ color: '#272736', textDecoration: 'underline' }}>linkedin.com/in/aidanlloyddonaire</a></li>
              {/* <li>Discord: <span style={{ color: '#272736' }}>yea</span></li> */}
            </ul>
          </div>

          <div style={{ padding: '12px', backgroundColor: '#f7f0d8', borderRadius: '14px', border: '2px solid #272736' }}>
            <div style={{ fontWeight: 700, marginBottom: '8px' }}>Services</div>
            <ul style={{ margin: 0, paddingLeft: '18px', color: '#333' }}>
              <li>Back end Development</li>
              <li>REST API Development</li>
              <li>Full Stack Web Apps</li>
              <li>Bug Fixes & Refactoring</li>
              <li>Portfolio & Dashboard Projects</li>
            </ul>
          </div>
        </div>
      </div>
    </PopupTemplate>
  );
}

export default GuildHall;
