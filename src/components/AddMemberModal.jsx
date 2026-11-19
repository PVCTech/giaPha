import { useState } from 'react'
import './AddMemberModal.css'

function AddMemberModal({ members, onClose, onSave }) {
  const [name, setName] = useState('')
  const [gender, setGender] = useState('Nam')
  const [fatherId, setFatherId] = useState('')
  const [motherId, setMotherId] = useState('')
  const [error, setError] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    const normalizedName = name.trim()
    if (!normalizedName) {
      setError('Vui lòng nhập họ và tên.')
      return
    }
    if (members.some((member) => member.hoVaTen.toLocaleLowerCase('vi') === normalizedName.toLocaleLowerCase('vi'))) {
      setError('Tên thành viên này đã có trong gia phả.')
      return
    }
    const father = members.find((member) => member.id === fatherId)
    const mother = members.find((member) => member.id === motherId)
    const generation = Math.max(father?.doi ?? 0, mother?.doi ?? 0) + 1 || 1
    const nextNumber = members.reduce((maximum, member) => {
      const suffix = member.id.match(/\d+$/)?.[0]
      return Math.max(maximum, Number(suffix) || 0)
    }, 0) + 1
    onSave({
      id: String(nextNumber),
      hoVaTen: normalizedName,
      gioiTinh: gender,
      doi: generation,
      idBo: fatherId,
      idMe: motherId,
      idVoChon: '',
      tenThuongGoi: '',
      chucDanh: '',
      ngaySinh: '',
      thangSinh: '',
      namSinh: '',
      daChet: false,
      ngayMatDuong: '',
      thangMatDuong: '',
      namMatDuong: '',
      ngayMatAm: '',
      thangMatAm: '',
      namMatAm: '',
      tinhTrangHonNhan: '',
      nhomMau: '',
      hocVan: '',
      soDienThoai1: '',
      soDienThoai2: '',
      diaChi: '',
      tinh: '',
      tonGiao: '',
      notShowOnTree: false,
      quanHeVoiChaMe: '',
      ghiChu: '',
    })
  }

  return (
    <div className="modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}>
      <section className="member-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <div className="modal-heading"><div><span className="panel-overline">DÒNG HỌ NGUYỄN</span><h2 id="modal-title">Thêm thành viên</h2></div><button type="button" className="modal-close" onClick={onClose} aria-label="Đóng">×</button></div>
        <p className="modal-description">Bổ sung thông tin để kết nối thêm một thế hệ trong gia đình.</p>
        <form onSubmit={handleSubmit}>
          <label className="form-field">Họ và tên <span>*</span><input autoFocus value={name} onChange={(event) => { setName(event.target.value); setError('') }} placeholder="Ví dụ: Nguyễn Văn An" /></label>
          <label className="form-field">Giới tính <select value={gender} onChange={(event) => setGender(event.target.value)}><option>Nam</option><option>Nữ</option></select></label>
          <div className="form-row">
            <label className="form-field">Thân phụ<select value={fatherId} onChange={(event) => setFatherId(event.target.value)}><option value="">Chọn thành viên</option>{members.filter((member) => member.gioiTinh === 'Nam').map((member) => <option key={member.id} value={member.id}>{member.hoVaTen}</option>)}</select></label>
            <label className="form-field">Thân mẫu<select value={motherId} onChange={(event) => setMotherId(event.target.value)}><option value="">Chọn thành viên</option>{members.filter((member) => member.gioiTinh === 'Nữ').map((member) => <option key={member.id} value={member.id}>{member.hoVaTen}</option>)}</select></label>
          </div>
          {error && <p className="form-error" role="alert">{error}</p>}
          <div className="modal-actions"><button type="button" className="cancel-button" onClick={onClose}>Hủy</button><button type="submit" className="save-button">Thêm vào gia phả <span>→</span></button></div>
        </form>
      </section>
    </div>
  )
}

export default AddMemberModal
