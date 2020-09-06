/**
 * compose (a,b,c)(value) = a(b(c(value)));
 * @param funcs
 * @returns {function(*=): *}
 */
const compose = (...funcs) => (comp) => {
    return funcs.reduceRight((wrapped, f) => f(wrapped), comp)
};


/*
Для понимания
На первом проходе:

previousValue = d
Value = c

если в arr.reduceRight((previousValue, Value),'XX'))
то previousValue на первом проходе будет 'XX'

const arr = ['a', 'b', 'c', 'd'];
const res = arr.reduceRight((previousValue, Value) => {
    console.log(`prevValue=${previousValue}`, `Value=${Value}`)
    return previousValue + Value;
});
console.log(res);
 */

export default compose