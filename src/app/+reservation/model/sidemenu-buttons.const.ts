import { SidemenuButton } from "../../shared/sidemenu";

export const sidemenuButtons : SidemenuButton[] = [{
	label: "Ocupa",
	icon: "check-circle",
	important: true,
	clickCallback: (function() {
        console.log("ocupa");
		this.sidemenuService.hideMenu();
    })
},{
	label: "Absent",
	icon: "ban",
	clickCallback: (function() {
        console.log("absent");
		this.sidemenuService.hideMenu();
    })
},{
	label: "Sterge",
	icon: "times-circle",
	clickCallback: (function() {
        console.log("sterge");
		this.sidemenuService.hideMenu();
    })
}];