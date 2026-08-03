import {useState, useEffect, useRef} from 'react';
import PopupTemplate from './PopupTemplate';
import skillNodes from './skillNodes';

function SkillTree({ onClose, onActivate, initialPosition, onPositionChange, zIndex }) {
  const width = 600;
  const height = 340;
  const [scale, setScale] = useState(1);
  const [autoFitEnabled, setAutoFitEnabled] = useState(true);
  const svgContainerRef = useRef(null);
  const [measuredText, setMeasuredText] = useState({});
  const [selectedNode, setSelectedNode] = useState(null);

  // Provide a simple data model: list of nodes (id + label) and links [parent, child].
  // Positions will be computed automatically by a basic subtree-width layout.
  const nodes = skillNodes;

  const links = [
    ['web-dev', 'frontend'],
    ['programming', 'web-dev'],
    ['web-dev', 'backend'],
    ['js', 'react'],
    ['frontend', 'css'],
    ['backend', 'node'],
    ['backend', 'db'],
    ['backend', 'php'],
    ['api', 'phython'],
    ['phython', 'flask'],
    ['backend', 'C#'],
    ['frontend', 'bootstrap'],
    ['game_dev', 'godot'],
    ['godot', 'gdscript'],
    ['programming', 'game_dev'],
    ['game_dev', 'sprite'],
    ['sprite', 'aseprite'],
    ['game_dev', 'sound'],
    ['sound', 'bgm'],
    ['backend', 'api'],
    ['C#', 'asp'],
    ['php', 'laravel'],
    ['db', 'sql'],
    ['frontend', 'js'],
    ['js', 'node'],
    ['programming', 'tool'],
    ['tool', 'git'],
  ];

  const nodeStyle = { cursor: 'pointer' };

  // Build children map and incoming counts
  const childrenMap = new Map();
  const incoming = new Map();
  nodes.forEach(n => { childrenMap.set(n.id, []); incoming.set(n.id, 0); });
  links.forEach(([p, c]) => {
    if (!childrenMap.has(p)) childrenMap.set(p, []);
    childrenMap.get(p).push(c);
    incoming.set(c, (incoming.get(c) || 0) + 1);
  });

  // Find roots (no incoming edges)
  const roots = nodes.filter(n => (incoming.get(n.id) || 0) === 0).map(n => n.id);

  // Compute subtree sizes (units) so we can distribute horizontal space.
  const sizeMap = new Map();
  function computeSize(id) {
    if (sizeMap.has(id)) return sizeMap.get(id);
    const children = childrenMap.get(id) || [];
    const size = children.length === 0 ? 1 : children.reduce((s, cid) => s + computeSize(cid), 0);
    sizeMap.set(id, size);
    return size;
  }
  roots.forEach(r => computeSize(r));
  const totalUnits = roots.reduce((s, r) => s + (sizeMap.get(r) || 1), 0);

  // Layout parameters
  const margin = 40;
  const levelHeight = 100;
  // Estimate each node's visual width (based on label length) and ensure unit width prevents overlap
  const approxCharWidth = 7; // approximate px per character for the chosen pixel font at fontSize 11
  const computedNodeWidths = new Map();
  nodes.forEach(n => {
    const est = Math.max(96, n.label.length * approxCharWidth + 24); // padding
    computedNodeWidths.set(n.id, est);
  });
  const maxNodeVisual = Math.max(...Array.from(computedNodeWidths.values()));
  const nodeGap = 16; // minimum horizontal gap between nodes
  const minUnitWidth = Math.max(40, Math.round(maxNodeVisual + nodeGap));
  const unitWidth = Math.max(minUnitWidth, (width - margin * 2) / totalUnits);

  // Assign positions recursively
  const posMap = new Map();
  function assign(id, depth, leftUnit) {
    const size = sizeMap.get(id) || 1;
    const x = margin + (leftUnit + size / 2) * unitWidth;
    const y = margin + depth * levelHeight;
    posMap.set(id, { x, y, depth });
    const children = childrenMap.get(id) || [];
    let cursor = leftUnit;
    children.forEach(child => {
      assign(child, depth + 1, cursor);
      cursor += sizeMap.get(child) || 1;
    });
  }

  // Place each root sequentially
  let cursor = 0;
  roots.forEach(r => {
    assign(r, 0, cursor);
    cursor += sizeMap.get(r) || 1;
  });

  // Compose nodes with positions for rendering
  const nodesWithPos = nodes.map(n => ({ ...n, ...(posMap.get(n.id) || { x: 0, y: 0 }), width: computedNodeWidths.get(n.id) }));

  // Compute content height based on deepest node so the SVG can expand and be scrollable
  const maxNodeY = nodesWithPos.reduce((m, n) => Math.max(m, n.y), 0);
  const contentHeight = Math.max(height, Math.min(2000, Math.round(maxNodeY + 120)));
  // Compute content width based on total units so wide trees get horizontal space
  const contentWidth = Math.max(width, Math.round(totalUnits * unitWidth + margin * 2));

  // Auto-fit: when enabled, measure the visible container and set `scale` so the whole SVG fits
  useEffect(() => {
    const c = svgContainerRef.current;
    if (!c) return;

    function doFit() {
      if (!autoFitEnabled) return;
      const availableWidth = c.clientWidth || 400;
      const availableHeight = c.clientHeight || 320;
      const scaleX = availableWidth / contentWidth;
      const scaleY = availableHeight / contentHeight;
      const target = Math.max(0.25, Math.min(2, Math.min(scaleX, scaleY)));
      setScale(Number(target.toFixed(2)));
    }

    // Initial fit
    doFit();

    // Re-fit on container resize or window resize
    let ro;
    if (typeof ResizeObserver !== 'undefined') {
      ro = new ResizeObserver(doFit);
      ro.observe(c);
    }
    window.addEventListener('resize', doFit);
    return () => {
      if (ro) ro.disconnect();
      window.removeEventListener('resize', doFit);
    };
  }, [contentWidth, contentHeight, autoFitEnabled, svgContainerRef]);

  // Measure actual rendered text lengths in the SVG and compute needed font sizes
  useEffect(() => {
    const svg = document.getElementById('skilltree-svg');
    if (!svg) return;

    const baseFontSize = 11;
    const minFontSize = 8;
    const baseCharWidth = 7; // fallback estimate
    const newMap = {};

    nodesWithPos.forEach(n => {
      const w = n.width || 96;
      const avail = Math.max(8, w - 12);
      const label = n.label || '';

      // Create a temporary <text> element to measure
      let measuredLength = label.length * baseCharWidth;
      try {
        const t = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        t.setAttribute('font-family', "'Press Start 2P', monospace");
        t.setAttribute('font-size', String(baseFontSize));
        t.setAttribute('visibility', 'hidden');
        t.textContent = label;
        svg.appendChild(t);
        if (typeof t.getComputedTextLength === 'function') measuredLength = t.getComputedTextLength();
        svg.removeChild(t);
      } catch (e) {
        // ignore; fallback to estimate
      }

      if (measuredLength > avail) {
        const scaleFactor = avail / measuredLength;
        let fs = Math.max(minFontSize, Math.min(baseFontSize, baseFontSize * scaleFactor));
        fs = Math.round(fs * 10) / 10;
        newMap[n.id] = { fontSize: fs, needTextLength: true };
      } else {
        newMap[n.id] = { fontSize: baseFontSize, needTextLength: false };
      }
    });

    setMeasuredText(newMap);
  }, [nodesWithPos, scale]);

  function handleNodeClick(n) {
    setSelectedNode(prev => (prev && prev.id === n.id) ? null : n);
  }

  return (
    <PopupTemplate
      title="skill tree"
      subtitle="The list of skills I have learned and used in my projects."
      onClose={onClose}
      onActivate={onActivate}
      initialPosition={initialPosition}
      onPositionChange={onPositionChange}
      zIndex={zIndex}
      width={800}
      height={700}
    >
      <div style={{ textAlign: 'center', border: '2px solid #272736', borderRadius: 14, backgroundColor: '#ffffeb', padding: 8, height: '100%', minHeight: 0, display: 'flex', flexDirection: 'column' }}>
        {/* Zoom controls */}
        <div className="skilltree-zoom-controls">
          <div className="skilltree-zoom-buttons">
            <button className="skilltree-zoom-button" onClick={() => { setAutoFitEnabled(false); setScale(s => Math.max(0.25, +(s - 0.05).toFixed(2))); }}>-</button>
            <input className="skilltree-zoom-range" type="range" min="0.25" max="2" step="0.01" value={scale} onChange={(e) => { setAutoFitEnabled(false); setScale(Number(e.target.value)); }} />
            <button className="skilltree-zoom-button" onClick={() => { setAutoFitEnabled(false); setScale(s => Math.min(2, +(s + 0.05).toFixed(2))); }}>+</button>
            <button className="skilltree-zoom-button" onClick={() => { setAutoFitEnabled(false); setScale(1); }} style={{ marginLeft: 8 }}>Reset</button>
            <button className="skilltree-zoom-button skilltree-auto-fit" onClick={() => { setAutoFitEnabled(true); }}>Auto Fit</button>
          </div>
          <div className="skilltree-zoom-label">Zoom: {Math.round(scale * 100)}%</div>
        </div>
        <div ref={svgContainerRef} className="skilltree-scroll" style={{ maxHeight: 320, overflow: 'auto' }}>
          <svg id="skilltree-svg" viewBox={`0 0 ${contentWidth} ${contentHeight}`} width={contentWidth * scale} height={contentHeight * scale} preserveAspectRatio="xMinYMin meet">

          {/* links — orthogonal (horizontal then vertical) routing (plain lines) */}
          {links.map(([a, b]) => {
            const from = nodesWithPos.find(n => n.id === a) || { x: 0, y: 0 };
            const to = nodesWithPos.find(n => n.id === b) || { x: 0, y: 0 };
            const halfH = 20; // half of rectangle height
            const startX = from.x;
            const startY = from.y + halfH;
            const endX = to.x;
            const endY = to.y - halfH;

            // Path: short vertical from source, then horizontal, then vertical to target
            const shortStep = 28;
            const dir = Math.sign(endY - startY) || 1;
            const firstY = startY + dir * shortStep;
            const d = `M ${startX} ${startY} L ${startX} ${firstY} L ${endX} ${firstY} L ${endX} ${endY}`;

            return <path key={`${a}-${b}`} d={d} fill="none" stroke="#272736" strokeWidth={2} />;
          })}

          {/* nodes as rounded rectangles */}
          {nodesWithPos.map(n => (
            <g key={n.id} transform={`translate(${n.x}, ${n.y})`} style={nodeStyle} onClick={() => handleNodeClick(n)}>
                {
                  (() => {
                    const w = n.width || 96;
                  const h = 40;
                  const baseFontSize = 11;
                  // const minFontSize = 8;
                    const measure = measuredText[n.id] || null;
                    const fontSize = measure ? measure.fontSize : baseFontSize;
                    const textProps = (measure && measure.needTextLength) ? { textLength: Math.max(0, w - 12), lengthAdjust: 'spacingAndGlyphs' } : {};
                  return (
                    <>
                        <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={8} fill="#7e7e8f" stroke={n.id === (selectedNode && selectedNode.id) ? '#ffe478' : '#272736'} strokeWidth={n.id === (selectedNode && selectedNode.id) ? 3 : 2} />
                      <text x={0} y={6} fontSize={fontSize} fontFamily="'Press Start 2P', monospace" textAnchor="middle" fill="#111" {...textProps}>
                        {n.label}
                      </text>
                    </>
                  );
                })()
              }
            </g>
          ))}
          </svg>
        </div>

          {/* Planning to add the name, level, knowledge, experience, effect, utilized in what project. */}
        <div style={{ marginTop: 8, borderTop: '1px solid #e5e5e5', paddingTop: 8 }}>
          {selectedNode ? (
            <div style={{ textAlign: 'left', display: 'grid', gap: 10 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16 }}>
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontSize: 14, fontWeight: 700 }}>{selectedNode.label}</div>
                  <div style={{ fontSize: 12, color: '#666', marginTop: 4 }}>ID: {selectedNode.id}</div>
                </div>
                <div style={{ backgroundColor: '#fff4c4', borderRadius: 8, padding: '8px 12px', minWidth: 88, textAlign: 'center' }}>
                  <div style={{ fontSize: 12, color: '#666' }}>Level</div>
                  <div style={{ fontSize: 16, fontWeight: 700 }}>{selectedNode.level || 0}/10</div>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div style={{ backgroundColor: '#ffffeb', borderRadius: 8, padding: 10, minHeight: 64 }}>
                  <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 4 }}>Knowledge</div>
                  <div style={{ fontSize: 12, color: '#444' }}>{selectedNode.knowledge || 0}/10</div>
                  <div style={{ fontSize: 12, fontWeight: 700, margin: '10px 0 4px' }}>Experience</div>
                  <div style={{ fontSize: 12, color: '#444' }}>{selectedNode.experience || 0}/10</div>
                  <div style={{ fontSize: 12, fontWeight: 700, margin: '10px 0 4px' }}>Effect</div>
                  <div style={{ fontSize: 12, color: '#444' }}>{selectedNode.effect || '—'}</div>
                </div>

                <div style={{ backgroundColor: '#ffffeb', borderRadius: 8, padding: 10, minHeight: 64 }}>
                  <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 4 }}>Utilized In</div>
                  <div style={{ fontSize: 12, color: '#444', display: 'flex', flexDirection: 'column', gap: 4 }}>
                    {Array.isArray(selectedNode.utilizedIn) && selectedNode.utilizedIn.length > 0
                      ? selectedNode.utilizedIn.map((project, index) => (
                          <span key={index}>• {project}</span>
                        ))
                      : '—'}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div style={{ color: '#666' }}>Click a node to see details here.</div>
          )}
        </div>

        {/* <p style={{ marginTop: 8, color: '#666' }}>Skill tree is interactive.</p> */}
      </div>
    </PopupTemplate>
  );
}

export default SkillTree;
