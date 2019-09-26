
import { Injectable, ErrorHandler } from '@angular/core'
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { Observer, BehaviorSubject, Subscription, Subject } from 'rxjs/Rx';
import { HttpClient, HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable()
export class AppService implements HttpInterceptor {
    request: number = 0
    requestSub = new BehaviorSubject<number>(this.request);
    user: any = localStorage
    typegasolineid: string = 'diesel';
    mapId: any = {};
    selectedTypeOfVehicle: any = {};
    createSubscribe = new Subject<any>();

    constructor(private http: HttpClient, private router: Router, public snackBar: MatSnackBar) { }

    getForeignEvent(): Observable<any> {
        return this.createSubscribe.asObservable();
    }

    setForeignEvent(type: string, data: any) {
        this.createSubscribe.next({ type: type, "data": data })
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const authToken = localStorage.token;
        console.log("Token", authToken)
        const authReq = req.clone({
            setParams: {
                token: authToken,
                user_id: localStorage.user_id
            }
        });

        return next.handle(authReq);
    }

    public get(endpoint: string): Observable<any> {
        this.request = this.request + 1;
        this.requestSub.next(this.request)
        console.time(endpoint)
        return this.http.get(`${environment.BASE_URL}/${environment.API_URL}/${endpoint}`)
            .map((res: any) => this.result('get', endpoint, res, ""))
            .catch(error => this.handleError(error, endpoint, ""));
    }

    public post(endpoint: string, params: any, formdata: boolean = false): Observable<any> {
        this.request = this.request + 1;
        this.requestSub.next(this.request)
        console.time(endpoint)
        return this.http.post(`${environment.BASE_URL}/${environment.API_URL}/${endpoint}`, params)
            .map((res: any) => this.result('post', endpoint, res, params))
            .catch(error => this.handleError(error, endpoint, params));
    }

    public delete(endpoint: string): Observable<any> {
        this.request = this.request + 1;
        this.requestSub.next(this.request)
        console.time(endpoint)
        return this.http.delete(`${environment.BASE_URL}/${environment.API_URL}/${endpoint}`)
            .map((res: any) => this.result('delete', endpoint, res, ""))
            .catch(error => this.handleError(error, endpoint, ""));
    }

    public put(endpoint: string, params: any, formdata: boolean = false): Observable<any> {
        this.request = this.request + 1;
        this.requestSub.next(this.request)
        console.time(endpoint)
        return this.http.put(`${environment.BASE_URL}/${environment.API_URL}/${endpoint}`, params)
            .map((res: any) => this.result('post', endpoint, res, params))
            .catch(error => this.handleError(error, endpoint, params));
    }

    private handleError(error, endpoint: string, params: any) {
        this.request = this.request - 1;
        this.requestSub.next(this.request)
        if (error.status === 400 || error.status === 401) {
            this.snackBar.open(error.statusText, "LogOut", {
                duration: 3000
            });
            this.router.navigate(['/login'])
            localStorage.clear()
        } else {
            this.snackBar.open(`Backend error, please check "${endpoint}"`, "Undo")
        }
        console.timeEnd(endpoint)
        console.log(endpoint, error, params)
        return Observable.throw(error);
    }

    public result(name: string, endpoint: string, data: any, params: any) {
        this.request = this.request - 1;
        this.requestSub.next(this.request)
        if (data.msg && this.request == 0) {
            this.snackBar.open(data.msg, "Undo", {
                duration: 2000
            })
        }
        if (data.message == "You pass invalid token") {
            this.router.navigate(['/login'])
            localStorage.clear()
        }
        console.timeEnd(endpoint)
        console.log(endpoint, data, params)
        return data
    }

    public formData(params: any): FormData {
        let formdata = new FormData();
        Object.keys(params).map(x => {
            formdata.append(x, params[x])
        });
        return formdata;
    }

    public RequestLoading = () => {
        return Observable.create((observer: Observer<number>) => {
            this.requestSub.subscribe(data => {
                observer.next(data);
            })
        })
    }
}