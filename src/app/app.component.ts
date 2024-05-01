import { Component } from '@angular/core';
import { AppService } from './app.service';
import { FormControl } from '@angular/forms';
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
    botaoLimpar = false;

    constructor(private service: AppService) {
    }

    onSubmit(): void {
        if (!this.longUrl.value) {
            new AWN().warning('Informe um URL', { durations: { success: 1300 } });
            return;
        }

        this.loading = true;
        const body = { longUrl: this.longUrl.value };

        this.service.requestShortUrl(body).subscribe({
            next: data => {
                this.longUrl.patchValue(data.shortUrl);
                this.botoesManipucao = true;
                this.loading = false;
            },
            error: error => {
                this.botaoLimpar = true;
                new AWN().alert(error.error || 'Algo não ocorreu como deveria :/', {durations: {success: 1300}});
                this.loading = false;
            }
        });
    }

    toCopy(): void {
        const copyText = document.getElementById('shortUrl') as HTMLInputElement;
        copyText.select();
        document.execCommand('copy');
        new AWN().success('Link copiado!', { durations: { success: 1700 } });
    }

    reset(): void {
        this.longUrl.patchValue('');
        this.botoesManipucao = false;
        this.botaoLimpar = false;
    }
}
