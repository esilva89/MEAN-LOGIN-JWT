// External Modules.
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs/internal/Observable";
import { map } from "rxjs/operators";
import { isNullOrUndefined } from "util";

// My Modules.
import { Keys } from '../config/keys';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  /**
   * Initialize the user service.
   * 
   * @constructor
   * @param {HttpClient} http: Angular module.
   */
  constructor(private http: HttpClient) { }

  /**
   * Return the token stored in the localStorage.
   * 
   * @method getToken.
   * @return {string}: return the token.
   */
  public getToken(): string {
    return localStorage.getItem('token');
  }

  /**
   * Return the username stored in the localStorage.
   * 
   * @method getUser.
   * @return {string}: return the username if it exists; null otherwise.
   */
  public getUser(): string {
    let username = localStorage.getItem('username');
    return !isNullOrUndefined(username) ? username : null;
  }

  /**
   * Store the token in the localStorage.
   * 
   * @method setToken.
   * @param {string} token: the token that is going a store.
   */
  public setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  /**
   * Store the username in the localStorage.
   * 
   * @method setUser.
   * @param {string} username: the username that is going a store.
   */
  public setUser(username: string): void {
    localStorage.setItem('username', username);
  }

  /**
   * Send the user object to the server to register it.
   * 
   * @method signUp.
   * @param {User} newUser: user object that is going a store.
   * @return {Observable<any>}: return the response of the server.
   */
  public signUp(newUser: User): Observable<any> {
    return this.http.post<User>(Keys.serverUrl + Keys.signUp, newUser)
      .pipe(map(res => res));
  }

  /**
   * Send the user object to the server to login it.
   * 
   * @method signIn.
   * @param {User} newUser: user object with the data to login.
   * @return {Observable<any>}: return the response of the server.
   */
  public signIn(newUser: User): Observable<any> {
    return this.http.post<User>(Keys.serverUrl + Keys.signIn, newUser)
      .pipe(map(res => res));
  }

  /**
   * Remove the token and username from the localStorage.
   * 
   * @method logout.
   */
  public logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
  }

  /**
   * Send the user's token to the server to get profile.
   * 
   * @method profile.
   * @return {Observable<any>}: return the response of the server.
   */
  public profile(): Observable<any> {
    return this.http.post(Keys.serverUrl + Keys.profile, {})
      .pipe(map(res => res));
  }

  /**
   * Send the user object to the server to edit profile.
   * 
   * @method editProfile.
   * @param {User} currentUser: user object with the data to edit profile.
   * @return {Observable<any>}: return the response of the server.
   */
  public editProfile(currentUser: User): Observable<any> {
    return this.http.put(Keys.serverUrl + Keys.editProfile, currentUser)
      .pipe(map(res => res));
  }

  /**
   * Send the user object to the server to edit password.
   * 
   * @method editPassword.
   * @param {User} currentUser: user object with the data to edit password.
   * @return {Observable<any>}: return the response of the server.
   */
  public editPassword(currentUser: User): Observable<any> {
    return this.http.put(Keys.serverUrl + Keys.editPassword, currentUser)
      .pipe(map(res => res));
  }

  /**
   * Send the user's token to the server to remove user.
   * 
   * @method removeUser.
   * @return {Observable<any>}: return the response of the server.
   */
  public removeUser(): Observable<any> {
    return this.http.delete(Keys.serverUrl + Keys.removeUser, {})
      .pipe(map(res => res));
  }

}
