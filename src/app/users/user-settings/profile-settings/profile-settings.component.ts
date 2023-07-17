import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { UserState } from 'src/app/expenses/data-state/states/user.state';

@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.scss'],
})
export class ProfileSettingsComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  public imageString: any;
  public image: any;

  public formGroup = new FormGroup({
    firstName: new FormControl(null, [Validators.required]),
    lastName: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required]),
    displayName: new FormControl(null, [Validators.required]),
    photo: new FormControl(null),
  });

  public subscriptions: Subscription[] = [];

  constructor(
    private sanitizer: DomSanitizer,
    private userStore: Store<UserState>
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.subscriptions.push(
      this.formGroup.valueChanges.subscribe((data) => {
        console.log(data);
      })
    );
  }

  ngOnDestroy(): void {}

  public uplodaPhoto(fileInputEvent: any) {
    var reader = new FileReader();
    this.image = fileInputEvent.target.files[0];
    reader.onload = this.handleReaderLoaded.bind(this);
    reader.readAsBinaryString(this.image);
  }

  private handleReaderLoaded(readerEvt: any) {
    var binaryString = readerEvt.target.result;
    this.imageString = this.sanitizer.bypassSecurityTrustUrl(
      `data:image/png;base64, ${btoa(binaryString)}`
    );
  }

  private clearForm() {
    this.formGroup.reset();
  }
}

///https://www.behance.net/gallery/160949619/Profile-Settings-Page-for-a-Fintech-Web-App?tracking_source=search_projects|settings+page
