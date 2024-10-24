__report = {"info":{"file":"src/messaging/notifications.js","fileShort":"src/messaging/notifications.js","fileSafe":"src_messaging_notifications_js","link":"files/src_messaging_notifications_js/index.html"},"complexity":{"methodAggregate":{"cyclomatic":20,"cyclomaticDensity":22.727,"halstead":{"bugs":1.492,"difficulty":29.36,"effort":131452.426,"length":613,"time":7302.913,"vocabulary":158,"volume":4477.218,"operands":{"distinct":136,"total":363,"identifiers":["__stripped__"]},"operators":{"distinct":22,"total":250,"identifiers":["__stripped__"]}},"params":19,"sloc":{"logical":88,"physical":134}},"settings":{"commonjs":true,"forin":false,"logicalor":true,"switchcase":true,"trycatch":false,"newmi":true},"classes":[],"dependencies":[{"line":3,"path":"winston","type":"cjs"},{"line":5,"path":"../batch","type":"cjs"},{"line":6,"path":"../database","type":"cjs"},{"line":7,"path":"../notifications","type":"cjs"},{"line":8,"path":"../user","type":"cjs"},{"line":9,"path":"../socket.io","type":"cjs"},{"line":10,"path":"../plugins","type":"cjs"}],"errors":[],"lineEnd":134,"lineStart":1,"maintainability":64.194,"methods":[{"cyclomatic":1,"cyclomaticDensity":20,"halstead":{"bugs":0.025,"difficulty":3.333,"effort":254.681,"length":23,"time":14.149,"vocabulary":10,"volume":76.404,"operands":{"distinct":6,"total":10,"identifiers":["__stripped__"]},"operators":{"distinct":4,"total":13,"identifiers":["__stripped__"]}},"params":1,"sloc":{"logical":5,"physical":123},"errors":[],"lineEnd":134,"lineStart":12,"name":"<anonymous>"},{"cyclomatic":2,"cyclomaticDensity":66.667,"halstead":{"bugs":0.044,"difficulty":6,"effort":784.793,"length":32,"time":43.6,"vocabulary":17,"volume":130.799,"operands":{"distinct":11,"total":22,"identifiers":["__stripped__"]},"operators":{"distinct":6,"total":10,"identifiers":["__stripped__"]}},"params":3,"sloc":{"logical":3,"physical":7},"errors":[],"lineEnd":19,"lineStart":13,"name":"<anonymous>"},{"cyclomatic":1,"cyclomaticDensity":50,"halstead":{"bugs":0.048,"difficulty":4.5,"effort":652.259,"length":33,"time":36.237,"vocabulary":21,"volume":144.946,"operands":{"distinct":14,"total":18,"identifiers":["__stripped__"]},"operators":{"distinct":7,"total":15,"identifiers":["__stripped__"]}},"params":2,"sloc":{"logical":2,"physical":7},"errors":[],"lineEnd":27,"lineStart":21,"name":"<anonymous>"},{"cyclomatic":2,"cyclomaticDensity":0,"halstead":{"bugs":0.012,"difficulty":1.75,"effort":61.021,"length":11,"time":3.39,"vocabulary":9,"volume":34.869,"operands":{"distinct":6,"total":7,"identifiers":["__stripped__"]},"operators":{"distinct":3,"total":4,"identifiers":["__stripped__"]}},"params":1,"sloc":{"logical":0,"physical":1},"errors":[],"lineEnd":26,"lineStart":26,"name":"<anonymous>"},{"cyclomatic":2,"cyclomaticDensity":33.333,"halstead":{"bugs":0.056,"difficulty":5.031,"effort":842.089,"length":37,"time":46.783,"vocabulary":23,"volume":167.372,"operands":{"distinct":16,"total":23,"identifiers":["__stripped__"]},"operators":{"distinct":7,"total":14,"identifiers":["__stripped__"]}},"params":2,"sloc":{"logical":6,"physical":10},"errors":[],"lineEnd":38,"lineStart":29,"name":"<anonymous>"},{"cyclomatic":6,"cyclomaticDensity":24,"halstead":{"bugs":0.243,"difficulty":13.816,"effort":10080.778,"length":128,"time":560.043,"vocabulary":52,"volume":729.656,"operands":{"distinct":38,"total":75,"identifiers":["__stripped__"]},"operators":{"distinct":14,"total":53,"identifiers":["__stripped__"]}},"params":3,"sloc":{"logical":25,"physical":38},"errors":[],"lineEnd":77,"lineStart":40,"name":"<anonymous>"},{"cyclomatic":8,"cyclomaticDensity":22.857,"halstead":{"bugs":0.505,"difficulty":11.226,"effort":17007.198,"length":237,"time":944.844,"vocabulary":84,"volume":1514.979,"operands":{"distinct":73,"total":149,"identifiers":["__stripped__"]},"operators":{"distinct":11,"total":88,"identifiers":["__stripped__"]}},"params":3,"sloc":{"logical":35,"physical":55},"errors":[],"lineEnd":133,"lineStart":79,"name":"sendNotification"},{"cyclomatic":1,"cyclomaticDensity":33.333,"halstead":{"bugs":0.033,"difficulty":5.571,"effort":556.652,"length":27,"time":30.925,"vocabulary":13,"volume":99.912,"operands":{"distinct":7,"total":13,"identifiers":["__stripped__"]},"operators":{"distinct":6,"total":14,"identifiers":["__stripped__"]}},"params":1,"sloc":{"logical":3,"physical":9},"errors":[],"lineEnd":98,"lineStart":90,"name":"<anonymous>"},{"cyclomatic":5,"cyclomaticDensity":0,"halstead":{"bugs":0.04,"difficulty":6.611,"effort":793.333,"length":30,"time":44.074,"vocabulary":16,"volume":120,"operands":{"distinct":9,"total":17,"identifiers":["__stripped__"]},"operators":{"distinct":7,"total":13,"identifiers":["__stripped__"]}},"params":1,"sloc":{"logical":0,"physical":3},"errors":[],"lineEnd":94,"lineStart":92,"name":"<anonymous>"},{"cyclomatic":1,"cyclomaticDensity":0,"halstead":{"bugs":0.005,"difficulty":1.333,"effort":18.575,"length":6,"time":1.032,"vocabulary":5,"volume":13.932,"operands":{"distinct":3,"total":4,"identifiers":["__stripped__"]},"operators":{"distinct":2,"total":2,"identifiers":["__stripped__"]}},"params":2,"sloc":{"logical":0,"physical":1},"errors":[],"lineEnd":97,"lineStart":97,"name":"<anonymous>"}],"methodAverage":{"cyclomatic":2.9,"cyclomaticDensity":25.019,"halstead":{"bugs":0.101,"difficulty":5.917,"effort":3105.138,"length":56.4,"time":172.508,"vocabulary":25,"volume":303.287,"operands":{"distinct":18.3,"total":33.8},"operators":{"distinct":6.7,"total":22.6}},"params":1.9,"sloc":{"logical":7.9,"physical":25.4}},"module":"src/messaging/notifications.js"},"jshint":{"messages":[{"severity":"error","line":1,"column":1,"message":"Use the function form of \"use strict\".","source":"Use the function form of \"use strict\"."},{"severity":"error","line":3,"column":1,"message":"'const' is available in ES6 (use 'esversion: 6') or Mozilla JS extensions (use moz).","source":"'{a}' is available in ES{b} (use 'esversion: {b}') or Mozilla JS extensions (use moz)."},{"severity":"error","line":5,"column":1,"message":"'const' is available in ES6 (use 'esversion: 6') or Mozilla JS extensions (use moz).","source":"'{a}' is available in ES{b} (use 'esversion: {b}') or Mozilla JS extensions (use moz)."},{"severity":"error","line":6,"column":1,"message":"'const' is available in ES6 (use 'esversion: 6') or Mozilla JS extensions (use moz).","source":"'{a}' is available in ES{b} (use 'esversion: {b}') or Mozilla JS extensions (use moz)."},{"severity":"error","line":7,"column":1,"message":"'const' is available in ES6 (use 'esversion: 6') or Mozilla JS extensions (use moz).","source":"'{a}' is available in ES{b} (use 'esversion: {b}') or Mozilla JS extensions (use moz)."},{"severity":"error","line":8,"column":1,"message":"'const' is available in ES6 (use 'esversion: 6') or Mozilla JS extensions (use moz).","source":"'{a}' is available in ES{b} (use 'esversion: {b}') or Mozilla JS extensions (use moz)."},{"severity":"error","line":9,"column":1,"message":"'const' is available in ES6 (use 'esversion: 6') or Mozilla JS extensions (use moz).","source":"'{a}' is available in ES{b} (use 'esversion: {b}') or Mozilla JS extensions (use moz)."},{"severity":"error","line":10,"column":1,"message":"'const' is available in ES6 (use 'esversion: 6') or Mozilla JS extensions (use moz).","source":"'{a}' is available in ES{b} (use 'esversion: {b}') or Mozilla JS extensions (use moz)."},{"severity":"error","line":13,"column":74,"message":"Expected '(' and instead saw '{'.","source":"Expected '{a}' and instead saw '{b}'."},{"severity":"error","line":14,"column":9,"message":"Expected an identifier and instead saw 'if' (a reserved word).","source":"Expected an identifier and instead saw '{a}' (a reserved word)."},{"severity":"error","line":14,"column":12,"message":"Expected ')' to match '{' from line 13 and instead saw '('.","source":"Expected '{a}' to match '{b}' from line {c} and instead saw '{d}'."},{"severity":"error","line":14,"column":12,"message":"'arrow function syntax (=>)' is only available in ES6 (use 'esversion: 6').","source":"'{a}' is only available in ES{b} (use 'esversion: {b}')."},{"severity":"error","line":14,"column":39,"message":"Missing semicolon.","source":"Missing semicolon."},{"severity":"error","line":14,"column":39,"message":"Expected an identifier and instead saw ')'.","source":"Expected an identifier and instead saw '{a}'."},{"severity":"error","line":14,"column":39,"message":"Expected an assignment or function call and instead saw an expression.","source":"Expected an assignment or function call and instead saw an expression."},{"severity":"error","line":14,"column":40,"message":"Missing semicolon.","source":"Missing semicolon."},{"severity":"error","line":16,"column":25,"message":"Missing semicolon.","source":"Missing semicolon."},{"severity":"error","line":16,"column":47,"message":"'template literal syntax' is only available in ES6 (use 'esversion: 6').","source":"'{a}' is only available in ES{b} (use 'esversion: {b}')."},{"severity":"error","line":18,"column":9,"message":"Expected an assignment or function call and instead saw an expression.","source":"Expected an assignment or function call and instead saw an expression."},{"severity":"error","line":18,"column":14,"message":"Missing semicolon.","source":"Missing semicolon."},{"severity":"error","line":18,"column":33,"message":"'template literal syntax' is only available in ES6 (use 'esversion: 6').","source":"'{a}' is only available in ES{b} (use 'esversion: {b}')."},{"severity":"error","line":21,"column":68,"message":"Expected '(' and instead saw '{'.","source":"Expected '{a}' and instead saw '{b}'."},{"severity":"error","line":22,"column":9,"message":"Expected an identifier and instead saw 'const' (a reserved word).","source":"Expected an identifier and instead saw '{a}' (a reserved word)."},{"severity":"error","line":22,"column":15,"message":"Expected ')' to match '{' from line 21 and instead saw '['.","source":"Expected '{a}' to match '{b}' from line {c} and instead saw '{d}'."},{"severity":"error","line":22,"column":15,"message":"'arrow function syntax (=>)' is only available in ES6 (use 'esversion: 6').","source":"'{a}' is only available in ES{b} (use 'esversion: {b}')."},{"severity":"error","line":22,"column":26,"message":"Expected an assignment or function call and instead saw an expression.","source":"Expected an assignment or function call and instead saw an expression."},{"severity":"error","line":22,"column":34,"message":"Missing semicolon.","source":"Missing semicolon."},{"severity":"error","line":22,"column":34,"message":"Expected an identifier and instead saw ']'.","source":"Expected an identifier and instead saw '{a}'."},{"severity":"error","line":22,"column":36,"message":"Expected an operator and instead saw '='.","source":"Expected an operator and instead saw '{a}'."},{"severity":"error","line":22,"column":36,"message":"Expected an assignment or function call and instead saw an expression.","source":"Expected an assignment or function call and instead saw an expression."},{"severity":"error","line":22,"column":37,"message":"Missing semicolon.","source":"Missing semicolon."},{"severity":"error","line":22,"column":38,"message":"Expected an assignment or function call and instead saw an expression.","source":"Expected an assignment or function call and instead saw an expression."},{"severity":"error","line":22,"column":43,"message":"Missing semicolon.","source":"Missing semicolon."},{"severity":"error","line":23,"column":32,"message":"'template literal syntax' is only available in ES6 (use 'esversion: 6').","source":"'{a}' is only available in ES{b} (use 'esversion: {b}')."},{"severity":"error","line":26,"column":29,"message":"'arrow function syntax (=>)' is only available in ES6 (use 'esversion: 6').","source":"'{a}' is only available in ES{b} (use 'esversion: {b}')."},{"severity":"error","line":26,"column":92,"message":"Unrecoverable syntax error. (19% scanned).","source":"Unrecoverable syntax error."}]}}