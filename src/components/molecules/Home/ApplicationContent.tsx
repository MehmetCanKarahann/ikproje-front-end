import React from 'react'
import './ApplicationContent.css'
import { Fade, Slide } from 'react-awesome-reveal';

function ApplicationContent() {

    const applicationData = [
        {
            title: 'Personel Yönetimi',
            description: 'Çalışanların tüm bilgilerini tek uygulamada yönetin',
            icon: '👤',
        },
        {
            title: 'Bordro Yönetimi',
            description: 'Tüm bordro işlemlerinizi tek ekrandan kolayca yönetin',
            icon: '💵',
        },
        {
            title: 'Performans Yönetimi',
            description: 'Çalışanları online performans değerlendirmeye dahil edin',
            icon: '📊',
        },
        {
            title: 'İşe Alım ve Aday Takip',
            description: 'İşe alım süreçlerinizi tek bir platformdan yönetin',
            icon: '🔍',
        },
        {
            title: 'Vardiya Yönetimi',
            description: 'Çalışma zamanınızı en verimli şekilde planlayın ve yönetin',
            icon: '⏰',
        },
        {
            title: 'Ücret Yönetimi',
            description: 'Maaşları güncelleyin, yönetin ve raporlayın',
            icon: '📋',
        },
        {
            title: 'İK Analitiği',
            description: 'Anlık İK verilerinizi tek platformda takip edin, veri odaklı kararlar alın',
            icon: '📈',
        },
    ];

    return (
        <div className='row'>
            <div className="applications-container">
                <Slide direction="up" duration={1000}>
                    <h2 className="applications-title">UYGULAMALAR</h2>
                </Slide>


                <Fade direction="up" duration={3000} triggerOnce>
                <div className="applications-grid mt-4">
                    {applicationData.map((app, index) => (
                        <div key={index} className="application-card">
                            <div className="application-icon">{app.icon}</div>
                            <h3 className="application-title">{app.title}</h3>
                            <p className="application-description">{app.description}</p>

                        </div>
                    ))}
                </div>
                </Fade>
                
            </div>
        </div>
    )
}

export default ApplicationContent