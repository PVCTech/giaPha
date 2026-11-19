import './MemberDetails.css'

function formatDate(member) {
  if (!member.ngaySinh && !member.thangSinh && !member.namSinh) return 'Chưa cập nhật'
  return [member.ngaySinh, member.thangSinh, member.namSinh].filter(Boolean).join('/')
}

function getAge(member) {
  if (!member.namSinh) return ''
  const endYear = member.daChet ? member.namMatDuong : new Date().getFullYear()
  return endYear ? `${endYear - member.namSinh} tuổi` : ''
}

function MemberDetails({ member, members, relatedCount, onFocus }) {
  if (!member) return <aside className="member-details"><p>Chọn một thành viên để xem thông tin.</p></aside>
  const father = members.find((person) => person.id === member.idBo)
  const mother = members.find((person) => person.id === member.idMe)
  const partner = members.find((person) => person.id === member.idVoChon)
  const children = members.filter((person) => person.idBo === member.id || person.idMe === member.id)
  const initials = member.hoVaTen.split(' ').slice(-2).map((part) => part[0]).join('').toLocaleUpperCase('vi')

  return (
    <aside className="member-details">
      <div className="details-heading"><div><span className="panel-overline">HỒ SƠ THÀNH VIÊN</span><h2>Thông tin</h2></div><button type="button" className="more-button" aria-label="Tùy chọn khác">···</button></div>
      <div className="member-profile-card">
        <div className={`large-avatar ${member.gioiTinh === 'Nữ' ? 'female' : ''}`}>{initials}</div>
        <div className="member-name-block"><h3>{member.hoVaTen}</h3><span>{member.chucDanh || `Đời thứ ${member.doi}`}</span></div>
        <span className="generation-pill">Đời {member.doi}</span>
      </div>
      <div className="member-status"><span className="status-dot" />{member.daChet ? 'Đã mất' : 'Đang sống'}<span className="status-divider">·</span>{member.gioiTinh}</div>

      <div className="detail-section">
        <h4>THÔNG TIN CƠ BẢN</h4>
        <div className="detail-row"><span><span className="detail-icon"><i className="calendar-mark" /></span>Ngày sinh</span><strong>{formatDate(member)} <em>{getAge(member)}</em></strong></div>
        <div className="detail-row"><span><span className="detail-icon"><i className="location-mark" /></span>Quê quán</span><strong>{member.diaChi || member.tinh || 'Chưa cập nhật'}</strong></div>
        <div className="detail-row"><span><span className="detail-icon"><i className="blood-mark">A</i></span>Nhóm máu</span><strong>{member.nhomMau || 'Chưa cập nhật'}</strong></div>
        {member.soDienThoai1 && <div className="detail-row"><span><span className="detail-icon"><i className="phone-mark">⌕</i></span>Điện thoại</span><strong>{member.soDienThoai1}</strong></div>}
      </div>

      <div className="detail-section family-section">
        <h4>QUAN HỆ GIA ĐÌNH</h4>
        {father && <div className="relative-row"><div className="relative-avatar male">{father.hoVaTen.split(' ').slice(-1)[0][0]}</div><div><small>Thân phụ</small><strong>{father.hoVaTen}</strong></div></div>}
        {mother && <div className="relative-row"><div className="relative-avatar female">{mother.hoVaTen.split(' ').slice(-1)[0][0]}</div><div><small>Thân mẫu</small><strong>{mother.hoVaTen}</strong></div></div>}
        {partner && <div className="relative-row"><div className="relative-avatar female">{partner.hoVaTen.split(' ').slice(-1)[0][0]}</div><div><small>Vợ / chồng</small><strong>{partner.hoVaTen}</strong></div></div>}
        <div className="relative-row"><div className="relative-avatar children-avatar">⌂</div><div><small>Con cái</small><strong>{children.length ? children.map((child) => child.hoVaTen.split(' ').at(-1)).join(', ') : 'Chưa có thông tin'}</strong></div></div>
      </div>
      {member.ghiChu && <div className="member-note"><span>GHI CHÚ</span><p>{member.ghiChu}</p></div>}
      <button className="show-family-button" type="button" onClick={onFocus}><span className="show-family-icon">⌘</span>Xem gia đình liên quan <span className="related-count">{relatedCount}</span></button>
    </aside>
  )
}

export default MemberDetails
