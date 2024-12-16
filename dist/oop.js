"use strict";
class Customer {
    constructor(name, address) {
        this.name = name;
        this.address = address;
    }
    getInfo() {
        return "Name: " + this.name + "\nAddress: " + this.address;
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
    calcSubtotal() {
        let subtotal = 0;
        ;
        for (let i = 0; i < this.orderDetails.length; i++) {
            subtotal = this.orderDetails[i].calcSubTotal();
        }
        return subtotal;
    }
    calcTax() {
        let vat = 0;
        for (let i = 0; i < this.orderDetails.length; i++) {
            vat = vat + this.orderDetails[i].calcTax();
        }
        return vat;
    }
    calcTotal() {
        return this.calcSubtotal() + this.calcTax();
    }
    calcTotalWeight() {
        let weight = 0;
        for (let i = 0; i < this.orderDetails.length; i++) {
            weight = weight + this.orderDetails[i].calcWeight();
        }
    }
    addOrderDetail(orderDetails) {
        this.orderDetails.push(orderDetails);
    }
    payOrder(payment) {
        this.payment = payment;
    }
    getPayment() {
        return this.payment;
    }
    printOrderDetail() {
        for (let i = 0; i < this.orderDetails.length; i++) {
            this.orderDetails[i].printDetail();
        }
    }
}
class OrderDetail {
    constructor(item, quantity, taxStatus) {
        this.item = item;
        this.quantity = quantity;
        this.taxStatus = taxStatus;
    }
    calcSubTotal() {
        return this.quantity * this.item.getPriceForQuantity();
    }
    calcWeight() {
        return this.quantity * this.item.getShippingWeight();
    }
    calcTax() {
        if (this.taxStatus === "not included") {
            return this.item.getTax() * this.item.getTax();
        }
        return 0;
    }
    printDetail() {
        console.log(this.item.getName() + "\t" + this.quantity + "  (ชิ้น)\t" + this.calcSubTotal() + "฿");
    }
}
class Item {
    constructor(shippingWeight, description, price) {
        this.shippingWeight = shippingWeight;
        this.price = price;
        this.description = description;
    }
    getPriceForQuantity() {
        return this.price;
    }
    getTax() {
        return this.price * 0.07;
    }
    inStock() {
        return true;
    }
    getInfo() {
        return "Name:" + this.description + ", Price:" + this.price + "฿, Weigth:" + this.shippingWeight + " kg.";
    }
    getShippingWeight() {
        return this.shippingWeight;
    }
    getName() {
        return this.description;
    }
}
class Payment {
    constructor(amount) {
        this.amount = amount;
    }
    getAmount() {
        return this.amount;
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
class Cash extends Payment {
    constructor(amount, cashTendered) {
        super(amount);
        this.cashTendered = cashTendered;
    }
    getChange() {
        return this.cashTendered - this.getAmount();
    }
    getCashTendered() {
        return this.cashTendered;
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
//create objects
//customer
const customer = new Customer("Mr.Choke Dee", "85 Malaiman road, Nakornpathom");
console.log(customer.getInfo());
//Items
const item1 = new Item(1.5, "Lotus water", 15);
console.log(item1.getInfo());
const item2 = new Item(0.05, "Lays", 30);
console.log(item2.getInfo());
const item3 = new Item(0.6, "mama", 15);
console.log(item3.getInfo());
//order 
const order1 = new Order(customer, "16/12/2567", "in progress");
//Order Detail
const orderdetail1 = new OrderDetail(item1, 1, "not included");
const orderdetail2 = new OrderDetail(item2, 2, "not included");
const orderdetail3 = new OrderDetail(item3, 500, "not included");
//OrderDetail => Order
order1.addOrderDetail(orderdetail1);
order1.addOrderDetail(orderdetail2);
order1.addOrderDetail(orderdetail3);
let amount = order1.calcTotal();
const cash = new Cash(amount, 1000000);
order1.payOrder(cash);
console.log("#################### Order ####################");
console.log(order1.printOrderDetail());
console.log("vat =" + order1.calcTax());
console.log("total =" + order1.calcSubtotal());
console.log("recive =" + order1.getPayment().getCashTendered());
console.log("Change: " + order1.getPayment().getChange());
console.log(customer.getInfo());
console.log("#################### Order ####################");
