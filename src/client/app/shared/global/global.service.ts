import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';

import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class GlobalService {

    constructor(private http: Http) {
    }

    public selectedSiteId: string = '';
    public isRunning: boolean = false;

    // TODO: move to a configuration file
    private webServiceURL: string = 'https://dev.geodesy.ga.gov.au';

    public setSelectedSiteId(value: string) {
        this.selectedSiteId = value;
    }

    public getSelectedSiteId(): string {
        return this.selectedSiteId;
    }

    public startRunning() {
        this.isRunning = true;
    }

    public stopRunning() {
        this.isRunning = false;
    }

    setRunningStatus(value: boolean) {
        this.isRunning = value;
    }

    public getRunningStatus(): boolean {
        return this.isRunning;
    }

    public getWebServiceURL(): string {
        return this.webServiceURL;
    }

    public updateApplication() {
        console.log('fff');
        this.http.get('/serviceWorker/clearCache')
            .subscribe((x: any) => {
                console.log('ok')
            });
    }
}
