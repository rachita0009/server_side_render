import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { BehaviorSubject, catchError, Observable, of, Subject } from "rxjs";
import { UserService } from "../service/user.service";

export class UserDataSource implements DataSource<Element>{


    private eventCallback = new Subject<string>(); 
    eventCallback$ = this.eventCallback.asObservable();
    

    private userSubject = new BehaviorSubject<Element[]>([]);
     totalResult: any;

    constructor(private userservice: UserService) { }

    connect(collectionViewer: CollectionViewer): Observable<Element[]> {
        return this.userSubject.asObservable();
    }



    disconnect(collectionViewer: CollectionViewer): void {
        this.userSubject.complete();

    }

    loaduser(pageIndex = 0, pageSize = 5, search = '',
        orderby = 'asc', sort = 'Firstname') {



        return this.userservice.getdatas(pageIndex, pageSize, search, orderby,
            sort).pipe(
                catchError(() => of([])),

            )
            .subscribe(res => { 
                this.userSubject.next(res.users);
                this.totalResult = res.total
                this.eventCallback.next(this.totalResult);
            });
    }


    
   
}