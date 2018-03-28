import { Subject } from 'rxjs/Subject';

export interface Saveable{
	save: Subject<any>;
}