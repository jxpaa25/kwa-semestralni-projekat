export interface User {
    id?: number;
    ime: string;
    prezime: string;
    email: string;
    telefon: string;
    adresa: string;
    omiljeneVrsteIgracaka: string[];
    password?: string;
}

export const users: User[] = [
    {
      id: 1,
      ime: "Petar",
      prezime: "Petrovic",
      email: "petar@petrovic.com",
      telefon: "+381098765432",
      adresa: "CBA 321",
      omiljeneVrsteIgracaka: ["Slagalica", "Slikovnica", "Figura", "Kreativni set", "Vozilo", "Plišana igračka", "Društvena igra", "Konstruktorski set"],
      password: "petar123"
    },
    {
      id: 2,
      ime: "Jovan",
      prezime: "Jovanovic",
      email: "jovan@jovanovic.com",
      telefon: "+381069555333",
      adresa: "AAA 111",
      omiljeneVrsteIgracaka: ["Slagalica", "Slikovnica", "Figura", "Kreativni set", "Vozilo", "Plišana igračka", "Društvena igra", "Konstruktorski set"],
      password: "jovan123"
    },
    {
      id: 3,
      ime: "Marko",
      prezime: "Markovic",
      email: "marko@markovic.com",
      telefon: "+38169123456",
      adresa: "BBB 222",
      omiljeneVrsteIgracaka: ["Slagalica", "Slikovnica", "Figura", "Kreativni set", "Vozilo", "Plišana igračka", "Društvena igra", "Konstruktorski set"],
      password: "marko123"
    },
    {
      id: 4,
      ime: "Stefan",
      prezime: "Stefanovic",
      email: "stefan@stefanovic.com",
      telefon: "+38169654321",
      adresa: "CCC 333",
      omiljeneVrsteIgracaka: ["Slagalica", "Slikovnica", "Figura", "Kreativni set", "Vozilo", "Plišana igračka", "Društvena igra", "Konstruktorski set"],
      password: "stefan123"
    }
]