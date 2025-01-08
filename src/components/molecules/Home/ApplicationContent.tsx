import React from 'react'
import './ApplicationContent.css'
import { Fade, Slide } from 'react-awesome-reveal';

function ApplicationContent() {

    const applicationData = [
        {
            title: 'Personel Yönetimi',
            description: 'Çalışanlarınızın tüm bilgilerini kolayca görüntüleyin, düzenleyin ve yönetin. Personel takibini merkezi bir platformda yapın.',
            icon: '👤',
        },
        {
            title: 'Personel Durum Yönetimi',
            description: 'Çalışanlarınızın işten ayrılma durumlarını kolayca güncelleyin. Tek tıkla çalışanlarınızı pasif duruma getirerek, personel takibini düzenli ve verimli yapın.',
            icon: '🔒',
        },
        {
            title: 'İzin',
            description: 'Personel izin taleplerini pratik bir şekilde takip edin ve yönetin. Onay süreçlerini hızlandırarak verimliliği artırın.',
            icon: '🗓️',
        },
        {
            title: 'Harcama',
            description: 'Çalışanlarınız harcamalarını faturalarla birlikte sisteme eklesin. Onay veya red işlemlerini zahmetsizce gerçekleştirin.',
            icon: '💳',
        },
        {
            title: 'Zimmet',
            description: 'Personelinize ekipman ve demirbaş zimmeti atayın, takibini kolayca yaparak kaynaklarınızı verimli yönetin.',
            icon: '📦',
        },
        {
            title: 'Vardiya',
            description: 'Çalışma saatlerini düzenleyin ve vardiya planlarını optimize edin. İş gücü yönetimini daha verimli hale getirin.',
            icon: '🕒',
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