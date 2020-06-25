const operations = {

    add: function(n1, n2) {
        return n1 + n2;
    },

    subtract: function(n1, n2) {
        return n1 - n2;
    },

    multiply: function(n1, n2) {
        return n1 * n2;
    },

    divide: function(n1, n2) {
        return n1 / n2;
    },

}

function operate(operation, n1, n2) {
    return operations[operation](n1, n2);
}