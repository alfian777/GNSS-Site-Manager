import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { GlobalService, CorsSiteService, ServiceWorkerService } from '../shared/index';
import { NotificationsService } from 'angular2-notifications';

/**
 * This class represents the SelectSiteComponent for searching and selecting CORS sites.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-select-site',
  templateUrl: 'select-site.component.html',
})
export class SelectSiteComponent implements OnInit {
  private serviceWorkerSubscription: Subscription;
  public siteName: string = '';
  public fourCharacterId: string = '';
  public sites: Array<any> = [];
  public selectedSite: any = null;
  public searchMsg: string = '';
  public errorMessage: string;
  public isSearching: boolean = false;
  private cacheItems: Array<string> = [];

  public columns:Array<any> = [
    {name: 'fourCharacterId', sort: ''},
    {name: 'name', sort: ''}
  ];

    public options = {
        position: ['bottom', 'left'],
        timeOut: 5000,
        lastOnBottom: true
    };

  /**
   * Creates an instance of the SelectSiteComponent with the injected CorsSiteService.
   *
   * @param {Router} router - The injected Router for switching between select-site and site-info pages.
   * @param {CorsSiteService} corsSiteService - The injected CorsSiteService.
   * @param {ServiceWorkerService} serviceWorkerService - service interface to the Service Worker
   * @param {GlobalService} globalService - common constants and methods
   */
  constructor(public router: Router, public corsSiteService: CorsSiteService,
      private globalService: GlobalService, private serviceWorkerService: ServiceWorkerService,
              private notificationsService: NotificationsService) { }

  /**
   * Initialize relevant variables when the directive is instantiated
   */
  ngOnInit() {
    this.setupSubscriptions();
    this.clearAll();
    this.updateCacheList();
  }

  setupSubscriptions() {
    this.serviceWorkerSubscription = this.serviceWorkerService.clearCacheObservable.subscribe((isCacheChanged: boolean) => {
      if (isCacheChanged) {
        this.updateCacheList();
      }
    });
  }

  /**
   * Run search function if users type any characters in "Four Character Id" input field, triggered by "change" event.
   *
   * Note: use ngModelChange event as it includes "keyup" event, paste and selection from dropdown hints.
   */
  public onSiteIdChange(value: string) {
    this.notificationsService.success('Notification', 'Body of that');
    this.fourCharacterId = value;
    if (this.fourCharacterId === null || this.fourCharacterId.trim() === '') {
      if (this.siteName === null || this.siteName.trim() === '') {
        this.clearAll();
      } else {
        this.searchSites();
      }
    } else {
      this.searchSites();
    }
  }

  /**
   * Run search function if users type any characters in "Site Name" input field, triggered by "change" event.
   */
  public onSiteNameChange(value: string) {
    this.siteName = value;
    if (this.siteName === null || this.siteName.trim() === '') {
      if (this.fourCharacterId === null || this.fourCharacterId.trim() === '') {
        this.clearAll();
      } else {
        this.searchSites();
      }
    } else {
      this.searchSites();
    }
  }

  /**
   * Return a list of sites from DB based on the site name and/or four character Id.  Using WFS and XML.
   */
  searchSites() {
    console.log('---- Four Character ID='+this.fourCharacterId+'; Site Name='+this.siteName);
    this.errorMessage = null;
    this.isSearching = true;
    this.sites = [];
    this.corsSiteService.getCorsSitesByUsingWFS(this.fourCharacterId, this.siteName)
      .subscribe(
        (responseJson: any) => this.sites = responseJson,    // ? responseJson._embedded.corsSites : []),
        (error: Error) => this.errorMessage = <any>error,
        () => {
          this.isSearching = false;
          if (this.sites.length === 0)
            this.searchMsg = 'No sites found. Please refine your search criteria and try it again.';
        }
      );
  }

  /**
   * Select a site from the search results of sites.
   */
  selectSite(site: any) {
    this.selectedSite = site;
    this.globalService.setSelectedSiteId(site.fourCharacterId);
    let link = ['/siteInfo', site.id];
    this.router.navigate(link);
  }

  /**
   * Clear all input fields and clear sites array
   */
  clearAll() {
    this.errorMessage = null;
    this.searchMsg = 'Please enter search criteria for searching desired sites.';
    this.siteName = '';
    this.fourCharacterId = '';
    this.sites.length = 0;
    this.selectedSite = null;
    this.isSearching = false;
    this.globalService.selectedSiteId = null;
  }


  public sortField(columnIndex: number):any {
    let sort = this.columns[columnIndex].sort;
    for (let i = 0; i < this.columns.length; i ++) {
      if ( i === columnIndex) {
        if (!sort) {
          sort = 'asc';
        }
        this.columns[i].sort = (sort === 'asc') ? 'desc' : 'asc';
      } else {
        this.columns[i].sort = '';
      }
    }

    let columnName = this.columns[columnIndex].name;
    this.sites = this.sites.sort((previous:any, current:any) => {
      if (previous[columnName] > current[columnName]) {
        return sort === 'desc' ? -1 : 1;
      } else if (previous[columnName] < current[columnName]) {
        return sort === 'asc' ? -1 : 1;
      }
      return 0;
    });
  }

  /**
   * Component method to request the Service Worker clears it's cache.
   */
  clearCache = (): void  => {
    this.serviceWorkerService.clearCache().then((data: string) => {
      console.debug('select-site.component clearCache() success: ', data);
    }, (error: Error) => {
      throw new Error('Error in clearCache: ' + error.message);
    });
  }

  /**
   * Component method to retrieve the list of URLs cached in the Service Worker and to update the this.cacheItem array
   */
  updateCacheList = (): void => {
    this.serviceWorkerService.getCacheList().then((data: string[]) => {
      this.cacheItems.length = 0;
      this.cacheItems = data;
    }).catch((error: any) => {
      console.error('Caught error in updateCacheList:', error);
    });
  }
}
