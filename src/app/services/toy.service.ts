import { Injectable } from '@angular/core';
import { Toy, toys } from '../../db/toys.db';

@Injectable({
  providedIn: 'root'
})
export class ToyService {
  getToys(): Toy[] {
    return toys;
  }

  getToyByPermalink(permalink: string): Toy | undefined {
    return toys.find(t => t.permalink === permalink);
  }
}
