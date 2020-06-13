interface Menu {
  name: string;
  price: number;
}

interface MenuDisplay {
  drink: Menu[];
  food: Menu[];
}

interface Company {
  _id: null | string;
  name: string;
  location: string;
  phone: string;
  price: object;
  menuDisplay: MenuDisplay;
}


interface Order {
  name: string;
  quantity: number;
}

interface Service {
  name: string;
}

interface Bill {
  _id: string | null;
  companyID: string;
  date: Date;
  people: number;
  representative: string;
  order: Order[];
  service: Service[];
  memo: string;
  total: number
  isPaid: number;
  isDeleted: number;
}

interface Form {
  date: Date;
  people: number;
  representative: string;
  order: Order[];
  service: Service[];
  memo: string;
  total: number;
}