import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Toy, toys } from '../../db/toys.db';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToyService {
  private http = inject(HttpClient);

  getToys(): Observable<Toy[]> {
    return of(toys);
  }

  getToyByPermalink(permalink: string): Observable<Toy | undefined> {
    return of(toys.find(t => t.permalink === permalink));
  }
}
