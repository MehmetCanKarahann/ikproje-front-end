import React, { useState } from "react";

const MultiStepForm: React.FC = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    profilePicture: "",
  });

  const handleNext = () => setStep((prev) => prev + 1);
  const handlePrevious = () => setStep((prev) => prev - 1);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    console.log("Submitted Data:", formData);
    // Backend'e gönderim yapılabilir
  };

  return (
    <div>
      {step === 1 && (
        <div>
          <h2>Adım 1: Temel Bilgiler</h2>
          <input name="firstName" placeholder="Ad" onChange={handleChange} />
          <input name="lastName" placeholder="Soyad" onChange={handleChange} />
          <button onClick={handleNext}>İleri</button>
        </div>
      )}
      {step === 2 && (
        <div>
          <h2>Adım 2: İletişim Bilgileri</h2>
          <input name="email" placeholder="E-posta" onChange={handleChange} />
          <input name="phone" placeholder="Telefon" onChange={handleChange} />
          <button onClick={handlePrevious}>Geri</button>
          <button onClick={handleNext}>İleri</button>
        </div>
      )}
      {step === 3 && (
        <div>
          <h2>Adım 3: Profil Fotoğrafı</h2>
          <input
            name="profilePicture"
            placeholder="Fotoğraf URL"
            onChange={handleChange}
          />
          <button onClick={handlePrevious}>Geri</button>
          <button onClick={handleSubmit}>Kaydet</button>
        </div>
      )}
    </div>
  );
};

export default MultiStepForm;
