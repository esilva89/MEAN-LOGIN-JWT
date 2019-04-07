// External Modules.
import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler,
    HttpEvent
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

// My Modules.
import { Keys } from '../config/keys';
import { UserService } from '../services/user.service';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {

    constructor(private userService: UserService) { }

    /**
     * Capture a request and add a header according to the url.
     * 
     * @method intercept.
     * @param {HttpRequest<any>} request: Angular module.
     * @param {HttpHandler} next: Angular module.
     * @return {Observable<HttpEvent<any>>}: Angular module.
     */
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        //? check the url of the request.
        switch(request.url) {
            case Keys.serverUrl + Keys.profile:
            case Keys.serverUrl + Keys.editProfile:
            case Keys.serverUrl + Keys.editPassword:
            case Keys.serverUrl + Keys.removeUser:
                //* add the authorization header.
                let token = this.userService.getToken();
                request = request.clone({
                    setHeaders: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'authorization': `Bearer ${token}`
                    }
                });
            break;
        }
        return next.handle(request);
    }

}