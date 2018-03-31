import { SidemenuButton } from "../../sidemenu";

export const freeTableButtons : SidemenuButton[] = [{
	label: "Ocupa",
	icon: "check-circle",
	important: true,
	clickCallback: (function() {
		this.sidemenuService.hideMenu();
    })
},{
	label: "Rezerva",
	icon: "plus-circle",
	clickCallback: (function() {
		this.sidemenuService.hideMenu();
    })
}];

export const occupiedTableButtons : SidemenuButton[] = [{
	label: "Finalizare",
	icon: "check-circle",
	important: true,
	clickCallback: (function() {
		this.sidemenuService.hideMenu();
	})
}];