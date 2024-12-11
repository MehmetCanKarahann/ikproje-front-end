import React from 'react'

interface IStepTwoProps {
    tcNo: string,
    sgkNo: string,
    salary: string,
    departmentType: string,
    setTcNo: (value: string) => void;
    setSgkNo: (value: string) => void;
    setSalary: (value: string) => void;
    setDepartmentType: (value: string) => void;
    handlePrevious: () => void;
    handleNext: () => void;
}

function Step2(props: IStepTwoProps) {
    const {tcNo,sgkNo,salary,departmentType,setTcNo, setSgkNo, setSalary, setDepartmentType, handlePrevious, handleNext} = props;
    
    return (
        <>
            <div className="logo-box"><a href="#" className="logo-text">Kişisel Bilgileriniz</a></div>
            <div className="mb-3">
                <input type="text" className="form-control" value={tcNo} onChange={evt => { setTcNo(evt.target.value) }} placeholder="TC Kimlik Numaranız" style={{ fontSize: '18px' }} />
            </div>
            <div className="mb-3">
                <input type="text" className="form-control" value={sgkNo} onChange={evt => { setSgkNo(evt.target.value) }} placeholder="Sgk Numaranız" style={{ fontSize: '18px' }} />
            </div>
            <div className="mb-3">
                <input type="text" className="form-control" value={salary} onChange={evt => { setSalary(evt.target.value) }} placeholder="Aylık Geliriniz" style={{ fontSize: '18px' }} />
            </div>
            <select className="form-select mb-3 p-3" value={departmentType} onChange={(evt) => setDepartmentType(evt.target.value)} style={{ height: '60px', borderRadius: '30px', fontSize: '17px', color: 'gray', fontWeight: 'bold' }} aria-label="Default select example">
                <option selected>Çalıştığınız Departmanı Seçiniz</option>
                <option value="HR">HR</option>
                <option value="FINANCE">FINANCE</option>
                <option value="IT">IT</option>
                <option value="SALES">SALES</option>
                <option value="MARKETING">MARKETING</option>
                <option value="ENGINEERING">ENGINEERING</option>
                <option value="RESEARCH">RESEARCH</option>
                <option value="CUSTOMER_SERVICE">CUSTOMER_SERVICE</option>
                <option value="LEGAL">LEGAL</option>
                <option value="OPERATIONS">OPERATIONS</option>
                <option value="PROCUREMENT">PROCUREMENT</option>
                <option value="LOGISTICS">LOGISTICS</option>
                <option value="DESIGN">DESIGN</option>
                <option value="ADMINISTRATION">ADMINISTRATION</option>
                <option value="SECURITY">SECURITY</option>
            </select>
            <div className="row">
                <div className="col-6 text-center">
                    <button className="btn btn-secondary btn-block btn-submit" style={{ fontSize: '17px' }} onClick={handlePrevious}>Geri</button>

                </div>
                <div className="col-6">
                    <button type="submit" className="btn btn-primary btn-block btn-submit " style={{ width: '300px', fontSize: '17px' }} onClick={handleNext}>İleri</button>

                </div>
            </div>
        </>
    )
}

export default Step2