import { Component, ViewChild } from '@angular/core';
import { Build, BuildIndex } from './interfaces';
import { BuildDetailsComponent } from './build-details/build-details.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild('buildDetails') buildDetails: BuildDetailsComponent;
  title = 'mc-dmg-doge-ui';

  setBuild(build: BuildIndex) {
    this.buildDetails.setBuildIndex(build);
  }
}
