import React, { useEffect, useState } from 'react'
import NewBreakModal from '../molecules/CompanyAdmin/NewBreakModal'
import { useDispatch } from 'react-redux'
import { IKDispatch, IKUseSelector } from '../../store'
import { IUpdateBreakRequest } from '../../models/IUpdateBreakRequest';
import { fetchDeleteBreak, fetchGetAllBreak, fetchUpdateBreak } from '../../store/feature/breakSlice';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './BreakList.css';
import swal from 'sweetalert';

function BreakList() {

    const dispatch = useDispatch<IKDispatch>();

    const shiftList = IKUseSelector(state => state.shiftSlice.shiftList);
    const breakList = IKUseSelector(state => state.breakSlice.breakList);

    const [breakId, setBreakId] = useState(0);
    const [shiftId, setShiftId] = useState(0);
    const [name, setName] = useState(''); //mola adı
    const [shiftName, setShiftName] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');

    const handleShiftChange = (evt: any) => {
        const selectedShiftName = evt.target.value;
        setShiftName(selectedShiftName); //selectden seçilen vardiya adını burdan useState e gönderdim.

        const selectedShift = shiftList.find(shift => shift.name === selectedShiftName) //seçili olan vardiya sunucudan gelen vardiya adına eşitse
        setShiftId(selectedShift ? selectedShift.id : 0); //iki değer eşleniyorsa bunun id değerini al yoksa sıfır al.

    }

    const submit = () => {

        const token = localStorage.getItem('token') || '';

        //select den seçilen vardşyanın listeyle eşleşip eşleşmediğini control ediyor.
        const selectedShift = shiftList.find(shift => shift.name === shiftName); 

        //shiftId 0 ise select üzerinden seçilmiş olan vardiyanın ıdsini gönder.
        //yok eğer shiftId 0 değilse sunucudan gelen ıd değerini olduğu gibi sunucuya geri gönderir.
        const finalShiftId = shiftId !== 0 ? shiftId : selectedShift ? selectedShift.id : 0;

        const updateModel: IUpdateBreakRequest = {
            token: token,
            shiftId: finalShiftId,
            breakId: breakId,
            name: name,
            startTime: startTime,
            endTime: endTime
        }

        dispatch(fetchUpdateBreak(updateModel)).then(data => {
            if (data.payload.code === 200) {
                toast.success("Mola güncelleme İşleminiz Başarılı!", {
                    position: "top-right"
                });
                dispatch(fetchGetAllBreak());
            }
            else {
                toast.warning(data.payload.message, {
                    position: "top-right"
                });
            }
        })


    }

    const deleteBreak = (Id: number) => {

        swal({
            title: "Molayı Silmek istiyor Musunuz?",
            icon: "warning",
            buttons: {
                cancel: {
                    text: 'Hayır',
                    value: false,
                    visible: true,
                    className: 'swal-button-cancel'
                },
                confirm: {
                    text: 'Evet',
                    value: true,
                    visible: true,
                    className: 'swal-button-confirm'
                },
            }
        })
        .then((willDelete) => {
                if (willDelete) {
                    dispatch(fetchDeleteBreak({ breakId: Id })).then(data => {
                        if (data.payload.code === 200) {
                            toast.success("Mola Başarılı Şekilde Silindi. !", {
                                position: "top-right"
                            });
                            dispatch(fetchGetAllBreak());
                        }
                        else {
                            toast.warning(data.payload.message, {
                                position: "top-right"
                            });
                        }
                    })
                }
            });
        
    }

    return (
        <div className='col'>
            <div className="card">
                <div className="card-header">
                    <div className="row">
                        <div className="col-6">
                            <h5 className='mt-2'>Mola Listesi</h5>

                        </div>
                        <div className="col-6 text-end">
                            <NewBreakModal />
                        </div>
                    </div>
                </div>
                <div className="card-body table-responsive p-0 mb-5">
                    <table className="table text-nowrap text-center">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Vardiya Adı</th>
                                <th>Mola Adı</th>
                                <th>Başlangıç Zamanı</th>
                                <th>Bitiş Zamanı</th>
                                <th>İşlemler</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                breakList.map((breaks, index) => {
                                    return (
                                        <tr key={index}>
                                            <td> {breaks.id} </td>
                                            <td> {breaks.shiftName} </td>
                                            <td> {breaks.name} </td>
                                            <td> {breaks.startTime} </td>
                                            <td> {breaks.endTime} </td>
                                            <td>
                                                <button className='btn btn-warning me-2' data-bs-toggle="modal" data-bs-target="#updateBreakModal" onClick={() => {
                                                    setShiftName(breakList[index].shiftName);
                                                    setName(breakList[index].name);
                                                    setStartTime(breakList[index].startTime);
                                                    setEndTime(breakList[index].endTime);
                                                    setBreakId(breakList[index].id);
                                                }}>
                                                    <i className="fa-solid fa-pen"></i>
                                                </button>
                                                <button className='btn btn-danger' onClick={() => { deleteBreak(breakList[index].id) }}>
                                                    <i className="fa-solid fa-trash"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="modal fade bd-example-modal-xl" id="updateBreakModal">
                <div className="modal-dialog modal-xl modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Mola Güncelle</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>

                        </div>
                        <hr style={{ border: '1px black solid' }} />
                        <div className="modal-body">

                            <div className="col mb-4 mt-5 text-start">
                                <label className='ms-4'>Vardiya Adı: </label>
                                <select className='form-select mb-2 p-3 mt-2' onChange={handleShiftChange} value={shiftName} style={{ borderRadius: '30px' }}>
                                    <option value="">Vardiya Seçin</option>
                                    {shiftList.map(shift => (
                                        <option key={shift.id} value={shift.name} >
                                            {shift.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="col mb-4  text-start">
                                <label className='ms-4'>Mola Adı: </label>
                                <input type="text" className='form-control' onChange={evt => { setName(evt.target.value) }} value={name} />
                            </div>
                            <div className="col mb-4  text-start">
                                <label className='ms-4'>Başlangıç Zamanı: </label>
                                <input type="text" className='form-control' onChange={evt => { setStartTime(evt.target.value) }} value={startTime} />
                            </div>
                            <div className="col mb-4  text-start">
                                <label className='ms-4'>Bitiş Zamanı: </label>
                                <input type="text" className='form-control' onChange={evt => { setEndTime(evt.target.value) }} value={endTime} />
                            </div>
                        </div>
                        <hr />
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={submit} >Kaydet</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>

    )
}

export default BreakList