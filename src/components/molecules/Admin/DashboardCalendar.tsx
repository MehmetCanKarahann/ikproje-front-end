import React, { useEffect, useState } from 'react'
import './DahboardCalendar.css'

interface Holiday {
  date: string;
  localName: string;
}

function DashboardCalendar() {

  const [currentDate, setCurrentDate] = useState(new Date());
  const [holidays, setHolidays] = useState<Holiday[]>([]);
  const today = new Date();

  //resmi tatiller için istek atılıyor.
  useEffect(() => {
    const fetchHolidays = async () => {
      const year = currentDate.getFullYear();
      try {
        const response = await fetch(`https://date.nager.at/api/v3/PublicHolidays/${year}/TR`);
        const data: Holiday[] = await response.json();
        setHolidays(data);
      } catch (error) {
        console.error('Failed to fetch holidays:', error);
      }
    };
    fetchHolidays();
  }, [currentDate]);

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayIndex = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

 
  const getHolidayName = (day: number): string | null => {
    const dateString = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const holiday = holidays.find((h) => h.date === dateString);
    return holiday ? holiday.localName : null;
  };
  
  return (
    <div className="calendar-container">
    <div className="calendar-header">
      <button className="nav-button" onClick={handlePrevMonth}>❮</button>
      <span className="calendar-title">
        {currentDate.toLocaleString('default', { month: 'long' })} {currentDate.getFullYear()}
      </span>
      <button className="nav-button" onClick={handleNextMonth}>❯</button>
    </div>
    <div className="calendar-grid">
      {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day) => (
        <div key={day} className="calendar-day-name">
          {day}
        </div>
      ))}
      {Array.from({ length: 42 }).map((_, index) => {
        const day = index - firstDayIndex + 1;
        const isToday =
          day === today.getDate() &&
          currentDate.getMonth() === today.getMonth() &&
          currentDate.getFullYear() === today.getFullYear();
        const holidayName = getHolidayName(day);

        return (
          <div
            key={index}
            className={`calendar-day  ${isToday ? 'today' : ''} ${day < 1 || day > daysInMonth ? 'inactive' : ''}`}
            
          >
            {day > 0 && day <= daysInMonth ? (
              <>
                <span className="day-number">{day}</span>
                {holidayName && <div className="holiday-name">{holidayName}</div>}
              </>
            ) : ''}
          </div>
        );
      })}
    </div>
  </div>
  )
}

export default DashboardCalendar