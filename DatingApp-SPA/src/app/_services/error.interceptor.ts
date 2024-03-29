import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    intercept(
        req: import('@angular/common/http').HttpRequest<any>,
        next:import('@angular/common/http').HttpHandler): 
        import('rxjs').Observable<import('@angular/common/http').HttpEvent<any>> {
       return next.handle(req).pipe(
       catchError(error=>{
         if(error.status===401)
         {
             return throwError(error.statusText);
         }
          if(error instanceof HttpErrorResponse)
          {
              //internal server error 500
              const applicationError=error.headers.get('Application-Error');
              if(applicationError)
              {
                  return throwError(applicationError);
              }
              //model state error
              const serverError=error.error;
              let modalStateErrors='';
              if(serverError.errors && typeof serverError.errors==='object')
              {
                  for(const key in serverError.errors)
                  {
                     if(serverError.errors[key])
                     {
                        modalStateErrors+=serverError.errors[key]+'\n';
                     }
                  }
              }
              return throwError(modalStateErrors || serverError || 'Damn! Server Error')
          } 
       })    
       )

    }

}

export const ErrorInterceptorProvider={
   provide: HTTP_INTERCEPTORS,
   useClass: ErrorInterceptor,
   multi:true
};