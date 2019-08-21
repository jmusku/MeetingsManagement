import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Meeting } from './meeting.modal';
import { environment } from 'src/environments/environment';
import { MeetingAttendee } from './meeting-attendee.modal';
import { Attendee } from './attendee.modal';
import { Observable } from 'rxjs';

export class MeetingsService {

    meetingsUrl = environment.baseUrl + 'meeting';

    constructor(private http: HttpClient) { }

    meetingAttendees: MeetingAttendee[] = [];

    getAllMeetings() {
        return this.http.get(this.meetingsUrl + '/GetMeetings')
            .pipe(
                map((res: any) => {
                    if (res.Success) {
                        res.AllMeetings.forEach(meet => {
                            meet.Meeting.AttendeeInfo = this.groupAttendees(meet.Attendees);
                        });
                        this.meetingAttendees = res.AllMeetings;
                    }
                })
            );
        //return this.meetings.slice();
    }

    groupAttendees(attendees: Attendee[]) {
        let allAttendees = "";
        attendees.forEach(attend => {
            if (attend) {
                allAttendees = allAttendees + (attend.FirstName ? attend.FirstName : '') + ' ' + (attend.LastName ? attend.LastName : '') + "; ";
            }
        });
        return allAttendees;
    }

    getMeeting(id: Number) {
        return this.http.get(this.meetingsUrl + '/GetMeetingByMeetingId/' + id)
            .pipe(
                map((res: any) => {
                    if (res.Success) {
                        res.Meeting.AttendeeInfo = this.groupAttendees(res.Attendees);
                        return res;
                    }
                })
            );
    }

    createMeeting(meetingattendee: MeetingAttendee): Observable<MeetingAttendee> {
        // return this.http.post(this.meetingsUrl + '/CreateMeeting', meeting)
        //     .pipe(
        //         map((res: any) => {
        //             debugger;
        //             if (res.Success) {
        //                 res.Meeting.AttendeeInfo = this.groupAttendees(res.Attendees);
        //                 return res;
        //             }
        //         })
        //     );
        // let headers = new Headers({ 'Content-Type': 'application/json' });
        // let options = new RequestOptions({ headers: headers });
        return this.http.post(this.meetingsUrl + '/CreateMeeting', meetingattendee.Meeting)
        .pipe(
            map((res: any) => {
                debugger;
                return res;
            })
        );
    }

    updateMeeting(meetingattendeee: MeetingAttendee) {
        return this.http.post(this.meetingsUrl + '/UpdateMeeting', meetingattendeee.Meeting)
            .pipe(
                map((res: any) => {
                    debugger;
                    if (res.Success) {
                        res.Meeting.AttendeeInfo = this.groupAttendees(res.Attendees);
                        return res;
                    }
                })
            );
    }
}