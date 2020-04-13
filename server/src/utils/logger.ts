// import debug, { Debugger } from 'debug';
// import util from 'util';

// export class Logger {

//     private readonly logger: Debugger;

//     static init(namespace: string): Logger {
//         return new Logger(namespace);
//     }

//     private constructor(namespace: string) {
//         this.logger = debug(namespace);
//     }

//     debug(...message: (string | Object)[]) {
//         message.forEach(m => {
//             if (m instanceof Object) {
//                 this.debugObject(m);
//             } else {
//                 this.debugSimple(m);
//             }
//         });
//     }

//     private debugSimple(message: string) {
//         this.logger(message);
//     }

//     private debugObject(object: Object) {
//         this.logger(util.inspect(object, {showHidden: false, depth: null, colors: true}));
//     }

// }
