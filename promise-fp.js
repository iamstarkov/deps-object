export default Promise;
export const reject = Promise.reject.bind(Promise);
export const resolve = Promise.resolve.bind(Promise);
export const all = Promise.all.bind(Promise);
