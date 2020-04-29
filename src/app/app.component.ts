import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'mc-dmg-dogui';
  content = ''

  constructor(private httpClient: HttpClient) {
    httpClient.get('/api', <any>{responseType: 'text'})
      .subscribe((content: any) => this.content = new DOMParser().parseFromString(content, 'text/html')?.body?.innerHTML)
  }
}
