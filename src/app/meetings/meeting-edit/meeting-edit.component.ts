import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Meeting } from '../meeting.modal';
import { MeetingsService } from '../meetings.service';
import { MeetingAttendee } from '../meeting-attendee.modal';
import { User } from 'src/app/shared/user.modal';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-meeting-edit',
  templateUrl: './meeting-edit.component.html',
  styleUrls: ['./meeting-edit.component.css']
})
export class MeetingEditComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  meetingattendee: MeetingAttendee;
  id: number;

  constructor(private meetingsService: MeetingsService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          if (this.id) {
            this.subscription = this.meetingsService.getMeeting(this.id).subscribe((data) => {
              this.meetingattendee = data;
            });
          }
          else {
            this.id = 0;
            this.newObject();
          }
        }
      );
  }

  newObject() {
    let meeting = new Meeting(0, "","", "", new Date());
    let user = new User(0, "", "", "", "");
    this.meetingattendee = new MeetingAttendee(meeting, [], user);
  }

  onClear() {
    this.newObject();
  }

  onAddUpdate() {
    if (this.id === 0) {
      this.subscription = this.meetingsService.createMeeting(this.meetingattendee).subscribe((data) => {
        this.meetingattendee = data;
        this.navigateBack();
      }, (error) =>
      {
        this.navigateBack();
      });
    }
    else {
      this.subscription = this.meetingsService.updateMeeting(this.meetingattendee).subscribe((data) => {
        this.meetingattendee = data;
        this.navigateBack();
      }, (error) => {
        this.navigateBack();
      });
    }
  }

  navigateBack() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
