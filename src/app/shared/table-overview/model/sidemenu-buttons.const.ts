import { SidemenuButton } from "../../sidemenu";

export const sidemenuButtons : SidemenuButton[] = [{
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