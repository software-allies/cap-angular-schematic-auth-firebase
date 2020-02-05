import { Injectable, Inject, PLATFORM_ID} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(@Inject(PLATFORM_ID) private platformId) {}

  authenticated(): boolean {
    if (isPlatformBrowser(this.platformId) && localStorage.getItem('User')) {
      return true;
    }
    return false;
  }

}
