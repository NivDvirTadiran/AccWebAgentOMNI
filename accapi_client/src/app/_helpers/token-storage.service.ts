import { Injectable } from '@angular/core';

const TOKEN_KEY = 'token';
const REFRESHTOKEN_KEY = 'auth-refreshtoken';
const USER_KEY = 'user';
const SIGNOUT_MARK = 'user-logout';
const SESSION_ID = 'session-id';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  constructor() { }

  signOut(): void {
    window.sessionStorage.clear();
    this.setSignOutMark();
  }

  setSignOutMark(): void {
    window.sessionStorage.setItem(TOKEN_KEY, SIGNOUT_MARK);
  }

  isSignOut(): boolean {
    return window.sessionStorage.getItem(TOKEN_KEY)?.includes(SIGNOUT_MARK);
  }

  public saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
    const user = this.getUser();
    if (user.id) {
      this.saveUser({ ...user, accessToken: token });
    }
  }

  public getToken(): string | null {
    return window.sessionStorage.getItem(TOKEN_KEY);
  }

  public saveRefreshToken(token: string): void {
    window.sessionStorage.removeItem(REFRESHTOKEN_KEY);
    window.sessionStorage.setItem(REFRESHTOKEN_KEY, token);
  }
  public getRefreshToken(): string | null {
    return window.sessionStorage.getItem(REFRESHTOKEN_KEY);
  }

  public saveUser(user: any): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): any {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }
    return {};
  }

  public saveSessionId(token: string): void {
    window.sessionStorage.removeItem(SESSION_ID);
    window.sessionStorage.setItem(SESSION_ID, token);
  }
  public getSessionId(): string | null {
    return window.sessionStorage.getItem(SESSION_ID);
  }
  public clearSessionId(): void {
    return window.sessionStorage.removeItem(SESSION_ID);
  }

}
