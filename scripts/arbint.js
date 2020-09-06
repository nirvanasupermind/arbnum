"use strict";

function ArbInt(str) {
    this.str = str;
}

ArbInt.prototype.toString = function () {
    return this.str;
}

ArbInt.prototype.neg = function () {
    if (this.str.charAt(0) === "-") {
        //The number is negative
        return new ArbInt(this.str.substring(1, this.str.length));
    } else {
        return new ArbInt("-" + this.str);
    }
}

ArbInt.prototype.abs = function () {
    if (this.str.charAt(0) === "-") {
        return new ArbInt(this.str.substring(1, this.str.length))
    } else {
        return this;
    }
}
ArbInt.prototype.isNeg = function () {
    return this.str.charAt(0) === "-";
}

ArbInt.prototype.add = function (that) {
    if (this.isNeg() && that.isNeg()) {
        //Both negative, distribute
        return this.neg().add(that.neg()).neg();
    } else if (this.isNeg()) {
    }



    var a = this.str;
    var b = that.str;
    if (a.length < b.length) {
        var temp = a;
        a = b;
        b = temp;
    }
    while (a.length > b.length) {
        b = "0" + b;
    }



    var carry = "0";
    var result = "";
    for (var i = 0; i < a.length; i++) {
        var place = a.length - i - 1;
        var digisum = (Number(a.charAt(place)) + Number(b.charAt(place)) + Number(carry)).toString();
        if (digisum.length !== 1) {
            carry = digisum.charAt(0);
        } else {
            carry = "0";
        }
        result = digisum.charAt(digisum.length - 1) + result;
    }

    return new ArbInt(result);
}


ArbInt.prototype.plus = ArbInt.prototype.add;

ArbInt.prototype.sub = function(that) {}


export { ArbInt };