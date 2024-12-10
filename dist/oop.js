"use strict";
class Customer {
    constructor(name, address) {
        this.name = name;
        this.address = address;
    }
}
class Order {
    constructor(customer, date, status) {
        this.orderDetails = [];
        this.payment = new Cash(0, 0);
        this.customer = customer;
        this.date = date;
        this.status = status;
    }
    calcSub() {
    }
    calcTax() {
    }
    calcTotal() {
    }
    calcTotalWeight() {
    }
    addOrderDetail(orderDetails) {
        this.orderDetails.push(orderDetails);
    }
    payOrder(payment) {
    }
}
class OrderDetail {
    constructor(quantity, taxStatus) {
        this.quantity = quantity;
        this.taxStatus = taxStatus;
    }
    calcSubTotal() {
    }
    calcWeight() {
    }
    calcTax() {
    }
}
class Item {
    constructor(shippingWeight, description) {
        this.shippingWeight = shippingWeight;
        this.description = description;
    }
    getPriceForQuantity() {
    }
    getTax() {
    }
    inStock() {
    }
}
class Payment {
    constructor(amount) {
        this.amount = amount;
    }
}
class Cash extends Payment {
    constructor(amount, cashTendered) {
        super(amount);
        this.cashTendered = cashTendered;
    }
}
class Check extends Payment {
    constructor(amount, name, bankID) {
        super(amount);
        this.name = name;
        this.bankID = bankID;
    }
    authorized() {
    }
}
class Credit extends Payment {
    constructor(amount, type, number, expDate) {
        super(amount);
        this.number = number;
        this.type = type;
        this.expDate = expDate;
    }
    authorized() {
    }
}