import {Injectable} from "@angular/core";
import * as moment from "moment";

export interface IDateRange {
    from: Date;
    to: Date;
}

@Injectable({
    providedIn: 'root',
})
export class DateService {
    getFastDateRange(rangeName: string): IDateRange {
        let to = moment().toDate();
        let from;
        if(rangeName === 'last_24_hours') {
            from = moment().subtract(24, 'hours').toDate();

        }
        if(rangeName === 'today') {
            from = moment().startOf('day').toDate();

        }
        if(rangeName === 'this_month') {
            from = moment().startOf('month').toDate();

        }
        if(rangeName === 'last_month') {
            to = moment().subtract(1, 'month').endOf('month').toDate();
            from = moment().subtract(1, 'month').startOf('month').toDate();
        }

        return {from: from, to: to} as IDateRange;
    };
}
