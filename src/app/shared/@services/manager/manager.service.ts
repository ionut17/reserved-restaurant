import { Injectable, Output, EventEmitter, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs/Subscription";
import { Observable } from 'rxjs/Observable';

import { SidemenuService, SidemenuButton } from "../../sidemenu";
import { Table, Item } from "../../@model";
import { Subject } from "rxjs/Subject";

/**
 * Abstract Manager service which provides generic selection functionality
 */
export class ManagerService<T extends Item> implements OnDestroy {

	/**
	 * Emits events when the a reservation is toggled
	 * selected or deselected (boolean value means the status)
	 */
	@Output() get selectedItemChange():Observable<T> {
		return this.selectedItemChange$.asObservable();
	}

	selectedItem: T;
	private selectedItemChange$: Subject<T> = new Subject();
	private sidemenuCloseSubscription: Subscription;

	constructor(protected sidemenuService: SidemenuService,
				protected sidemenuButtons: SidemenuButton[]) {
		this.sidemenuService.onClose().subscribe(() => {
			this.deselect(false);
		});
		const self = this;
		this.sidemenuButtons.forEach((button: SidemenuButton) => {
			button.clickCallback = button.clickCallback.bind(self);
		});
	}

	ngOnDestroy() {
		if (this.sidemenuCloseSubscription) {
			this.sidemenuCloseSubscription.unsubscribe();
		}
	}

	hasSelected(): boolean {
		return typeof this.selectedItem !== 'undefined';
	}

	isSelected(item: T): boolean {
		return item && this.selectedItem
			? this.selectedItem.id === item.id
			: false;
	}

	select(item: T, menuInteraction: boolean = true): void {
		if (this.isSelected(item)) {
			this.deselect(menuInteraction);
		} else {
			this.selectedItem = item;
			this.selectedItemChange$.next(item);
			if (menuInteraction) this.sidemenuService.showMenu(this.sidemenuButtons);
		}
	}

	deselect(menuInteraction: boolean = true): void {
		if (!this.selectedItem){
			return;
		}
		this.selectedItem = undefined;
		this.selectedItemChange$.next(undefined);
		if (menuInteraction) this.sidemenuService.hideMenu();
	}

}