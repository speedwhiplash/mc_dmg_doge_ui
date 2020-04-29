import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'mc-dmg-dogui';
  content: { message: string } = {message: ''}

  constructor(private httpClient: HttpClient) {
    httpClient.get('/api').subscribe((content: any) => this.content = content)
  }
}
