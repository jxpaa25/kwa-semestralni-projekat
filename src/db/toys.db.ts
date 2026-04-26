export interface Toy {
    toyId: number,
    name: string,
    permalink: string,
    description: string,
    targetGroup: "svi" | "dečak" | "devojčica",
    productionDate: string,
    price: number,
    imageUrl: string,
    ageGroup: AgeGroup,
    type: ToyType,
    reviews?: Review[]
}

export interface ToyType {
    typeId: number,
    name: string,
    description: string
}

export interface AgeGroup {
    ageGroupId: number,
    name: string,
    description: string
}

export interface Review {
    authorId: number;
    rating: number;
    comment: string;
    date: string;
}

export const ageGroups: AgeGroup[] = [
  {
    ageGroupId: 1,
    name: "0-2",
    description: "Bebe i mališani, igračke bez sitnih delova."
  },
  {
    ageGroupId: 2,
    name: "3-5",
    description: "Predškolci, razvoj fine motorike i kreativnosti."
  },
  {
    ageGroupId: 3,
    name: "6-9",
    description: "Školski uzrast, složenije i edukativne igračke."
  },
  {
    ageGroupId: 4,
    name: "10+",
    description: "Starija deca i tinejdžeri, složeniji setovi i društvene igre."
  }
]

export const toyTypes: ToyType[] = [
  {
    typeId: 1,
    name: "Slagalica",
    description: "Igračka koja razvija logiku i motoričke veštine."
  },
  {
    typeId: 2,
    name: "Slikovnica",
    description: "Ilustrovana knjiga namenjena najmlađima."
  },
  {
    typeId: 3,
    name: "Figura",
    description: "Plastična ili gumena figura omiljenih likova."
  },
  {
    typeId: 4,
    name: "Kreativni set",
    description: "Set za crtanje, bojenje i modelovanje."
  },
  {
    typeId: 5,
    name: "Vozilo",
    description: "Autići, kamioni i druga prevozna sredstva."
  },
  {
    typeId: 6,
    name: "Plišana igračka",
    description: "Meka igračka napravljena od tekstila."
  },
  {
    typeId: 7,
    name: "Društvena igra",
    description: "Zabava za celu porodicu uz pravila i timski rad."
  },
  {
    typeId: 8,
    name: "Konstruktorski set",
    description: "Set delova koji se sastavljaju u strukture."
  },
  {
    typeId: 9,
    name: "Muzička igračka",
    description: "Igračka koja proizvodi zvuke ili melodije."
  },
  {
    typeId: 10,
    name: "Edukativna igračka",
    description: "Igračka koja podstiče učenje i radoznalost."
  }
]

export const toys: Toy[] = [
  {
    toyId: 1,
    name: "Drvena slagalica životinje",
    permalink: "drvena-slagalica-zivotinje",
    description: "Edukativna drvena slagalica sa motivima životinja.",
    targetGroup: "svi",
    productionDate: "2024-03-10",
    price: 1499,
    imageUrl: "/img/1.png",
    ageGroup: {
      ageGroupId: 2,
      name: "3-5",
      description: "Predškolci, razvoj fine motorike i kreativnosti."
    },
    type: {
      typeId: 1,
      name: "Slagalica",
      description: "Igračka koja razvija logiku i motoričke veštine."
    },
    reviews: [
      {
        authorId: 1,
        rating: 5,
        comment: "Odlična drvena slagalica, deca su oduševljena motivima životinja!",
        date: "2024-03-15"
      },
      {
        authorId: 4,
        rating: 5,
        comment: "Još jedna recenzija za slagalicu - stvarno je odlična!",
        date: "2024-03-25"
      }
    ]
  },
  {
    toyId: 2,
    name: "Mala slikovnica boje",
    permalink: "mala-slikovnica-boje",
    description: "Slikovnica za učenje boja kroz slike i reči.",
    targetGroup: "svi",
    productionDate: "2023-11-15",
    price: 899,
    imageUrl: "/img/2.png",
    ageGroup: {
      ageGroupId: 1,
      name: "0-2",
      description: "Bebe i mališani, igračke bez sitnih delova."
    },
    type: {
      typeId: 2,
      name: "Slikovnica",
      description: "Ilustrovana knjiga namenjena najmlađima."
    },
    reviews: [
      {
        authorId: 2,
        rating: 4,
        comment: "Slikovnica je super za učenje boja, ali bi mogla imati više strana.",
        date: "2024-03-20"
      }
    ]
  },
  {
    toyId: 3,
    name: "Superheroj figura",
    permalink: "superheroj-figura",
    description: "Akciona figura popularnog superheroja od 15cm.",
    targetGroup: "dečak",
    productionDate: "2024-02-05",
    price: 1899,
    imageUrl: "/img/3.png",
    ageGroup: {
      ageGroupId: 3,
      name: "6-9",
      description: "Školski uzrast, složenije i edukativne igračke."
    },
    type: {
      typeId: 3,
      name: "Figura",
      description: "Plastična ili gumena figura omiljenih likova."
    },
    reviews: [
      {
        authorId: 3,
        rating: 5,
        comment: "Figura je veoma čvrsta i detaljna. Sin je prezadovoljan.",
        date: "2024-04-01"
      }
    ]
  },
  {
    toyId: 4,
    name: "Set za crtanje",
    permalink: "set-za-crtanje",
    description: "Komplet olovaka, flomastera i blokova za crtanje.",
    targetGroup: "svi",
    productionDate: "2023-10-22",
    price: 1199,
    imageUrl: "/img/4.png",
    ageGroup: {
      ageGroupId: 2,
      name: "3-5",
      description: "Predškolci, razvoj fine motorike i kreativnosti."
    },
    type: {
      typeId: 4,
      name: "Kreativni set",
      description: "Set za crtanje, bojenje i modelovanje."
    },
    reviews: [
      {
        authorId: 3,
        rating: 4,
        comment: "Dobar set za crtanje, flomasteri su intenzivnih boja.",
        date: "2023-11-05"
      }
    ]
  },
  {
    toyId: 5,
    name: "Vatrogasni kamion",
    permalink: "vatrogasni-kamion",
    description: "Metalni kamion sa rotacionim merdevinama.",
    targetGroup: "dečak",
    productionDate: "2024-04-01",
    price: 2299,
    imageUrl: "/img/5.png",
    ageGroup: {
      ageGroupId: 3,
      name: "6-9",
      description: "Školski uzrast, složenije i edukativne igračke."
    },
    type: {
      typeId: 5,
      name: "Vozilo",
      description: "Autići, kamioni i druga prevozna sredstva."
    },
    reviews: [
      {
        authorId: 4,
        rating: 5,
        comment: "Vatrogasni kamion je hit! Merdevine se rotiraju baš kao prave.",
        date: "2024-04-10"
      }
    ]
  },
  {
    toyId: 6,
    name: "Plišana panda",
    permalink: "plisana-panda",
    description: "Meka panda visine 25cm od kvalitetnog pamuka.",
    targetGroup: "devojčica",
    productionDate: "2024-01-30",
    price: 1599,
    imageUrl: "/img/6.png",
    ageGroup: {
      ageGroupId: 1,
      name: "0-2",
      description: "Bebe i mališani, igračke bez sitnih delova."
    },
    type: {
      typeId: 6,
      name: "Plišana igračka",
      description: "Meka igračka napravljena od tekstila."
    },
    reviews: [
      {
        authorId: 1,
        rating: 5,
        comment: "Panda je neverovatno mekana. Najbolja plišana igračka koju imamo.",
        date: "2024-02-15"
      }
    ]
  },
  {
    toyId: 7,
    name: "Monopol Junior",
    permalink: "monopol-junior",
    description: "Jednostavna verzija popularne društvene igre za mlađe.",
    targetGroup: "svi",
    productionDate: "2023-09-12",
    price: 3499,
    imageUrl: "/img/7.png",
    ageGroup: {
      ageGroupId: 4,
      name: "10+",
      description: "Starija deca i tinejdžeri, složeniji setovi i društvene igre."
    },
    type: {
      typeId: 7,
      name: "Društvena igra",
      description: "Zabava za celu porodicu uz pravila i timski rad."
    },
    reviews: [
      {
        authorId: 1,
        rating: 5,
        comment: "Monopol Junior je savršen za prve korake u društvenim igrama.",
        date: "2023-10-15"
      }
    ]
  },
  {
    toyId: 8,
    name: "LEGO Classic set",
    permalink: "lego-classic-set",
    description: "Konstruktorski set od 400 delova za slobodno građenje.",
    targetGroup: "svi",
    productionDate: "2024-05-20",
    price: 4999,
    imageUrl: "/img/8.png",
    ageGroup: {
      ageGroupId: 3,
      name: "6-9",
      description: "Školski uzrast, složenije i edukativne igračke."
    },
    type: {
      typeId: 8,
      name: "Konstruktorski set",
      description: "Set delova koji se sastavljaju u strukture."
    },
    reviews: [
      {
        authorId: 2,
        rating: 5,
        comment: "LEGO je klasika, uvek najbolji izbor za kreativnu igru.",
        date: "2024-05-25"
      }
    ]
  },
  {
    toyId: 9,
    name: "Muzički bubanj",
    permalink: "muzicki-bubanj",
    description: "Interaktivni bubanj sa svetlosnim efektima i melodijama.",
    targetGroup: "svi",
    productionDate: "2023-12-08",
    price: 2199,
    imageUrl: "/img/9.png",
    ageGroup: {
      ageGroupId: 2,
      name: "3-5",
      description: "Predškolci, razvoj fine motorike i kreativnosti."
    },
    type: {
      typeId: 9,
      name: "Muzička igračka",
      description: "Igračka koja proizvodi zvuke ili melodije."
    },
    reviews: [
      {
        authorId: 2,
        rating: 4,
        comment: "Bubanj je zabavan, mada roditelji trebaju čepiće za uši! :)",
        date: "2024-01-10"
      }
    ]
  },
  {
    toyId: 10,
    name: "Pametni globus",
    permalink: "pametni-globus",
    description: "Edukativni globus koji govori činjenice o državama.",
    targetGroup: "svi",
    productionDate: "2024-06-25",
    price: 6799,
    imageUrl: "/img/10.png",
    ageGroup: {
      ageGroupId: 4,
      name: "10+",
      description: "Starija deca i tinejdžeri, složeniji setovi i društvene igre."
    },
    type: {
      typeId: 10,
      name: "Edukativna igračka",
      description: "Igračka koja podstiče učenje i radoznalost."
    },
    reviews: [
      {
        authorId: 3,
        rating: 4,
        comment: "Globus je veoma poučan, mada je zvuk mogao biti malo glasniji.",
        date: "2024-07-01"
      }
    ]
  },
  {
    toyId: 11,
    name: "Drvena abeceda",
    permalink: "drvena-abeceda",
    description: "Slagalica sa slovima abecede za učenje slova.",
    targetGroup: "svi",
    productionDate: "2024-01-10",
    price: 1299,
    imageUrl: "/img/11.png",
    ageGroup: {
      ageGroupId: 2,
      name: "3-5",
      description: "Predškolci, razvoj fine motorike i kreativnosti."
    },
    type: {
      typeId: 1,
      name: "Slagalica",
      description: "Igračka koja razvija logiku i motoričke veštine."
    },
    reviews: []
  },
  {
    toyId: 12,
    name: "Slikovnica životinje",
    permalink: "slikovnica-zivotinje",
    description: "Knjiga sa fotografijama domaćih i divljih životinja.",
    targetGroup: "svi",
    productionDate: "2023-08-05",
    price: 799,
    imageUrl: "/img/12.png",
    ageGroup: {
      ageGroupId: 1,
      name: "0-2",
      description: "Bebe i mališani, igračke bez sitnih delova."
    },
    type: {
      typeId: 2,
      name: "Slikovnica",
      description: "Ilustrovana knjiga namenjena najmlađima."
    },
    reviews: [
      {
        authorId: 3,
        rating: 5,
        comment: "Divne slike životinja, deca uživaju listajući je.",
        date: "2023-08-20"
      }
    ]
  },
  {
    toyId: 13,
    name: "Figura dinosaurusa",
    permalink: "figura-dinosaurusa",
    description: "Realistična figura T-Rexa od čvrste plastike.",
    targetGroup: "dečak",
    productionDate: "2023-12-12",
    price: 1799,
    imageUrl: "/img/13.png",
    ageGroup: {
      ageGroupId: 3,
      name: "6-9",
      description: "Školski uzrast, složenije i edukativne igračke."
    },
    type: {
      typeId: 3,
      name: "Figura",
      description: "Plastična ili gumena figura omiljenih likova."
    },
    reviews: [
      {
        authorId: 4,
        rating: 5,
        comment: "Dinosaurus izgleda veoma realistično. Odličan kvalitet plastike.",
        date: "2023-12-20"
      }
    ]
  },
  {
    toyId: 14,
    name: "Kreativni set za modelovanje",
    permalink: "kreativni-set-modelovanje",
    description: "Set sa glinom i kalupima za pravljenje oblika.",
    targetGroup: "svi",
    productionDate: "2024-02-25",
    price: 1499,
    imageUrl: "/img/14.png",
    ageGroup: {
      ageGroupId: 2,
      name: "3-5",
      description: "Predškolci, razvoj fine motorike i kreativnosti."
    },
    type: {
      typeId: 4,
      name: "Kreativni set",
      description: "Set za crtanje, bojenje i modelovanje."
    },
    reviews: []
  },
  {
    toyId: 15,
    name: "Traktor sa prikolicom",
    permalink: "traktor-sa-prikolicom",
    description: "Traktor od metala i plastike sa pomičnim delovima.",
    targetGroup: "dečak",
    productionDate: "2024-03-14",
    price: 1999,
    imageUrl: "/img/15.png",
    ageGroup: {
      ageGroupId: 3,
      name: "6-9",
      description: "Školski uzrast, složenije i edukativne igračke."
    },
    type: {
      typeId: 5,
      name: "Vozilo",
      description: "Autići, kamioni i druga prevozna sredstva."
    },
    reviews: [
      {
        authorId: 1,
        rating: 4,
        comment: "Traktor je dobar, ali prikolica se ponekad lako otkači.",
        date: "2024-04-05"
      }
    ]
  },
  {
    toyId: 16,
    name: "Plišana jednorog",
    permalink: "plisana-jednorog",
    description: "Šarena plišana jednorog igračka sa šljokicama.",
    targetGroup: "devojčica",
    productionDate: "2023-09-19",
    price: 1699,
    imageUrl: "/img/16.png",
    ageGroup: {
      ageGroupId: 1,
      name: "0-2",
      description: "Bebe i mališani, igračke bez sitnih delova."
    },
    type: {
      typeId: 6,
      name: "Plišana igračka",
      description: "Meka igračka napravljena od tekstila."
    },
    reviews: []
  },
  {
    toyId: 17,
    name: "Igra “Čoveče ne ljuti se”",
    permalink: "covecene-ljuti-se",
    description: "Klasična društvena igra za celu porodicu.",
    targetGroup: "svi",
    productionDate: "2023-10-01",
    price: 1299,
    imageUrl: "/img/17.png",
    ageGroup: {
      ageGroupId: 4,
      name: "10+",
      description: "Starija deca i tinejdžeri, složeniji setovi i društvene igre."
    },
    type: {
      typeId: 7,
      name: "Društvena igra",
      description: "Zabava za celu porodicu uz pravila i timski rad."
    },
    reviews: []
  },
  {
    toyId: 18,
    name: "LEGO City policijska stanica",
    permalink: "lego-city-policijska-stanica",
    description: "LEGO set sa vozilima i figuricama policajaca.",
    targetGroup: "dečak",
    productionDate: "2024-07-15",
    price: 6999,
    imageUrl: "/img/18.png",
    ageGroup: {
      ageGroupId: 4,
      name: "10+",
      description: "Starija deca i tinejdžeri, složeniji setovi i društvene igre."
    },
    type: {
      typeId: 8,
      name: "Konstruktorski set",
      description: "Set delova koji se sastavljaju u strukture."
    },
    reviews: [
      {
        authorId: 2,
        rating: 5,
        comment: "Policijska stanica je sjajan set, sati zabave za decu.",
        date: "2024-07-20"
      }
    ]
  },
  {
    toyId: 19,
    name: "Dečiji klavir",
    permalink: "deciji-klavir",
    description: "Mini elektronski klavir sa 20 dirki i melodijama.",
    targetGroup: "devojčica",
    productionDate: "2024-01-09",
    price: 2899,
    imageUrl: "/img/19.png",
    ageGroup: {
      ageGroupId: 2,
      name: "3-5",
      description: "Predškolci, razvoj fine motorike i kreativnosti."
    },
    type: {
      typeId: 9,
      name: "Muzička igračka",
      description: "Igračka koja proizvodi zvuke ili melodije."
    },
    reviews: [
      {
        authorId: 4,
        rating: 5,
        comment: "Klavir je prelep, ćerka ga ne ispušta iz ruku.",
        date: "2024-02-01"
      }
    ]
  },
  {
    toyId: 20,
    name: "Edukativni mikroskop",
    permalink: "edukativni-mikroskop",
    description: "Set sa mikroskopom i uzorcima za decu.",
    targetGroup: "svi",
    productionDate: "2024-06-05",
    price: 4999,
    imageUrl: "/img/20.png",
    ageGroup: {
      ageGroupId: 4,
      name: "10+",
      description: "Starija deca i tinejdžeri, složeniji setovi i društvene igre."
    },
    type: {
      typeId: 10,
      name: "Edukativna igračka",
      description: "Igračka koja podstiče učenje i radoznalost."
    },
    reviews: [
      {
        authorId: 3,
        rating: 5,
        comment: "Mikroskop je odličan za male istraživače. Uzorci su zanimljivi.",
        date: "2024-06-15"
      }
    ]
  },
  {
    toyId: 21,
    name: "Slagalica vozila",
    permalink: "slagalica-vozila",
    description: "Drvena slagalica sa motivima automobila i kamiona.",
    targetGroup: "dečak",
    productionDate: "2024-05-05",
    price: 1299,
    imageUrl: "/img/21.png",
    ageGroup: {
      ageGroupId: 2,
      name: "3-5",
      description: "Predškolci, razvoj fine motorike i kreativnosti."
    },
    type: {
      typeId: 1,
      name: "Slagalica",
      description: "Igračka koja razvija logiku i motoričke veštine."
    },
    reviews: []
  },
  {
    toyId: 22,
    name: "Slikovnica brojevi",
    permalink: "slikovnica-brojevi",
    description: "Slikovnica za učenje brojeva kroz slike i zadatke.",
    targetGroup: "svi",
    productionDate: "2023-07-28",
    price: 899,
    imageUrl: "/img/22.png",
    ageGroup: {
      ageGroupId: 1,
      name: "0-2",
      description: "Bebe i mališani, igračke bez sitnih delova."
    },
    type: {
      typeId: 2,
      name: "Slikovnica",
      description: "Ilustrovana knjiga namenjena najmlađima."
    },
    reviews: []
  },
  {
    toyId: 23,
    name: "Figura princeze",
    permalink: "figura-princeze",
    description: "Elegantna figura princeze u haljini.",
    targetGroup: "devojčica",
    productionDate: "2024-02-22",
    price: 1699,
    imageUrl: "/img/23.png",
    ageGroup: {
      ageGroupId: 3,
      name: "6-9",
      description: "Školski uzrast, složenije i edukativne igračke."
    },
    type: {
      typeId: 3,
      name: "Figura",
      description: "Plastična ili gumena figura omiljenih likova."
    },
    reviews: []
  },
  {
    toyId: 24,
    name: "Set za bojenje",
    permalink: "set-za-bojenje",
    description: "Komplet bojica, flomastera i svezaka za bojenje.",
    targetGroup: "svi",
    productionDate: "2023-10-15",
    price: 1099,
    imageUrl: "/img/24.png",
    ageGroup: {
      ageGroupId: 2,
      name: "3-5",
      description: "Predškolci, razvoj fine motorike i kreativnosti."
    },
    type: {
      typeId: 4,
      name: "Kreativni set",
      description: "Set za crtanje, bojenje i modelovanje."
    },
    reviews: []
  },
  {
    toyId: 25,
    name: "Sportski automobil",
    permalink: "sportski-automobil",
    description: "Metalni model sportskog auta sa otvaranjem vrata.",
    targetGroup: "dečak",
    productionDate: "2024-04-22",
    price: 2599,
    imageUrl: "/img/25.png",
    ageGroup: {
      ageGroupId: 3,
      name: "6-9",
      description: "Školski uzrast, složenije i edukativne igračke."
    },
    type: {
      typeId: 5,
      name: "Vozilo",
      description: "Autići, kamioni i druga prevozna sredstva."
    },
    reviews: [
      {
        authorId: 4,
        rating: 5,
        comment: "Automobil je veoma brz i vrata se lako otvaraju. Super igračka.",
        date: "2024-05-01"
      }
    ]
  },
  {
    toyId: 26,
    name: "Plišana mačka",
    permalink: "plisana-macka",
    description: "Meka plišana mačka koja prede kada se pritisne.",
    targetGroup: "devojčica",
    productionDate: "2023-11-11",
    price: 1799,
    imageUrl: "/img/26.png",
    ageGroup: {
      ageGroupId: 1,
      name: "0-2",
      description: "Bebe i mališani, igračke bez sitnih delova."
    },
    type: {
      typeId: 6,
      name: "Plišana igračka",
      description: "Meka igračka napravljena od tekstila."
    },
    reviews: []
  },
  {
    toyId: 27,
    name: "Igra memorije",
    permalink: "igra-memorije",
    description: "Društvena igra sa karticama za vežbanje pamćenja.",
    targetGroup: "svi",
    productionDate: "2024-01-04",
    price: 999,
    imageUrl: "/img/27.png",
    ageGroup: {
      ageGroupId: 2,
      name: "3-5",
      description: "Predškolci, razvoj fine motorike i kreativnosti."
    },
    type: {
      typeId: 7,
      name: "Društvena igra",
      description: "Zabava za celu porodicu uz pravila i timski rad."
    },
    reviews: []
  },
  {
    toyId: 28,
    name: "Konstruktorski set “Grad”",
    permalink: "konstruktorski-set-grad",
    description: "Set od 500 delova za izgradnju grada.",
    targetGroup: "svi",
    productionDate: "2024-07-02",
    price: 5999,
    imageUrl: "/img/28.png",
    ageGroup: {
      ageGroupId: 4,
      name: "10+",
      description: "Starija deca i tinejdžeri, složeniji setovi i društvene igre."
    },
    type: {
      typeId: 8,
      name: "Konstruktorski set",
      description: "Set delova koji se sastavljaju u strukture."
    },
    reviews: [
      {
        authorId: 1,
        rating: 5,
        comment: "Set 'Grad' nudi beskrajne mogućnosti za građenje. Preporučujem!",
        date: "2024-07-10"
      }
    ]
  },
  {
    toyId: 29,
    name: "Muzički tamburina",
    permalink: "muzicki-tamburina",
    description: "Instrument za decu sa šarenim zvečkama.",
    targetGroup: "svi",
    productionDate: "2024-03-20",
    price: 1499,
    imageUrl: "/img/29.png",
    ageGroup: {
      ageGroupId: 2,
      name: "3-5",
      description: "Predškolci, razvoj fine motorike i kreativnosti."
    },
    type: {
      typeId: 9,
      name: "Muzička igračka",
      description: "Igračka koja proizvodi zvuke ili melodije."
    },
    reviews: []
  },
  {
    toyId: 30,
    name: "Edukativni tablet za decu",
    permalink: "edukativni-tablet",
    description: "Tablet igračka sa učenjem slova i brojeva.",
    targetGroup: "svi",
    productionDate: "2024-08-01",
    price: 3999,
    imageUrl: "/img/30.png",
    ageGroup: {
      ageGroupId: 3,
      name: "6-9",
      description: "Školski uzrast, složenije i edukativne igračke."
    },
    type: {
      typeId: 10,
      name: "Edukativna igračka",
      description: "Igračka koja podstiče učenje i radoznalost."
    },
    reviews: [
      {
        authorId: 2,
        rating: 3,
        comment: "Edukativni tablet je OK, ali baterije se brzo troše.",
        date: "2024-08-10"
      }
    ]
  }
]