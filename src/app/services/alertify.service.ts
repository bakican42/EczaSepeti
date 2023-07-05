import { Injectable } from "@angular/core";

declare let alertify: any;

@Injectable()
export class AlertifyService {

    constructor() {}

    success(message: string) {
        alertify.set('notifier','position', 'top-right');         
        alertify.success(message)
    }

    error(message: string) {
        alertify.set('notifier','position', 'top-right');
        alertify.error(message)
    }

    warning(message: string) {
        alertify.set('notifier','position', 'top-right');
        alertify.warning(message)
    }
}