import {Injectable, Injector} from "@angular/core";
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
  HttpXsrfTokenExtractor
} from "@angular/common/http";
import {Observable} from "rxjs";
import {tap} from "rxjs/operators";
import {Router} from "@angular/router";
import {PokerEnvironmentService} from "../shared/services/environmant.service";

/**
 * This interceptor intercepts every backend call and
 * - when call starts
 * -- adds an XSRF token to the request headers (only if run locally on dev machine)
 * -- increases the globalConnections count (so a spinner can be displayed at the top of the page indicating background activity)
 * - when call returns
 * -- decreases the globalConnections count (so the spinner can be hidden when no open connections remain)
 * -- checks the response for HTTP errors and redirects the user to the homepage if an error was found
 */
@Injectable()
export class HttpXsrfInterceptor implements HttpInterceptor {

  constructor(
    private tokenExtractor: HttpXsrfTokenExtractor,
    private env: PokerEnvironmentService,
    private injector: Injector) {
  }

  /* in order to be able to inject this service during APP_INITIALIZATION without creating
 * cyclic dependencies, the Router Service can not be depended on directly but rather must be
 * injected through the Injector service
 */
  public get router(): Router {
    return this.injector.get(Router);
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // extend http requests with XSRF token
    if (!this.env.isProduction()) {
      const headerName = "X-XSRF-TOKEN";
      const token = this.tokenExtractor.getToken() as string;
      if (token !== null) {
        req = req.clone({headers: req.headers.set(headerName, token)});
      }
    }
    // extend http request with withCredentials token
    req = req.clone({ withCredentials: true});

    return next.handle(req).pipe(
      tap((result: HttpEvent<any>) => {

      }, error => {
        if (error.status === 401 && !req.urlWithParams.endsWith("api/user/me") && !req.urlWithParams.endsWith("api/user/login")) {
          // only display a message when an actual api call fails
          this.router.navigate(["/home"], {queryParams: {error: "session", returnTo: this.router.url}});
        }
      })
    );
  }
}
