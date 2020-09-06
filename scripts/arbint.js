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
        //This negative, subtract
        return that.sub(this.neg());
    } else if(that.isNeg()) {
        return this.sub(that.neg());
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

ArbInt.trail = function (a, b) {
    var shorter = a.str;
    var longer = b.str;
    if (longer.length < shorter.length) {
        var temp = shorter;
        shorter = longer;
        longer = temp;
    }
    for (var i = 0; i < longer.length - shorter.length; i++) {
        shorter = "0" + shorter;
    }

    return [new ArbInt(shorter), new ArbInt(longer)];
}
ArbInt.prototype.compare = function (that) {
    if (this.isNeg() && that.isNeg()) {
        return -(this.neg().compare(that.neg()));
    } else if (this.isNeg()) {
        return -1;
    } else if (that.isNeg()) {
        return 1;
    }
    if (this.str.length > that.str.length) {
        return 1;
    }
    var x = ArbInt.trail(this, that)[0].str;
    var y = ArbInt.trail(this, that)[1].str;

    function cmpDigits(a, b) {
        if (a < b) {
            return -1;
        } else if (a === b) {
            return 0;
        } else {
            return 1;
        }
    }
    var result = false;
    var i = 0;
    for (var i = x.length - 1; i >= 0; i--) {
        var temp = cmpDigits(parseFloat(x.charAt(i)), parseFloat(y.charAt(i)));
        if (temp === 0 && i < x.length - 1) {
            continue;
        } else {
            result = temp;
        }

    }



    return result;
}
ArbInt.prototype.sub = function (that) {
    if (this.compare(that) === -1) {
        console.log(this, that);
        return that.sub(this).neg();
    }
    var number1 = ArbInt.trail(this, that)[1].str;
    var number2 = ArbInt.trail(this, that)[0].str;
    var result = [];
    var carry = 0;
    for (var i = number1.length-1; i >= 0; i--) {
        var newDigit = parseFloat(number1[i]) - parseFloat(number2[i]) + carry;
        if (newDigit >= 10) {
            carry = 1;
            newDigit -= 10;
        } else if (newDigit < 0) {
            carry = -1;
            newDigit += 10;
        } else {
            carry = 0;
        }
        result[i] = newDigit;
    }
    while(result[0] === 0) {
        result.shift();
    }
    return new ArbInt(result.join(""));
}


export { ArbInt };