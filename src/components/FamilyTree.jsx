import './FamilyTree.css'

const CARD_WIDTH = 174
const CARD_HEIGHT = 80
const HORIZONTAL_GAP = 28
const TOP_PADDING = 60
const ROW_GAP = 112

function getInitials(name) {
  return name.split(' ').slice(-2).map((part) => part[0]).join('').toLocaleUpperCase('vi')
}

function FamilyTree({ members, selectedId, onSelect }) {
  const generations = [...new Set(members.map((member) => member.doi || 1))].sort((a, b) => a - b)
  const rows = new Map(generations.map((generation) => [
    generation,
    members.filter((member) => (member.doi || 1) === generation),
  ]))
  const maxCount = Math.max(1, ...[...rows.values()].map((row) => row.length))
  const width = Math.max(940, maxCount * (CARD_WIDTH + HORIZONTAL_GAP) + HORIZONTAL_GAP)
  const height = TOP_PADDING * 2 + generations.length * (CARD_HEIGHT + ROW_GAP)
  const positions = new Map()

  generations.forEach((generation, rowIndex) => {
    const row = rows.get(generation)
    const rowWidth = row.length * CARD_WIDTH + (row.length - 1) * HORIZONTAL_GAP
    const offset = (width - rowWidth) / 2
    row.forEach((member, index) => {
      positions.set(member.id, {
        x: offset + index * (CARD_WIDTH + HORIZONTAL_GAP),
        y: TOP_PADDING + rowIndex * (CARD_HEIGHT + ROW_GAP),
      })
    })
  })

  const visibleIds = new Set(members.map((member) => member.id))
  const parentLines = members.flatMap((child) => {
    const childPosition = positions.get(child.id)
    const parents = [child.idBo, child.idMe].filter((parentId) => visibleIds.has(parentId))
    if (!childPosition || !parents.length) return []
    const parentPositions = parents.map((parentId) => positions.get(parentId)).filter(Boolean)
    if (!parentPositions.length) return []
    const parentCenter = parentPositions.reduce((sum, position) => sum + position.x + CARD_WIDTH / 2, 0) / parentPositions.length
    const startY = Math.max(...parentPositions.map((position) => position.y + CARD_HEIGHT))
    const childX = childPosition.x + CARD_WIDTH / 2
    const elbowY = childPosition.y - 28
    return [{ key: child.id, path: `M ${parentCenter} ${startY} V ${elbowY} H ${childX} V ${childPosition.y}` }]
  })
  const partnerLines = members.flatMap((member) => {
    const partner = members.find((candidate) => candidate.id === member.idVoChon)
    const first = positions.get(member.id)
    const second = partner && positions.get(partner.id)
    if (!first || !second || first.y !== second.y || first.x > second.x) return []
    return [{ key: `${member.id}-${partner.id}`, x1: first.x + CARD_WIDTH, x2: second.x, y: first.y + CARD_HEIGHT / 2 }]
  })

  if (!members.length) return <div className="tree-empty">Chưa có thành viên trong sơ đồ này.</div>

  return (
    <div className="tree-scroll">
      <svg id="family-tree-svg" className="family-tree-svg" xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox={`0 0 ${width} ${height}`} role="img" aria-label="Sơ đồ phả hệ gia đình">
        <rect width={width} height={height} fill="#fbfaf7" />
        {generations.map((generation, index) => {
          const y = TOP_PADDING + index * (CARD_HEIGHT + ROW_GAP) - 25
          return <g key={generation}><text x="24" y={y + 4} className="svg-generation-label">ĐỜI {generation}</text><line x1="88" y1={y} x2={width - 24} y2={y} className="svg-generation-line" /></g>
        })}
        <g className="tree-connectors">
          {parentLines.map((line) => <path key={line.key} d={line.path} className="parent-connector" />)}
          {partnerLines.map((line) => <line key={line.key} x1={line.x1} x2={line.x2} y1={line.y} y2={line.y} className="partner-connector" />)}
        </g>
        {members.map((member) => {
          const position = positions.get(member.id)
          const isSelected = member.id === selectedId
          const isFemale = member.gioiTinh === 'Nữ'
          const deathLabel = member.daChet ? 'Đã mất' : member.namSinh ? `Sinh ${member.namSinh}` : 'Thành viên'
          return (
            <g
              key={member.id}
              className={`tree-member ${isSelected ? 'is-selected' : ''} ${isFemale ? 'is-female' : ''}`}
              transform={`translate(${position.x} ${position.y})`}
              onClick={() => onSelect(member.id)}
              onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') onSelect(member.id) }}
              role="button"
              tabIndex="0"
              aria-label={`${member.hoVaTen}, đời ${member.doi}`}
            >
              <rect className="member-card" width={CARD_WIDTH} height={CARD_HEIGHT} rx="10" />
              <circle className="member-avatar" cx="30" cy="30" r="18" />
              <text className="member-initials" x="30" y="34" textAnchor="middle">{getInitials(member.hoVaTen)}</text>
              <text className="member-name" x="56" y="30">{member.hoVaTen}</text>
              <text className="member-year" x="56" y="51">{deathLabel}</text>
              {isSelected && <circle className="selected-indicator" cx={CARD_WIDTH - 14} cy="14" r="4" />}
            </g>
          )
        })}
      </svg>
    </div>
  )
}

export default FamilyTree
