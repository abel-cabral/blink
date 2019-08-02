import {Component} from '@angular/core';
import {AppService} from './app.service';
import {FormControl} from '@angular/forms';
import AWN from 'awesome-notifications';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  longUrl = new FormControl();
  botoesManipucao = false;
  loading = false;

  constructor(private service: AppService) {
  }

  onSubmit(): void {
    this.loading = true;
    const body = {
      longUrl: this.longUrl.value
    };

    this.service.requestShortUrl(body).subscribe(res => {
      this.longUrl.patchValue(res.shortUrl);
      this.botoesManipucao = true;
    }, error => alert('Algo não ocorreu como deveria :/'));
    this.loading = false;
  }

  toCopy(): void {
    const copyText = document.getElementById('shortUrl') as HTMLInputElement;
    copyText.select();
    document.execCommand('copy');
    new AWN().success('Link copiado!', {durations: {success: 2200}});
  }

  reset(): void {
    this.longUrl.patchValue('');
    this.botoesManipucao = false;
  }
}
