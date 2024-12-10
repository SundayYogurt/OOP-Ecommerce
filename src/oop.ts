
class Customer {
    private name:string;
    private address:string;

    constructor(name:string, address:string){
        this.name = name;
        this.address = address;
    }
}

class Order {
    private orderDetails:OrderDetail[] = [];
    private customer:Customer;
    private payment:Payment= new Cash (0,0)
    private date:string;
    private status:string;

    constructor(customer:Customer,date:string,status:string){
        this.customer = customer;
        this.date = date;
        this.status = status;
    }

    public calcSub(){

    }

    public calcTax(){

    }

    public calcTotal(){

    }

    public calcTotalWeight(){

    }
    public addOrderDetail(orderDetails: OrderDetail){
        this.orderDetails.push(orderDetails)
    }
    public payOrder(payment: Payment){
        
    }
}


class OrderDetail{
    private quantity:number;
    private taxStatus:string;

    constructor(quantity:number, taxStatus:string){
        this.quantity = quantity;
        this.taxStatus = taxStatus; 
        
    }
    
    public calcSubTotal(){
  
    }

    public calcWeight(){

    }

    public calcTax(){
        
    }
}

class Item {
    private shippingWeight: number;
    private description: string;

    constructor(shippingWeight:number, description: string){
        this.shippingWeight = shippingWeight;
        this.description =description;
    }

    public getPriceForQuantity(){

    }

    public getTax(){

    }

    public inStock(){

    }
}

class Payment {
    public amount:number;

    constructor (amount:number){
        this.amount = amount;
    }
}

class Cash extends Payment{
    public cashTendered: number;

    constructor(amount:number ,cashTendered: number){
        super(amount);
        this.cashTendered = cashTendered;
    }
}

class Check extends Payment{
    public name:string;
    public bankID:string;

    constructor(amount:number ,name:string, bankID:string){
        super(amount);
        this.name = name;
        this.bankID = bankID;
    }
    public authorized(){
    }
  }

class Credit extends Payment{
    public number:string;
    public type:string;
    public expDate:string;

    constructor(amount:number , type:string,number:string, expDate:string){
        super(amount);
        this.number = number;
        this.type = type;
        this.expDate = expDate
    }
    public authorized(){
    }
  }
