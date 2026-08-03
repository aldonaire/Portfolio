// import logo from './logo.svg';
import './App.css';
import {useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Row, Col, ProgressBar} from 'react-bootstrap';
import QuestLog from './QuestLog';
import SkillTree from './SkillTree';
import Inventory from './Inventory';
import Achievements from './Achievements';
import GuildHall from './GuildHall';

function App() {
  const [openPopups, setOpenPopups] = useState({});
  const [savedPopupPositions, setSavedPopupPositions] = useState({});
  const [nextZIndex, setNextZIndex] = useState(100);

  const getDefaultPopupPosition = () => ({
    x: 0,
    y: 0,
  });

  const [progress, setProgress] = useState({ hp: 0, mp: 0, exp: 0 });

  useEffect(() => {
    const targets = { hp: 100, mp: 100, exp: 70 };
    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = { ...prev };
        let finished = true;

        for (const key of Object.keys(targets)) {
          if (prev[key] < targets[key]) {
            next[key] = Math.min(prev[key] + 12, targets[key]);
            finished = false;
          }
        }

        if (finished) {
          clearInterval(interval);
        }

        return next;
      });
    }, 50);

    return () => clearInterval(interval);
  }, []);

  const handleOpenPopup = (popupName) => {
    setOpenPopups((prev) => {
      if (prev[popupName]) return prev;

      const zIndex = nextZIndex;
      setNextZIndex((current) => current + 1);
      const position = savedPopupPositions[popupName] ?? getDefaultPopupPosition();

      return {
        ...prev,
        [popupName]: {
          position,
          zIndex,
        },
      };
    });
  };

  const handleClosePopup = (popupName) => {
    setOpenPopups((prev) => {
      if (!prev[popupName]) return prev;
      const popupPosition = prev[popupName]?.position;
      if (popupPosition) {
        setSavedPopupPositions((saved) => ({
          ...saved,
          [popupName]: popupPosition,
        }));
      }

      const next = { ...prev };
      delete next[popupName];
      return next;
    });
  };

  const handlePopupMoved = (popupName, position) => {
    setOpenPopups((prev) => {
      if (!prev[popupName]) return prev;
      return {
        ...prev,
        [popupName]: {
          ...prev[popupName],
          position,
        },
      };
    });
    setSavedPopupPositions((saved) => ({
      ...saved,
      [popupName]: position,
    }));
  };

  const bringPopupToFront = (popupName) => {
    setOpenPopups((prev) => {
      if (!prev[popupName]) return prev;
      const zIndex = nextZIndex;
      setNextZIndex((current) => current + 1);
      return {
        ...prev,
        [popupName]: {
          ...prev[popupName],
          zIndex,
        },
      };
    });
  };

  const popupComponents = {
    QuestLog,
    SkillTree,
    Inventory,
    Achievements,
    GuildHall,
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh', position: 'relative' }}>
      {Object.entries(openPopups).map(([popupName, popupState]) => {
        const PopupComponent = popupComponents[popupName];
        if (!PopupComponent) return null;

        const popupPosition = popupState?.position ?? savedPopupPositions[popupName] ?? { x: -220, y: -120 };
        const popupZIndex = popupState?.zIndex ?? 100;

        return (
          <PopupComponent
            key={popupName}
            onClose={() => handleClosePopup(popupName)}
            onActivate={() => bringPopupToFront(popupName)}
            initialPosition={popupPosition}
            onPositionChange={(position) => handlePopupMoved(popupName, position)}
            zIndex={popupZIndex}
          />
        );
      })}
      <Container fluid="md" className="rounded overflow-hidden mx-auto" style={{ maxWidth: '700px', backgroundColor: '#ffffeb', border: '3px solid #272736', borderRadius: '20px'}}>
        <Row className="px-3 py-2" style={{ backgroundColor: '#422445'}}>
          <Col className="d-flex align-items-center justify-content-between">
            <span className="fw-bold fs-4" style={{ color: '#ffffeb'}} >home</span>
            <small style={{ color: '#ffffeb'}}>Patch 1.0</small>
          </Col>
        </Row>
        <Row className="p-4">
          <Col>
              <div style={{ padding: '20px', border: '2px solid #272736', borderRadius: '18px', backgroundColor: '#f5f1dc', marginBottom: '10px' }}>
                <div style={{ marginBottom: '12px' }}>
                  <div style={{ fontSize: '16px', fontWeight: 700 }}>Aidan Lloyd Donaire</div>
                  <div style={{ height: '2px', width: '180px', backgroundColor: '#272736', margin: '8px 0' }} />
                </div>
                <div style={{ display: 'grid', gap: '10px', fontSize: '13px' }}>
                  <div>
                    <div style={{ color: '#43434f', letterSpacing: '0.08em' }}>CLASS</div>
                    <div>Full Stack Developer</div>
                  </div>
                  <div>
                    <div style={{ color: '#43434f', letterSpacing: '0.08em' }}>SUBCLASS</div>
                    <div>Backend Specialist</div>
                  </div>
                  <div>
                    <div style={{ color: '#43434f', letterSpacing: '0.08em' }}>LEVEL</div>
                    <div>Lv. 26</div>
                    <div>(Years Alive)</div>
                  </div>
                  <div>
                    <div style={{ color: '#43434f', letterSpacing: '0.08em' }}>GUILD</div>
                    <div>Available for Hire</div>
                  </div>
                </div>
              </div>
              <div style={{ padding: '15px', border: '2px solid #272736', borderRadius: '18px', backgroundColor: '#f5f1dc' }}>
                <div style={{ marginBottom: '12px' }}>
                  <div style={{ fontSize: '13px', fontWeight: 700 }}>Passive Skills</div>
                  <div style={{ height: '2px', width: '180px', backgroundColor: '#272736', margin: '8px 0' }} />
                </div>
                <div style={{ display: 'grid', gap: '10px', fontSize: '10px' }}>
                  <ul>
                    <li>Problem Solver</li>
                    <li>Clean Code</li>
                    <li>Team Player</li>
                    <li>Documentation</li>
                    <li>Adaptability</li>
                  </ul>
                </div>
              </div>
          </Col>
          <Col style={{ backgroundColor: '#ffb5b5', borderRadius: '20px', padding: '16px', border: '2px solid #272736'}}>
            <Row className="mb-3">
              <Col className="d-flex justify-content-center" >
                <div style={{ width: '200px', aspectRatio: '1 / 1', borderRadius: '50%', overflow: 'hidden', border: '4px solid #272736' }}>
                  <img
                    src={process.env.PUBLIC_URL + "/home/MyPhoto.jpg"}
                    alt="About me"
                    className="img-fluid"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
              </Col>
            </Row>
            <Row className="align-items-center mb-3 gx-2 gy-2">
              <Col xs={2} className="fw-semibold">
                HP
              </Col>
              <Col>
                <ProgressBar now={progress.hp} className="custom-progress-hp" />
              </Col>
              <Col xs={2} className="fw-semibold text-end">
                {progress.hp}%
              </Col>
            </Row>
            <Row className="align-items-center mb-3 gx-2 gy-2">
              <Col xs={2} className="fw-semibold">
                MP
              </Col>
              <Col>
                <ProgressBar now={progress.mp} className="custom-progress-mp" />
              </Col>
              <Col xs={2} className="fw-semibold text-end">
                {progress.mp}%
              </Col>
            </Row>
            <Row className="align-items-center gx-2 gy-2">
              <Col xs={2} className="fw-semibold">
                EXP
              </Col>
              <Col>
                <ProgressBar now={progress.exp} className="custom-progress-exp" />
              </Col>
              <Col xs={2} className="fw-semibold text-end">
                {progress.exp}%
              </Col>
            </Row>
            <Row className="mb-3">
              <Col>
                <div style={{ marginBottom: '12px', marginTop: '20px' }}>
                  <div style={{ fontSize: '13px', fontWeight: 700 }}>Current Quest</div>
                  <div style={{ height: '2px', width: '180px', backgroundColor: '#272736', margin: '8px 0' }} />
                </div>
                <div style={{ display: 'grid', gap: '10px', fontSize: '13px' }}>
                  <div>
                    <div>Looking for a team where I can
build scalable software and grow
as a Full Stack Developer.</div>
                  </div>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row className="p-4 text-center" style={{ borderRadius: '20px', padding: '16px', border: '2px solid #272736', margin: '0px 5px 13px', backgroundColor: '#f5f1dc' }}>
          <Col onClick={() => handleOpenPopup('QuestLog')} className="d-flex flex-column align-items-center">
            <div className="icon-card">
              <img
                src={process.env.PUBLIC_URL + "/home/ProjectIcon.png"}
                alt="Projects"
                className="img-fluid"
                style={{ width: '60px', height: '60px', objectFit: 'cover', imageRendering: 'pixelated'}}
              />
            </div>
            <small className="mt-2">Quest Log</small>
          </Col>
          <Col onClick={() => handleOpenPopup('SkillTree')} className="d-flex flex-column align-items-center">
            <div className="icon-card">
              <img
                src={process.env.PUBLIC_URL + "/home/SkillIcon.png"}
                alt="Skills"
                className="img-fluid"
                style={{ width: '60px', height: '60px', objectFit: 'cover', imageRendering: 'pixelated' }}
              />
            </div>
            <small className="mt-2">Skill Tree</small>
          </Col>
          <Col onClick={() => handleOpenPopup('Inventory')} className="d-flex flex-column align-items-center">
            <div className="icon-card">
              <img
                src={process.env.PUBLIC_URL + "/home/ExperienceIcon.png"}
                alt="Experience"
                className="img-fluid"
                style={{ width: '60px', height: '60px', objectFit: 'cover', imageRendering: 'pixelated' }}
              />
            </div>
            <small className="mt-2">Inventory</small>
          </Col>
          <Col onClick={() => handleOpenPopup('Achievements')} className="d-flex flex-column align-items-center">
            <div className="icon-card">
              <img
                src={process.env.PUBLIC_URL + "/home/AchievementIcon.png"}
                alt="Achievements"
                className="img-fluid"
                style={{ width: '60px', height: '60px', objectFit: 'cover', imageRendering: 'pixelated' }}
              />
            </div>
            <small className="mt-2">Achievements</small>
          </Col>
          <Col onClick={() => handleOpenPopup('GuildHall')} className="d-flex flex-column align-items-center">
            <div className="icon-card">
              <img
                src={process.env.PUBLIC_URL + "/home/ContactIcon.png"}
                alt="Contact"
                className="img-fluid"
                style={{ width: '60px', height: '60px', objectFit: 'cover', imageRendering: 'pixelated' }}
              />
            </div>
            <small className="mt-2">Guild Hall</small>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
