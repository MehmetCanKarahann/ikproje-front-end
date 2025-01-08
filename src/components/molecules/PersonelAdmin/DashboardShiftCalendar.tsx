import React, { useState } from 'react'
import { IKUseSelector } from '../../../store';
import './DashboardShiftCalendar.css';

interface Break {
    breakName: string;
    breakStartTime: string;
    breakEndTime: string;
}

interface Shift {
    shiftName: string;
    shiftStartTime: string;
    shiftEndTime: string;
    startDate: string,
    endDate: string,
    breaks: Break[];
}


function DashboardShiftCalendar() {

    const shiftList: Shift[] = IKUseSelector(state => state.userShiftSlice.personelShiftAndBreakList);


    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedShifts, setSelectedShifts] = useState<Shift[] | null>(null);
    const today = new Date();

    const handlePrevMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    };

    const handleNextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    };

    const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
    const firstDayIndex = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

    const handleDayClick = (day: number) => {
        const dateString = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        const shiftsForDay = shiftList.filter(shift =>
            shift.startDate <= dateString && shift.endDate >= dateString
        );
        setSelectedShifts(shiftsForDay);
    };

    const renderShiftDetails = (day: number) => {
        const dateString = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        const filteredShifts = shiftList.filter(shift =>
            shift.startDate <= dateString && shift.endDate >= dateString
        );

        return filteredShifts.length > 0 ? (
            <div className="shift-dot"></div>
        ) : null;
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

                return (
                    <div
                        key={index}
                        className={`calendar-day ${isToday ? 'today' : ''} ${day < 1 || day > daysInMonth ? 'inactive' : ''}`}
                        onClick={() => day > 0 && day <= daysInMonth && handleDayClick(day)}
                    >
                        {day > 0 && day <= daysInMonth ? (
                            <>
                                <span className="day-number">{day}</span>
                                {renderShiftDetails(day)}
                            </>
                        ) : ''}
                    </div>
                );
            })}
        </div>
        
        {selectedShifts && (
            <div className="shift-modal">
                <div className="modal-content">
                    <button onClick={() => setSelectedShifts(null)} className="close-button">✖</button>
                    {selectedShifts.length > 0 ? (
                        selectedShifts.map((shift, index) => (
                            <div key={index} className="shift-info">
                                <h3>{shift.shiftName} Vardiyası</h3>
                                <p>{shift.shiftStartTime.substring(0, 5)} - {shift.shiftEndTime.substring(0, 5)}</p>
                                {shift.breaks.map((brk, idx) => (
                                    <div key={idx}>
                                        {brk.breakName}: {brk.breakStartTime.substring(0, 5)} - {brk.breakEndTime.substring(0, 5)}
                                    </div>
                                ))}
                            </div>
                        ))
                    ) : (
                        <p>No shifts for this day</p>
                    )}
                </div>
            </div>
        )}
    </div>
    )
}

export default DashboardShiftCalendar