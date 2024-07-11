export interface users { 
    address: { 
      street: string, 
      suite: string, 
      city: string, 
      zipcode: string, 
      geo: object 
    }
    company:{  
      name: string, 
      catchPhrase: string, 
      bs: string 
    }
    email: string
    id: number
    name: string
    phone: string
    username: string
    website: string
  }