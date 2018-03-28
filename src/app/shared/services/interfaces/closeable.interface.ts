import { Subject } from 'rxjs/Subject';

export interface Closeable{
	close: Subject<any>;
}