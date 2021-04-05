import { Timestamp } from 'rxjs/internal/operators/timestamp';

export interface User {
    UserId: number;
    Password: string;
    Email: string;
    Name: string;
    Tel: string;
    Address: string;
    CityCode: string;
    Balance: number;
    isAdmin: number;
}

export interface Order {
    UserId: number;
    Products?: Product[];
    Car?: Car;
    PickupTime: string;
    PickupDate: string;
    OrderTotal: string;
    DeliveryFee?: string;
    Distance: string;
    Duration: string;
    StartAddress: string;
    EndAddress: string;
    StartLocationLat: number;
    StartLocationLng: number;
    EndLocationLat: number;
    EndLocationLng: number;
    Direction: any;
    OrderType: string;
}

export interface Trip {
    TripId: number;
    OrderId: number;
    CarId?: number;
    Distance: string;
    Duration: string;
    EndAddress: string;
    StartAddress: string;
    EndLocationLat: number;
    EndLocationLng: number;
    StartLocationLat: number;
    StartLocationLng: number;
}

export interface Payment {
    PaymentId: number;
    CardHolder: string;
    CardHolderFirstName: string;
    CardHolderLastName: string;
    CardNumber: string;
    ExpiryYear: string;
    ExpiryMonth: string;
    PostalCode: string;
    CardAddressLine1: string;
    CardAddressLine2: string;
    City: string;
    Country: string;
    StateOrProvince: string;
}

export interface Car {
    CarId: number;
    ImageURL: string;
    CarModel: string;
    CarColour: string;
}

export interface Product {
    ProductId: string;
    ProductType: string;
    Name: string;
    Price: string;
    ImageURL: string;
    Qty: number;
    Size: string;
}

export interface ProductDialogData {
    ProductId: string;
    ProductType: string;
    Name: string;
    Price: string;
    ImageURL: string;
}

export interface UpdateDialogData {
    tblName: string;
    primaryKey: string;
    formData: [any];
    operationType: string;
}

export interface UserInquiry {
    InquiryId: number;
    FName: string;
    LName: string;
    Email: string;
    TypeOfInquiry: string;
    Message: string;
}

export interface Review {
    FirstName: string;
    LastName: string;
    Message: string;
    Rating: number;
    ServiceType: string;
    Timestamp: string;
}