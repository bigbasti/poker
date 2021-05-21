
import {map} from "rxjs/operators";
import {Injectable, Injector} from "@angular/core";
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from "@angular/common/http";
import {Credentials, Permission, PokerUser} from "../model/user.model";
import {Router} from "@angular/router";
import {PokerEnvironmentService} from "./environmant.service";

@Injectable()
export class PokerAuthService {
  public currentUser: PokerUser;

  constructor(
    private http: HttpClient,
    private env: PokerEnvironmentService,
    private injector: Injector
  ) { }

  /* in order to be able to inject this service during APP_INITIALIZATION without creating
   * cyclic dependencies, the Router Service can not be depended on directly but rather must be
   * injected through the Injector service
   */
  public get router(): Router {
    return this.injector.get(Router);
  }

  /**
   * sends a POST request to the logout URL.
   * If successful user is redirected to homepage
   * @param reload if true, a full session reload is performed by the browser
   */
  logout(reload: boolean = true): void {
    const url = this.env.getApiEndpointRoot() + "/user/logout";
    const headers: HttpHeaders = new HttpHeaders().set("content-type", "application/x-www-form-urlencoded");
    const options = {
      headers: headers,
      withCredentials: true     // important for XSRF
    };

    this.currentUser = undefined;
    this.http.post(url, null, options)
    .subscribe(result => {
      // console.log("Logout successful!");
      // console.dir(result);
      if (reload) {
        this.router.navigate(["home"], {queryParams: {returnTo: this.router.url}}).then(value => {
          // window.location.href = window.location.origin + "/dologout.html";    // uncomment for central login
          window.location.reload();   // reset session   (comment for central login)
        });
      }
    }, error => {
      console.log("Error while logging out: ", error);
    });
  }

  /**
   * returns whether there is a valid user session
   * @returns {boolean}
   */
  isAuthenticated(): boolean {
    return !! this.currentUser;
  }

  /**
   * returns true if the username provided matches the currently logged in username
   * @param {string} email to compare
   * @returns {boolean} true if current user's username is the same
   */
  isUser(email: string): boolean {
    return (this.isAuthenticated() && this.currentUser.email === email);
  }

  /**
   * Performs a login on the server with the given credentials.
   * After the http call, the response is provided by calling the
   * provided callback function.
   * If the login was successful, the logged in user is written into the context
   * @param {Credentials} credentials object containing username and password
   * @param returnToUrl the url the user should be redirected after a successful login
   * @param {(authResult: any) => void} callback optional method for returning the server response
   */
  login(credentials: Credentials, returnToUrl: string = "/", callback?: (authResult: any) => void) {
    const url = this.env.getApiEndpointRoot() + "/user/login";
    const headers: HttpHeaders = new HttpHeaders().set("content-type", "application/x-www-form-urlencoded");
    const params: FormData = new FormData();
      params.append("username", credentials.email);
      params.append("password", credentials.password);
    const options = {
      // headers: headers,
      withCredentials: true     // important for XSRF
    };

    this.http.post(url, params, options)               // send login request to server
      .subscribe(authResult => {                           // if login was successfull
        this.checkAuthenticationStatus(user => {        // request a full user object (with roles)
          console.log("Login successful!");
          if (callback) {callback(user); }                      // if callback was registered invoke it
          this.router.navigate([returnToUrl]);
        });
      }, (error: HttpErrorResponse) => {
        console.log("Error while logging in: ", error);
        if (callback) {callback(error); }
      });
  }

  /**
   * Uses the values from the server /api/user/me response
   * to create a new frontend user instance conatining shortcuts to
   * the most relevant parts but also keeping the original
   * principal object accessible
   * @param authRes object returned by /api/user/me call
   * @returns {User} front end user instance
   */
  private createUserInstance(authRes: any): PokerUser {
    const newUser: PokerUser = {
      id: authRes.principal.principal.id,
      email: authRes.principal.principal.email,
      name: authRes.principal.principal.name,
      pass: authRes.principal.principal.pass,
      admin: authRes.principal.principal.admin,
      permissions: []
    };

    if (authRes.principal.authorities) {                                // user's roles
      newUser.permissions.push(Permission.Authenticated);   // Every logged in user has this role
      for (const p in Permission) {
        for (let i = 0; i < authRes.principal.authorities.length; i++) {
          if (Permission[p] === authRes.principal.authorities[i]["authority"]) {
            newUser.permissions.push(Permission[p] as Permission);
          }
        }
      }
    }
    // map string based permissions to enum values

    return newUser;
  }

  /**
   * Loads the currently logged in user from the server.
   * Updates the current logged in user to the freshly loaded instance.
   * If there is no logged in user on the server 401 is received and the user
   * is redirected to login page.
   * @param {(sessionUser: User) => void} callback optional callback to receive the new user intance
   */
  checkAuthenticationStatus(callback?: (sessionUser: PokerUser) => void) {
    const url = this.env.getApiEndpointRoot() + "/user/me";
    const options = { withCredentials: true     /* important for XSRF*/};

    this.http.get(url, options).subscribe(success => {
      // console.log("updates auth:", success);
      this.currentUser = this.createUserInstance(success);
      if (callback) {callback(this.currentUser); }
    }, error => {
      if (this.router.url.indexOf("help") < 0) {
        // redirect only if a secured page was requested
        this.router.navigate(["/home"]);
      }
    });
  }

  /**
   * special method to initialize the authentication context for the application.
   * Basically it does the same as checkAuthenticationStatus but it is called much
   * earlier in the application initialization process (see app.module.ts)<br/>
   * This ensures that the authentication information is loaded before any other
   * operation is executed which maybe expects auth information to be already present.
   * @returns {Promise<any>}
   */
  initAuth(): Promise<any> {
    const url = this.env.getApiEndpointRoot() + "/user/me";
    const options = { withCredentials: true     /* important for XSRF*/};

    return this.http.get(url, options).pipe(
      map((res: any) => res)).toPromise()
      .then(data => {
        this.currentUser = this.createUserInstance(data);
        return data;
      }).catch(error => {
        if (this.router.url.indexOf("help") < 0) {
          // redirect only if a secured page was requested
          // this.router.navigate(["/"]);
          return error;
        }
        return error;
      });
  }

  /**
   * checks whether the currently logged in user is missing a specific permission
   * @param permission permission to check for
   * @returns {boolean} true if the user is missing the permission
   */
  isMissingPermission(permission: Permission | string): boolean {
    return this.currentUser && !(this.currentUser.permissions.some(p => p === permission));
  }

  /**
   * Checks whether the currently logged in user has a specific permission or is an admin
   * @param {Permission} permission permission to check for
   * @returns {boolean} true if the user has the permission
   */
  hasPermission(permission: Permission | string): boolean {
    return this.currentUser && (this.currentUser.permissions.some(p => p === permission) || this.isAdministrator());
  }

  /**
   * Checks whether the currently logged in user is an administrator
   * @returns {boolean} true if the user has the permission administrator
   */
  isAdministrator(): boolean {
    return this.currentUser && this.currentUser.permissions.some(p => p === Permission.Administrator);
  }

  /**
   * Checks whether the currently logged in user has ANY of the roles provided
   * @param {Permission[]} permissions
   * @returns {boolean} true if user hay one or more of the provided roles
   */
  hasAnyPermission(permissions: Permission[]): boolean {
    let hasPermission = false;
    if (permissions.length === 0) {
      // no permissions -> no roles required -> anonymous access
      hasPermission = true;
    }
    permissions.forEach(p => {
      if (this.hasPermission(p)) {
        hasPermission = true;
      }
    });
    return hasPermission;
  }

  /**
   * Checks whether the currently logged in user has ALL of the provided roles
   * @param {Permission[]} permissions
   * @returns {boolean} true if user has all provided roles
   */
  hasAllPermission(permissions: Permission[]): boolean {
    let hasPermission = true;
    permissions.forEach(p => {
      if (!this.hasPermission(p)) {
        hasPermission = false;
      }
    });
    return hasPermission;
  }
}
