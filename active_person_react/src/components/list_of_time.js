import React, { Component } from 'react'
import { Calendar, momentLocalizer, Views } from 'react-big-calendar'
import moment from "moment-timezone";
import "react-big-calendar/lib/css/react-big-calendar.css";



export class ListOfTime extends Component {

    render() {
        let eventDummy = []
        const localizer = momentLocalizer(moment.tz.setDefault(this.props.timeZone))
        for (let i = 0; i < this.props.events.length; i++) {
            let eventObject = {}
            eventObject.id = i
            eventObject.title = 'Active'
            eventObject.start = new Date(moment(this.props.events[i].start_time, "MMM D YYYY h:mmA"))
            eventObject.end = new Date(moment(this.props.events[i].end_time, "MMM D YYYY h:mmA"))
            eventDummy.push(eventObject)
        }
        return (
            <>
                <div className="examples"> <div className="example">
                    <Calendar
                        events={eventDummy}
                        step={15}
                        timeslots={6}
                        localizer={localizer}
                        views={['month', 'day', 'agenda']}
                        defaultView={Views.AGENDA}
                        popupOffset={30}
                        defaultDate={new Date(moment(this.props.events[1].end_time, "MMM D YYYY h:mmA"))}
                    /></div></div>
            </>
        )
    }
}

export default ListOfTime
