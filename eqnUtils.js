console.log('alive');

let ops = {
    '+': {
        execute: (a, b) => a + b,
        priority: 1
    },
    '-': {
        execute: (a, b) => a - b,
        priority: 1
    },
    '/': {
        execute: (a, b) => a / b,
        priority: 2
    },
    '*': {
        execute: (a, b) => a * b,
        priority: 2
    },
    '^': {
        execute: (a, b) => Math.pow(a, b),
        priority: 3
    }
};

const compareOps = function(a, b) {
    if (ops[a].priority === 3) {
        return 1;
    } else {
        return ops[a].priority - ops[b].priority;
    }
}

// mutates array and removes the next number
const sliceNum = function(strArr) {
    let val = '';
    while (strArr.length > 0) {
        if (ops[strArr[0]]) {
            return [Number(val), strArr];
        } else {
            val = val.concat(strArr.shift());
        }
    }
    return [Number(val), strArr];
};


// removes the next number from the array, taking into account the sign
const sliceNextValue = function(strArr) {
    // catches if the number is negative
    let pos = true;
    while (strArr[0] === '-' || strArr[0] === '+') {
        let sym = strArr.shift();
        if (sym === '-') {
            pos = !pos;
        }
    }
    [res, strArr] = sliceNum(strArr);
    if (!pos) {
        res = res * -1;
    }
    return [res, strArr];
};

const computeStrArr = function(strArr, res, topLevelOp) {
    // if this is the first run, we get the first value
    if (res === undefined) {
       [res, strArr] = sliceNextValue(strArr);
    }

    // base case is if we have no strArr
    // in which case we want to return the result and nothing else
    if (strArr.length === 0) {
        return res;
    }

    let op = strArr.shift();
    let b;
    [b, strArr] = sliceNextValue(strArr);
    
    // if there are items remaining to be computed
    if (strArr.length > 0) {
        let nextOp = strArr[0];

        // If the next operation is lower priority than our current operation, we return control backwards
        if (compareOps(nextOp, op) < 0) {
            return ops[op].execute(res, b);
        // If the next operation is higher priority than our current operation, we pass control forewards
        } else if (compareOps(nextOp, op) > 0) {
            b = computeStrArr(strArr, b, nextOp);
        }

        // Compute the result thus far
        res = ops[op].execute(res, b);

        // Recurse with remaining string
        return computeStrArr(strArr, res, topLevelOp);

    } else {
        return ops[op].execute(res, b);
    }
};


// 1N to split + 1N to calculate (unfortunately JS doesn't have a way to pop off of a string, but could be done by making a new string class that 
// takes the last value and sets to null and manually changes the length)
module.exports = computeString = function(string) {
    let strArr = string.split('');
    return computeStrArr(strArr);
};

console.log(computeString('2-2/2^2*2'));