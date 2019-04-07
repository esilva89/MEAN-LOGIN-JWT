// External Modules.
import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
    HttpResponse,
    HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

// My Modules.
import { CustomServerResponse } from '../models/custom-server-response';

export class ResponseInterceptor implements HttpInterceptor {

    /**
     * Capture a response and determine whether an error occurred or not.
     * * successful cast to custom server response.
     * ! error client-side.
     * ! error server-side.
     * 
     * @method intercept.
     * @param {HttpRequest<any>} request: Angular module.
     * @param {HttpHandler} next: Angular module.
     * @return {Observable<HttpEvent<any>>}: Angular module.
     */
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request)
            .pipe(
                map((event: HttpEvent<any>) => {
                    //* successful response.
                    if(event instanceof HttpResponse) {
                        let customServerResponse: CustomServerResponse;
                        customServerResponse = new CustomServerResponse(
                            event.status,
                            event.body.msg,
                            event.body.data
                        );
                        event = event.clone({ body: customServerResponse });
                    }
                    return event;
                }),
                catchError((error: HttpErrorResponse) => {
                    //! error response.
                    if(error.error instanceof ErrorEvent) {
                        //! client-side error.
                        let errorMessage: string = '';
                        errorMessage = `Error: ${error.message}`;
                        return throwError(errorMessage);
                    } else {
                        //! server-side error.
                        let customServerResponse: CustomServerResponse;
                        customServerResponse = new CustomServerResponse(
                            error.status,
                            error.error.msg,
                            error.error.data,
                            error.error.method,
                            error.error.line
                        );
                        return throwError(customServerResponse);
                    }
                })
            )
    }

}