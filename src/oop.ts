
class Customer {
    private name:string;
    private address:string;


    constructor(name:string, address:string){
        this.name = name;
        this.address = address;
    }
        public getInfo():string{
        return "Name: "+ this.name + "\nAddress: "+ this.address;
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

    public calcSubtotal(){
        let subtotal = 0;
;        for(let i = 0; i < this.orderDetails.length; i++){
            subtotal = this.orderDetails[i].calcSubTotal()
        }
        return subtotal;
    }



    public calcTax(){
        let vat = 0;
        for(let i =0; i < this.orderDetails.length; i++){
            vat = vat +this.orderDetails[i].calcTax();
        }
        return vat;
    }

    public calcTotal():number {
        return this.calcSubtotal() + this.calcTax();

    }


    public calcTotalWeight(){
        let weight = 0;
        for(let i =0; i < this.orderDetails.length; i++){
            weight = weight +this.orderDetails[i].calcWeight();
        }
    }
    public addOrderDetail(orderDetails: OrderDetail){
        this.orderDetails.push(orderDetails)
    }
    public payOrder(payment: Payment){
        this.payment=payment
    }

    public getPayment(){
        return this.payment;
    }
    public printOrderDetail():void{
        for(let i = 0; i< this.orderDetails.length;i++){
        this.orderDetails[i].printDetail();
    }
}
}

class OrderDetail{
    private quantity:number;
    private taxStatus:string;
    private item: Item;


    constructor(item:Item ,quantity:number, taxStatus:string){
        this.item = item;
        this.quantity = quantity;
        this.taxStatus = taxStatus; 
        
    }
    
    public calcSubTotal(){
        return this.quantity*this.item.getPriceForQuantity();
        
    }

    public calcWeight(){
        return this.quantity * this.item.getShippingWeight();
    }

    public calcTax(){
        if(this.taxStatus === "not included"){
            return this.item.getTax() * this.item.getTax() ;
        }
        return 0;
    }

    public printDetail():void {
        console.log(this.item.getName()+ "\t"+this.quantity +"  (ชิ้น)\t"+this.calcSubTotal()+"฿");
    }
}

class Item {
    private shippingWeight: number;
    private description: string;
    private price:number;

    constructor(shippingWeight: number,description:string, price:number){
        this.shippingWeight = shippingWeight;
        this.price = price;
        this.description = description;
    }

    public getPriceForQuantity(){
        return this.price;
    }

    public getTax(){   
        return this.price * 0.07;
    }

    public inStock(){
        return true;
    }

     public getInfo():string{
        return "Name:"+ this.description+", Price:"+this.price +"฿, Weigth:"+this.shippingWeight+" kg.";
    }


    public getShippingWeight(){
        return this.shippingWeight;
    }

    public getName(){
        return this.description;
    }
}

abstract class Payment {
    public amount:number;

    constructor (amount:number){
        this.amount = amount;
    }
    public getAmount():number{
        return this.amount;
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

class Cash extends Payment{
    public cashTendered: number;

    constructor(amount:number ,cashTendered: number){
        super(amount);
        this.cashTendered = cashTendered;
    }
public getChange():number{
    return this.cashTendered - this.getAmount();
  }
  public getCashTendered(): number{
    return this.cashTendered;
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



  //create objects

  //customer
  const customer = new Customer("Mr.Choke Dee","85 Malaiman road, Nakornpathom")
  console.log(customer.getInfo());

  //Items

  const item1 = new Item(1.5,  "Lotus water",15);
  console.log(item1.getInfo())
  const item2 = new Item(0.05,"Lays",30,);
  console.log(item2.getInfo())
  const item3 = new Item(0.6,"mama",15,);
  console.log(item3.getInfo())

  //order 
  const order1 = new Order(customer,"16/12/2567", "in progress");

  //Order Detail

  const orderdetail1 = new OrderDetail(item1,1, "not included")

  const orderdetail2 = new OrderDetail(item2,2, "not included")

   const orderdetail3 = new OrderDetail(item3,500, "not included")

  //OrderDetail => Order

  order1.addOrderDetail(orderdetail1);
  order1.addOrderDetail(orderdetail2);
  order1.addOrderDetail(orderdetail3);


  let amount = order1.calcTotal();
  const cash = new Cash(amount, 1000000)

  order1.payOrder(cash);


  console.log("#################### Order ####################")
console.log(order1.printOrderDetail())
console.log("vat =" + order1.calcTax())
console.log("total =" + order1.calcSubtotal())
console.log("recive =" + (order1.getPayment()as Cash).getCashTendered());
 console.log("Change: " +  (order1.getPayment()as Cash).getChange());
  console.log(customer.getInfo());
   console.log("#################### Order ####################")