import { SidemenuButton } from "../../shared/sidemenu";

export const sidemenuButtons : SidemenuButton[] = [{
	label: "Ocupa",
	icon: "check-circle",
	important: true,
	clickCallback: (function() {
		this.sidemenuService.hideMenu();
    })
},{
	label: "Absent",
	icon: "ban",
	clickCallback: (function() {
		this.sidemenuService.hideMenu();
    })
},{
	label: "Sterge",
	icon: "times-circle",
	clickCallback: (function() {
		this.sidemenuService.hideMenu();
    })
}];