import { Component, OnInit, OnDestroy } from '@angular/core';
import { Meeting } from '../meeting.modal';
import { MeetingsService } from '../meetings.service';
import { ActivatedRoute, Params } from '@angular/router';
import { MeetingAttendee } from '../meeting-attendee.modal';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-meeting-detail',
  templateUrl: './meeting-detail.component.html',
  styleUrls: ['./meeting-detail.component.css']
})
export class MeetingDetailComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  meetingattendee: MeetingAttendee;
  id: Number;
  constructor(private meetingsService: MeetingsService,
    private route: ActivatedRoute) { }

  ngOnInit() {

    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.subscription = this.meetingsService.getMeeting(this.id).subscribe((data) => {
            this.meetingattendee = data;
          });
        }
      );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
