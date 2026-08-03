import PopupTemplate from './PopupTemplate';

function Achievements({ onClose, onActivate, initialPosition, onPositionChange, zIndex }) {
  const sectionStyle = {
    padding: '14px',
    backgroundColor: '#fff4c4',
    border: '3px solid #272736',
    borderRadius: '14px',
    color: '#272736',
  };

  const itemHeader = {
    margin: '0 0 6px',
    fontSize: '12px',
  };

  const itemMeta = {
    margin: '0 0 10px',
    color: '#5f4b66',
    fontSize: '10px',
  };

  return (
    <PopupTemplate
      title="achievements"
      subtitle="Track work experiences."
      onClose={onClose}
      onActivate={onActivate}
      initialPosition={initialPosition}
      onPositionChange={onPositionChange}
      zIndex={zIndex}
      width={900}
    >
      <div style={{ display: 'grid', gap: '16px' }}>
        <div style={sectionStyle}>
          <h5 style={{ marginTop: 0 }}>Graduation</h5>
          <div style={{ height: '2px', width: '180px', backgroundColor: '#272736', margin: '8px 0' }} />
          <p style={itemHeader}>Bachelor of Science in Information Technology</p>
          <p style={itemMeta}>Davao del Sur State College · Graduated 2023</p>
          <p>Completed a degree focused on software development, algorithms, and system design.</p>
        </div>

        <div style={sectionStyle}>
          <h5 style={{ marginTop: 0 }}>Work Experience</h5>
          <div style={{ height: '2px', width: '180px', backgroundColor: '#272736', margin: '8px 0' }} />
          <div style={{ marginBottom: '12px' }}>
            <p style={itemHeader}>Technical Support Intern</p>
            <p style={itemMeta}>Davao del Sur State College · 2023–2023</p>
            <ul>
              <li>Performed troubleshooting and maintenance of office computers and laptops in the Faculty of Education Department.</li>
              <li>Assisted students of the Education Department in their technical problems with the school portal or Google Classroom.</li>
            </ul>
          </div>
          <div style={{ height: '2px', width: '180px', backgroundColor: '#272736', margin: '8px 0' }} />
          <div>
            <p style={itemHeader}>Technical Support Intern</p>
            <p style={itemMeta}>Bansalan Coconut Farmers and Workers Cooperative · 2023–2023</p>
            <ul>
              <li>Performed troubleshooting and maintenance of the office computers in Bansalan Coconut Farmers and Workers Multi-Purpose Cooperative.</li>
              <li>Encoding financial history for data organization of the company.</li>
            </ul>
          </div>
          <div style={{ height: '2px', width: '180px', backgroundColor: '#272736', margin: '8px 0' }} />
          <div>
            <p style={itemHeader}>IT College Instructor</p>
            <p style={itemMeta}>St. Mary's College of Bansalan Inc. · 2024–2026</p>
            <ul>
              <li>Taught Object-Oriented Programming (Java), Web Development, Information Security, and Game Development to undergraduate students.</li>
              <li>Mentored over 50 students through software design, implementation, debugging, testing, and deployment.</li>
              <li>Guided students in applying Software Development Life Cycle (SDLC) principles to capstone projects.</li>
            </ul>
          </div>
        </div>

        {/* <div style={sectionStyle}>
          <h5 style={{ marginTop: 0 }}>Meaningful Achievements</h5>
          <ul style={{ margin: 0, paddingLeft: '18px', color: '#272736' }}>
            <li>Led the launch of a portfolio app used by over 1,000 visitors per month.</li>
            <li>Won recognition for a capstone project that automated workflows for small teams.</li>
            <li>Designed and shipped a responsive website with performance and accessibility improvements.</li>
          </ul>
        </div> */}
      </div>
    </PopupTemplate>
  );
}

export default Achievements;
