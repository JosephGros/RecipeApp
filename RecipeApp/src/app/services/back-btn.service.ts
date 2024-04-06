import { Location } from '@angular/common';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BackBtnService {

  constructor(private location: Location) {}

  backFn() {
    this.location.back();
  }

  reload(){
    this.location.forward();
  }
}
