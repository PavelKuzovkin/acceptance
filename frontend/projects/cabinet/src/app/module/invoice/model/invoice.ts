import * as moment from "moment";
import {Moment} from "moment";
import {IPager} from "../../../../../../tools/src/lib/module/common/model/pager";

export interface IInvoiceList {
    list: IInvoice[]
    pager: IPager;
    status: number
}

export interface IInvoice {
    id: number;
    invoiceNumber: string;
    createdAt: Moment | null;
    wagonNumber: string;
    unloadingStart: Moment | null;
    unloadingEnd: Moment | null;
    unloadingError: number;
    weightBefore: number;
    weightAfter: number;
    weightCargo: number;
    weightAccepted: number;
    unloadingRecord: string;
    state: string;
}

export class Invoice implements IInvoice {
    constructor(
        public id: number = 0,
        public invoiceNumber: string = '',
        public createdAt: Moment | null = null,
        public wagonNumber: string = '',
        public unloadingStart: Moment | null = null,
        public unloadingEnd: Moment | null = null,
        public unloadingError: number = 0,
        public weightBefore: number = 0,
        public weightAfter: number = 0,
        public weightCargo: number = 0,
        public weightAccepted: number = 0,
        public unloadingRecord: string = '',
        public state: string = ''
    ) {
    }

    _init(data: IInvoice | null): IInvoice {
        for (const key in data) {
            if (key === 'createdAt' || key === 'unloadingStart' || key === 'unloadingEnd') {
                if (data[key]) {
                    this[key] = moment(data[key]);
                }
            } else {
                // @ts-ignore
                this[key] = data[key];
            }
        }

        return this;
    }
}
