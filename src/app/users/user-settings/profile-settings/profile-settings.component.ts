import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.scss'],
})
export class ProfileSettingsComponent implements OnInit {
  public imageString: any;
  public image: any;

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit(): void {}
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
}

///https://www.behance.net/gallery/160949619/Profile-Settings-Page-for-a-Fintech-Web-App?tracking_source=search_projects|settings+page
