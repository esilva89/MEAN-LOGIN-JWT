// External Modules.
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FlashMessagesService } from 'angular2-flash-messages';

// My Service.
import { UserService } from '../services/user.service';
import { HelpersService } from '../helpers/helpers.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  /**
   * Initialize the auth guard.
   * 
   * @constructor
   * @param {UserService} userService: user service for handling sessions and communication with the server.
   * @param {HelpersService} helpersService: helpers service for handling common issues of the components.
   * @param {Router} router: Angular module.
   * @param {FlashMessagesService} flashMessages: service for showing flash messages.
   */
  constructor(private userService: UserService,
              private helpersService: HelpersService,
              private router: Router,
              private flashMessages: FlashMessagesService) {
  }
  
  /**
   * Check if a current user can access to a certain route.
   * 
   * @method canActivate.
   * @return {boolean} true if the current user can access; false otherwise.
   */
  canActivate(): boolean {
    if (this.userService.getUser()) {
      //* current user can access.
      return true;
    } else {
      //! error the current user can't access.
      this.flashMessages.show('You do have not permission to access the content', this.helpersService.setFailedMessage('5000'));
      this.router.navigate(['/user/login']);
      return false;
    }
  }

}
