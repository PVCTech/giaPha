import { useEffect, useMemo, useState } from 'react'
import familyMembers from './data/family.json'
import FamilyTree from './components/FamilyTree'
import MemberDetails from './components/MemberDetails'
import AddMemberModal from './components/AddMemberModal'
import MemberDirectory from './components/MemberDirectory'
import { getRelatedMembers } from './utils/family'
import './App.css'

function Icon({ name, size = 18 }) {
  const paths = {
    tree: <><path d="M12 3v4" /><path d="M8 7h8v5H8z" /><path d="M4 15h6v5H4zM14 15h6v5h-6z" /><path d="M12 12v2M7 12v3m10-3v3" /></>,
    people: <><circle cx="9" cy="8" r="3" /><path d="M3 20v-1a6 6 0 0 1 12 0v1z" /><path d="M16 5.2a3 3 0 0 1 0 5.6M18 14a5 5 0 0 1 3 4.6V20h-3" /></>,
    book: <><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v17H6.5A2.5 2.5 0 0 1 4 17.5z" /><path d="M4 16h16M8 7h8" /></>,
    settings: <><circle cx="12" cy="12" r="3" /><path d="m19.4 15 .1.1 1.4 1.1-1.4 2.4-1.7-.6a8 8 0 0 1-1.5.9l-.3 1.8h-2.8l-.3-1.8a8 8 0 0 1-1.5-.9l-1.7.6-1.4-2.4 1.4-1.1a7 7 0 0 1 0-1.8l-1.4-1.1 1.4-2.4 1.7.6a8 8 0 0 1 1.5-.9l.3-1.8h2.8l.3 1.8a8 8 0 0 1 1.5.9l1.7-.6 1.4 2.4-1.4 1.1a7 7 0 0 1 0 1.7Z" transform="translate(-1 -1) scale(.92)" /></>,
    search: <><circle cx="10.8" cy="10.8" r="6.8" /><path d="m16 16 4 4" /></>,
    download: <><path d="M12 3v12m-5-5 5 5 5-5" /><path d="M4 17v3h16v-3" /></>,
    plus: <><path d="M12 5v14M5 12h14" /></>,
    chevron: <path d="m9 18 6-6-6-6" />,
    close: <><path d="m18 6-12 12M6 6l12 12" /></>,
    print: <><path d="M6 9V3h12v6M6 18H4V9h16v9h-2" /><path d="M6 14h12v7H6zM17 11h.01" /></>,
    location: <><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2" /></>,
    calendar: <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M16 3v4M8 3v4M3 10h18" /></>,
    heart: <path d="M20.8 8.7c0 5.2-8.8 11-8.8 11s-8.8-5.8-8.8-11a4.7 4.7 0 0 1 8.8-2.3 4.7 4.7 0 0 1 8.8 2.3Z" />,
  }
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>
}

function getSavedMembers() {
  const saved = window.localStorage.getItem('gia-pha-viet:members')
  if (!saved) return familyMembers

  let parsedMembers
  try {
    parsedMembers = JSON.parse(saved)
  } catch (error) {
    console.error('Không thể đọc danh sách thành viên đã lưu.', error)
    return familyMembers
  }

  const requiredFields = Object.keys(familyMembers[0])
  if (!Array.isArray(parsedMembers) || !parsedMembers.length || !parsedMembers.every((member) =>
    member && typeof member === 'object' && requiredFields.every((field) => field in member),
  )) {
    console.error('Danh sách thành viên đã lưu không đúng định dạng; đang sử dụng dữ liệu mẫu.')
    return familyMembers
  }

  return parsedMembers
}

function App() {
  const [members, setMembers] = useState(getSavedMembers)
  const [selectedId, setSelectedId] = useState('6')
  const [view, setView] = useState('family')
  const [treeMode, setTreeMode] = useState('all')
  const [search, setSearch] = useState('')
  const [isAddingMember, setIsAddingMember] = useState(false)

  const selectedMember = members.find((member) => member.id === selectedId) ?? members[0]
  const generationCount = Math.max(1, ...members.map((member) => member.doi || 1))
  const relatedIds = useMemo(() => getRelatedMembers(members, selectedId), [members, selectedId])
  const treeMembers = treeMode === 'all'
    ? members.filter((member) => !member.notShowOnTree)
    : members.filter((member) => relatedIds.has(member.id) && !member.notShowOnTree)
  const searchResults = search.trim()
    ? members.filter((member) => member.hoVaTen.toLocaleLowerCase('vi').includes(search.trim().toLocaleLowerCase('vi'))).slice(0, 5)
    : []

  useEffect(() => {
    window.localStorage.setItem('gia-pha-viet:members', JSON.stringify(members))
  }, [members])

  function exportSvg() {
    const svg = document.querySelector('#family-tree-svg')
    if (!svg) return
    const exportedSvg = svg.cloneNode(true)
    const style = document.createElementNS('http://www.w3.org/2000/svg', 'style')
    style.textContent = `
      .svg-generation-label{fill:#a4a59d;font-family:Arial,sans-serif;font-size:8px;font-weight:700;letter-spacing:1px}
      .svg-generation-line{stroke:#eae8df;stroke-dasharray:2 4;stroke-width:1}
      .parent-connector{fill:none;stroke:#d4d7ce;stroke-width:1.5}
      .partner-connector{stroke:#c8d1c5;stroke-dasharray:3 3;stroke-width:1.5}
      .member-card{fill:#fff;stroke:#e9e9e2;stroke-width:1}
      .tree-member.is-selected .member-card{fill:#f8fbf7;stroke:#64866a;stroke-width:1.5}
      .member-avatar{fill:#e8efe7}.is-female .member-avatar{fill:#f4e9e5}
      .member-initials{fill:#57765d;font-family:Arial,sans-serif;font-size:10px;font-weight:700}
      .is-female .member-initials{fill:#a06f62}
      .member-name{fill:#454c44;font-family:Arial,sans-serif;font-size:10px;font-weight:600}
      .member-year{fill:#969990;font-family:Arial,sans-serif;font-size:8px}
      .selected-indicator{fill:#638768}
    `
    exportedSvg.insertBefore(style, exportedSvg.firstChild)
    const file = new Blob([new XMLSerializer().serializeToString(exportedSvg)], { type: 'image/svg+xml;charset=utf-8' })
    const url = URL.createObjectURL(file)
    const link = document.createElement('a')
    link.href = url
    link.download = `gia-pha-${treeMode === 'all' ? 'tong-the' : 'nha'}.svg`
    document.body.appendChild(link)
    link.click()
    link.remove()
    window.setTimeout(() => URL.revokeObjectURL(url), 1000)
  }

  function addMember(member) {
    setMembers((current) => [...current, member])
    setSelectedId(member.id)
    setTreeMode('all')
    setIsAddingMember(false)
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <a className="brand" href="#" aria-label="Gia phả Việt">
          <span className="brand-mark"><Icon name="tree" size={23} /></span>
          <span className="brand-copy"><strong>Gia phả Việt</strong><small>Gìn giữ cội nguồn</small></span>
        </a>

        <div className="sidebar-label">KHÔNG GIAN GIA ĐÌNH</div>
        <button className="family-switcher" type="button" onClick={() => setView('family')}>
          <span className="family-seal">N</span>
          <span className="family-switcher-copy"><strong>Dòng họ Nguyễn</strong><small>Làng Hạ · Nam Định</small></span>
          <span className="switcher-chevron">⌄</span>
        </button>

        <div className="sidebar-label nav-label">QUẢN LÝ</div>
        <nav className="main-nav" aria-label="Điều hướng chính">
          <button className={`nav-item ${view === 'family' ? 'active' : ''}`} onClick={() => setView('family')} type="button"><Icon name="tree" /> <span>Sơ đồ gia phả</span><span className="nav-count">12</span></button>
          <button className={`nav-item ${view === 'members' ? 'active' : ''}`} onClick={() => setView('members')} type="button"><Icon name="people" /> <span>Thành viên</span></button>
          <button className={`nav-item ${view === 'stories' ? 'active' : ''}`} onClick={() => setView('stories')} type="button"><Icon name="book" /> <span>Tư liệu dòng họ</span></button>
        </nav>

        <div className="sidebar-bottom">
          <div className="help-card"><span className="help-icon">✳</span><strong>Lưu giữ câu chuyện<br />gia đình bạn</strong><p>Thêm thành viên và kết nối các thế hệ.</p><button type="button" onClick={() => setIsAddingMember(true)}>Thêm thành viên <Icon name="chevron" size={14} /></button></div>
          <button className="nav-item settings-item" onClick={() => setView('settings')} type="button"><Icon name="settings" /> <span>Cài đặt</span></button>
          <div className="profile"><div className="profile-avatar">ML</div><div><strong>Minh Long</strong><small>Quản trị viên</small></div><span className="profile-dots">···</span></div>
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div className="breadcrumb"><span>Gia đình</span><Icon name="chevron" size={14} /><strong>{view === 'family' ? 'Sơ đồ gia phả' : view === 'members' ? 'Thành viên' : view === 'stories' ? 'Tư liệu dòng họ' : 'Cài đặt'}</strong></div>
          <div className="topbar-actions">
            <label className="search-box"><Icon name="search" size={17} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Tìm thành viên..." aria-label="Tìm thành viên" /><kbd>⌘ K</kbd>
              {search && <div className="search-results">{searchResults.length ? searchResults.map((member) => <button type="button" key={member.id} onClick={() => { setSelectedId(member.id); setTreeMode('related'); setView('family'); setSearch('') }}><span className="mini-avatar">{member.gioiTinh === 'Nam' ? '♂' : '♀'}</span><span><strong>{member.hoVaTen}</strong><small>Đời thứ {member.doi} · {member.namSinh || 'Chưa rõ năm sinh'}</small></span></button>) : <div className="empty-search">Không tìm thấy thành viên phù hợp</div>}</div>}
            </label>
            <button className="top-add-button" onClick={() => setIsAddingMember(true)} type="button"><Icon name="plus" size={16} /><span>Thêm thành viên</span></button>
          </div>
        </header>

        {view === 'family' ? (
          <>
            <section className="page-heading">
              <div><div className="eyebrow"><span className="eyebrow-dot" /> KHÔNG GIAN GIA ĐÌNH</div><h1>Cội nguồn của chúng ta</h1><p>Cùng gìn giữ và kết nối những thế hệ trong gia đình.</p></div>
              <div className="heading-stats"><div><strong>{members.length}</strong><span>thành viên</span></div><i /><div><strong>{generationCount}</strong><span>thế hệ</span></div><div className="generation-badge">Đời thứ {generationCount} <span>⌄</span></div></div>
            </section>

            <section className="tree-toolbar">
              <div className="view-tabs" role="tablist" aria-label="Phạm vi sơ đồ">
                <button className={treeMode === 'all' ? 'selected' : ''} type="button" role="tab" aria-selected={treeMode === 'all'} onClick={() => setTreeMode('all')}>Toàn gia phả</button>
                <button className={treeMode === 'related' ? 'selected' : ''} type="button" role="tab" aria-selected={treeMode === 'related'} onClick={() => setTreeMode('related')}>Gia đình của {selectedMember.hoVaTen.split(' ').at(-1)}</button>
              </div>
              <div className="tree-actions"><span className="updated-status"><span /> Đã lưu</span><button className="icon-button" type="button" title="Xuất sơ đồ SVG" onClick={exportSvg}><Icon name="download" /></button><button className="export-button" type="button" onClick={() => window.print()}><Icon name="print" size={16} /> Xuất PDF</button></div>
            </section>

            <section className="workspace">
              <div className="tree-panel">
                <div className="tree-panel-heading"><div><span className="panel-overline">{treeMode === 'all' ? 'DÒNG HỌ NGUYỄN' : 'NHÁNH GIA ĐÌNH'}</span><h2>{treeMode === 'all' ? 'Sơ đồ tổng thể' : `Gia đình ${selectedMember.hoVaTen}`}</h2></div><button className="tree-legend" type="button"><span className="legend-dot male" /> Nam <span className="legend-dot female" /> Nữ</button></div>
                <div className="tree-canvas"><FamilyTree members={treeMembers} selectedId={selectedId} onSelect={setSelectedId} /></div>
                <div className="tree-footer"><span><span className="footer-dot" /> Cập nhật lần cuối: hôm nay, 09:41</span><span className="tree-hint">Chọn một thành viên để xem chi tiết</span></div>
              </div>
              <MemberDetails member={selectedMember} members={members} relatedCount={relatedIds.size} onFocus={() => setTreeMode('related')} />
            </section>
          </>
        ) : view === 'members' ? (
          <MemberDirectory members={members} onSelect={(memberId) => { setSelectedId(memberId); setTreeMode('related'); setView('family') }} />
        ) : (
          <section className="placeholder-page"><div className="placeholder-icon"><Icon name={view === 'members' ? 'people' : view === 'stories' ? 'book' : 'settings'} size={26} /></div><h1>{view === 'members' ? 'Thành viên gia đình' : view === 'stories' ? 'Tư liệu dòng họ' : 'Cài đặt'}</h1><p>Thông tin này đang được sắp xếp. Bạn có thể tiếp tục khám phá sơ đồ gia phả.</p><button type="button" onClick={() => setView('family')}>Quay lại sơ đồ gia phả <Icon name="chevron" size={15} /></button></section>
        )}
      </main>
      {isAddingMember && <AddMemberModal members={members} onClose={() => setIsAddingMember(false)} onSave={addMember} />}
    </div>
  )
}

export default App
