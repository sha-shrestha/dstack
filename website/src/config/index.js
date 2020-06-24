import global from './global';

let local = {};

/*eslint-disable*/
try {
    local = require('./local').default;
} catch (error) {}
/*eslint-enable*/

export default {
    ...global,
    ...local,
};
