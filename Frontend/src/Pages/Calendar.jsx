import React from "react";
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';

const Calendar=({events,handleClick,colorMode})=>{
    return(
        <FullCalendar
                        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                        initialView="dayGridMonth"
                        events={events}
                        dateClick={handleClick}
                        editable={true}
                        headerToolbar={{
                            left: 'prev,next today',
                            center: 'title',
                            right: 'dayGridMonth,timeGridWeek,timeGridDay'
                        }}
                        buttonText={{
                            today: 'Today',
                            month: 'Month',
                            week: 'Week',
                            day: 'Day'
                        }}
                        eventColor={colorMode === 'light' ? '#3182CE' : '#90CDF4'}
                        height="auto"
                    />
    )
};
export default Calendar;