import { Meeting } from './meeting.modal';
import { Attendee } from './attendee.modal';
import { User } from '../shared/user.modal';

export class MeetingAttendee {
    constructor(public Meeting: Meeting, public Attendees: Attendee[], public MeetingCreatedBy: User){}
}