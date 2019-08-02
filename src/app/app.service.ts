import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, catchError, retry} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  private urlServer = 'https://encurtadorx.herokuapp.com/api/';

  constructor(private http: HttpClient) {
  }

  requestShortUrl(longUrl: {}): any {
    return this.http
      .post(this.urlServer + 'encurtador', longUrl, {
        responseType: 'json'
      })
      .pipe(
        map(response => response
        ),
        retry(3),
        catchError(error => error)
      );

  }
}
