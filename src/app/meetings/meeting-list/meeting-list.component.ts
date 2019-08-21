import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MeetingsService } from '../meetings.service';
import { MeetingAttendee } from '../meeting-attendee.modal';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-meeting-list',
  templateUrl: './meeting-list.component.html',
  styleUrls: ['./meeting-list.component.css']
})
export class MeetingListComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  meetingAttendees: MeetingAttendee[] = this.meetingsService.meetingAttendees;
  constructor(private meetingsService: MeetingsService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.subscription = this.meetingsService.getAllMeetings().subscribe(() => {
        this.meetingAttendees = this.meetingsService.meetingAttendees;
    });
  }

  onNewMeeting() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  onEditMeeting(id: Number) {
    this.router.navigate([id, 'edit'], { relativeTo: this.route });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
