import React, { useEffect, useState } from 'react'
import { IKDispatch, IKUseSelector } from '../../../store';
import { useDispatch } from 'react-redux';
import { fetchAssignShiftToUser, fetchGetPersonelShiftList } from '../../../store/feature/userShiftSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { IPersonelAssignToShiftRequest } from '../../../models/IPersonelAssignToShiftRequest';

function NewPersonelAssignShiftModal() {

  const personelList = IKUseSelector(state => state.userShiftSlice.personelListByCompanyId);
  const shiftList = IKUseSelector(state => state.shiftSlice.shiftList);

  const dispatch = useDispatch<IKDispatch>();

  const [shiftId, setShiftId] = useState(0);
  const [personelId, setPersonelId] = useState(0);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');


  //seçilen personelin id değerini setler.
  const handlePersonelChange = (event: any) => {
    setPersonelId(event.target.value);
  }

  //seçilen vardiyanın id değerini setler.
  const handleShiftChange = (evt: any) => {
    setShiftId(evt.target.value);
  }

  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toISOString().split("T")[0];
    setStartDate(formattedDate);
    setEndDate(formattedDate);
  }, []);

  const submit = () => {

    const token = localStorage.getItem('token') || '';

    const shift: IPersonelAssignToShiftRequest = {
      token: token,
      shiftId: shiftId,
      userId: personelId,
      startDate: startDate,
      endDate: endDate
    }

    dispatch(fetchAssignShiftToUser(shift)).then(data => {
      if (data.payload.code === 200) {
        toast.success("Vardiya Oluşturma İşleminiz Başarılı!", {
          position: "top-right"
        });
        dispatch(fetchGetPersonelShiftList());
       
      }
      else {
        toast.warning(data.payload.message, {
          position: "top-right"
        });
      }
    })

  }

  return (
    <>
      <button className='btn btn-outline-success' data-bs-toggle="modal" data-bs-target="#newShiftAssignToPersonelModal">Yeni Vardiya Ataması Yap</button>
      <ToastContainer />

      <div className="modal fade bd-example-modal-xl" id="newShiftAssignToPersonelModal" aria-labelledby="exampleModalLabel" >
        <div className="modal-dialog modal-xl modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Yeni Vardiya Ataması</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>

            </div>
            <hr style={{ border: '1px black solid' }} />
            <div className="modal-body">

              <div className="col mb-4 mt-5 text-start">
                <label className='ms-4'>Vardiya Adı: </label>
                <select className='form-select mb-2 p-3 mt-2' onChange={handleShiftChange} style={{ borderRadius: '30px' }}>
                  <option value="">Vardiya Seçin</option>
                  {shiftList.map(shift => (
                    <option key={shift.id} value={shift.id} >
                      {shift.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col mb-4 text-start">

                <label className='ms-4'>Personel Adı ve Soyadı: </label>
                <select className='form-select mb-2 p-3 mt-2' onChange={handlePersonelChange} style={{ borderRadius: '30px' }}>
                  <option value="">Personel Seçiniz</option>
                  {personelList.map(personel => (
                    <option key={personel.id} value={personel.id}>
                      {personel.firstName} {personel.lastName}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col mb-4 text-start">
                <label className='ms-4'>Başlangıç Zamanı: </label>
                <input type="date" className='form-control' onChange={evt => { setStartDate(evt.target.value) }} value={startDate} />
              </div>
              <div className="col mb-4 text-start">
                <label className='ms-4'>Bitiş Zamanı: </label>
                <input type="date" className='form-control' onChange={evt => { setEndDate(evt.target.value) }} value={endDate} />
              </div>
            </div>
            <hr />
            <div className="modal-footer">
              <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={submit} >Kaydet</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default NewPersonelAssignShiftModal