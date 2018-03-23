import { SidemenuButton } from "../../sidemenu";

export const sidemenuButtons : SidemenuButton[] = [{
	label: "Ocupa",
	icon: "check-circle",
	important: true,
	clickCallback: (function() {
        console.log("ocupa");
		this.sidemenuService.hideMenu();
    })
},{
	label: "Rezerva",
	icon: "plus-circle",
	clickCallback: (function() {
        console.log("absent");
		this.sidemenuService.hideMenu();
    })
}];