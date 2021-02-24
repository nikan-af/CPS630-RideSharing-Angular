export class User {
    public id: number;
    public pwd:string;
    public email:string;
    public fullName: string;
    public phoneNumber: string;
    public address: string;
    public postal: string;
    public balance: number;
    
    constructor (id:number,pwd:string,email:string, fullName:string, phoneNumber: string, address: string, postal: string, balance: number) {
      this.id = id;
      this.pwd = pwd;
      this.email = email;
      this.fullName = fullName;
      this.phoneNumber = phoneNumber;
      this.address = address;
      this.postal = postal;
      this.balance = balance;
    }
}