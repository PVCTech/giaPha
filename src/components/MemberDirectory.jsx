import './MemberDirectory.css'

function MemberDirectory({ members, onSelect }) {
  const sortedMembers = [...members].sort((a, b) => a.doi - b.doi || a.hoVaTen.localeCompare(b.hoVaTen, 'vi'))

  return (
    <section className="directory-page">
      <div className="directory-heading">
        <div><span className="eyebrow"><span className="eyebrow-dot" /> DÒNG HỌ NGUYỄN</span><h1>Thành viên gia đình</h1><p>Danh sách các thành viên qua từng thế hệ.</p></div>
        <span className="directory-count">{members.length} thành viên</span>
      </div>
      <div className="directory-table">
        <div className="directory-table-head"><span>THÀNH VIÊN</span><span>GIỚI TÍNH</span><span>NĂM SINH</span><span>THẾ HỆ</span><span>TRẠNG THÁI</span></div>
        {sortedMembers.map((member) => (
          <button className="directory-row" type="button" key={member.id} onClick={() => onSelect(member.id)}>
            <span className="directory-person"><span className={`directory-avatar ${member.gioiTinh === 'Nữ' ? 'female' : ''}`}>{member.hoVaTen.split(' ').slice(-2).map((part) => part[0]).join('')}</span><span><strong>{member.hoVaTen}</strong><small>{member.chucDanh || member.tenThuongGoi || 'Thành viên'}</small></span></span>
            <span className="directory-gender">{member.gioiTinh}</span>
            <span className="directory-year">{member.namSinh || '—'}</span>
            <span className="directory-generation">Đời {member.doi}</span>
            <span className="directory-status"><i className={member.daChet ? 'deceased' : ''} />{member.daChet ? 'Đã mất' : 'Đang sống'}</span>
          </button>
        ))}
      </div>
    </section>
  )
}

export default MemberDirectory
