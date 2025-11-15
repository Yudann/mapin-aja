import { UMKM, Category, QuickFilter } from "@/types/umkm";

export const DUMMY_UMKMS: UMKM[] = [
  {
    id: "warung-kopi-kenangan",
    name: "Warung Kopi Kenangan",
    category: "Kafe & Minuman",
    description: "Kopi tradisional dengan rasa autentik dari biji pilihan. Kami menyajikan pengalaman ngopi yang hangat dan nyaman dengan suasana yang cozy.",
    address: "Jl. Sudirman No. 123, Jakarta Selatan",
    distance: 0.8,
    rating: 4.8,
    reviewCount: 127,
    isOpen: true,
    isVerified: true,
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=300&fit=crop&q=80",
    bannerImage: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&h=400&fit=crop&q=80",
    phone: "+62 812-3456-7890",
    responseTime: "Balas dalam 5 menit",
    openingHours: "06:00 - 22:00",
    priceRange: "Rp 15.000 - Rp 50.000",
    deliveryTime: "15-25 min",
    latitude: -6.2088,
    longitude: 106.8456,
    discount: "15%",
    taste: "300+ rating",
    portion: "200+ rating", 
    packaging: "150+ rating",
    isFavorite: false,
    products: [
      {
        id: "1",
        name: "Kopi Hitam Tradisional",
        description: "Kopi hitam murni dengan rasa robusta yang kuat",
        price: 15000,
        image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=300&h=300&fit=crop&q=80",
        isAvailable: true,
        category: "Kopi"
      },
      {
        id: "2", 
        name: "Kopi Susu Gula Aren",
        description: "Perpaduan kopi, susu, dan gula aren asli",
        price: 25000,
        image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=300&h=300&fit=crop&q=80",
        isAvailable: true,
        category: "Kopi"
      },
      {
        id: "3",
        name: "Es Kopi Kelapa",
        description: "Kopi dengan air kelapa muda segar",
        price: 30000,
        image: "https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=300&h=300&fit=crop&q=80",
        isAvailable: true,
        category: "Minuman"
      }
    ],
    reviews: [
      {
        id: "1",
        userName: "Budi Santoso",
        userAvatar: "https://ui-avatars.com/api/?name=Budi+Santoso&background=B99470&color=fff",
        rating: 5,
        date: "2 hari yang lalu",
        comment: "Kopinya enak banget! Rasanya autentik dan harganya terjangkau. Pelayanan juga cepat dan ramah.",
        images: [
          "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=200&h=200&fit=crop&q=80"
        ],
        helpful: 12
      },
      {
        id: "2",
        userName: "Siti Rahayu", 
        userAvatar: "https://ui-avatars.com/api/?name=Siti+Rahayu&background=3E2C23&color=fff",
        rating: 4,
        date: "1 minggu yang lalu",
        comment: "Tempatnya cozy banget buat nongkrong. Kopi susu gula arennya recommended!",
        helpful: 8
      }
    ],
    openingSchedules: [
      {
        day: "Senin - Jumat",
        hours: "06:00 - 22:00",
        isToday: true
      },
      {
        day: "Sabtu - Minggu", 
        hours: "07:00 - 23:00",
        isToday: false
      }
    ]
  },
  {
    id: "toko-kerajinan-batik-nusantara",
    name: "Toko Kerajinan Batik Nusantara",
    category: "Kerajinan",
    description: "Menjual berbagai macam kerajinan batik tangan asli dari berbagai daerah di Indonesia. Kualitas premium dengan motif tradisional yang autentik.",
    address: "Jl. Thamrin No. 45, Jakarta Pusat",
    distance: 1.2,
    rating: 4.9,
    reviewCount: 89,
    isOpen: true,
    isVerified: true,
    image: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=400&h=300&fit=crop&q=80",
    bannerImage: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=800&h=400&fit=crop&q=80",
    phone: "+62 813-4567-8901",
    responseTime: "Balas dalam 10 menit",
    openingHours: "09:00 - 20:00",
    priceRange: "Rp 50.000 - Rp 500.000",
    deliveryTime: "20-30 min",
    latitude: -6.1888,
    longitude: 106.8556,
    taste: "250+ rating",
    portion: "180+ rating",
    packaging: "220+ rating", 
    isFavorite: false,
    products: [
      {
        id: "1",
        name: "Batik Tulis Mega Mendung",
        description: "Batik tulis Cirebon dengan motif mega mendung",
        price: 350000,
        image: "https://images.unsplash.com/photo-1622404822108-e82d8b5934c1?w=300&h=300&fit=crop&q=80",
        isAvailable: true,
        category: "Batik"
      },
      {
        id: "2",
        name: "Sarung Batik Solo",
        description: "Sarung batik khas Solo dengan warna cerah",
        price: 150000,
        image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=300&h=300&fit=crop&q=80",
        isAvailable: true,
        category: "Batik"
      }
    ],
    reviews: [
      {
        id: "1",
        userName: "Ahmad Rizki",
        userAvatar: "https://ui-avatars.com/api/?name=Ahmad+Rizki&background=B99470&color=fff",
        rating: 5,
        date: "3 hari yang lalu", 
        comment: "Kualitas batiknya premium! Motifnya bagus dan bahannya nyaman dipakai. Recommended banget!",
        helpful: 15
      }
    ],
    openingSchedules: [
      {
        day: "Senin - Sabtu",
        hours: "09:00 - 20:00", 
        isToday: true
      },
      {
        day: "Minggu",
        hours: "10:00 - 17:00",
        isToday: false
      }
    ]
  },
  {
    id: "rumah-makan-padang-sederhana", 
    name: "Rumah Makan Padang Sederhana",
    category: "Kuliner",
    description: "Masakan Padang autentik dengan cita rasa asli Minang. Semua bahan dipilih yang terbaik dan dimasak dengan resep turun-temurun.",
    address: "Jl. Gatot Subroto No. 67, Jakarta Selatan",
    distance: 2.1,
    rating: 4.7,
    reviewCount: 234,
    isOpen: true,
    isVerified: true,
    image: "https://images.unsplash.com/photo-1606787366850-de6330128bfc?w=400&h=300&fit=crop&q=80",
    bannerImage: "https://images.unsplash.com/photo-1606787366850-de6330128bfc?w=800&h=400&fit=crop&q=80",
    phone: "+62 814-5678-9012",
    responseTime: "Balas dalam 8 menit",
    openingHours: "08:00 - 21:00", 
    priceRange: "Rp 25.000 - Rp 75.000",
    deliveryTime: "25-35 min",
    latitude: -6.1988,
    longitude: 106.8556,
    discount: "10%",
    taste: "400+ rating",
    portion: "350+ rating",
    packaging: "280+ rating",
    isFavorite: false,
    products: [
      {
        id: "1",
        name: "Nasi Padang Komplit",
        description: "Nasi dengan rendang, sayur nangka, dan sambal balado",
        price: 35000,
        image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=300&h=300&fit=crop&q=80",
        isAvailable: true,
        category: "Paket"
      },
      {
        id: "2",
        name: "Rendang Daging Sapi",
        description: "Rendang daging sapi asli Padang",
        price: 45000, 
        image: "https://images.unsplash.com/photo-1595777216776-ea790b18c696?w=300&h=300&fit=crop&q=80",
        isAvailable: true,
        category: "Lauk"
      }
    ],
    reviews: [
      {
        id: "1",
        userName: "Dewi Lestari",
        userAvatar: "https://ui-avatars.com/api/?name=Dewi+Lestari&background=3E2C23&color=fff",
        rating: 5,
        date: "1 hari yang lalu",
        comment: "Rendangnya empuk dan bumbunya meresap sempurna! Porsinya juga generous.",
        images: [
          "https://images.unsplash.com/photo-1606787366850-de6330128bfc?w=200&h=200&fit=crop&q=80"
        ],
        helpful: 20
      }
    ],
    openingSchedules: [
      {
        day: "Setiap Hari", 
        hours: "08:00 - 21:00",
        isToday: true
      }
    ]
  },
  {
    id: "barber-bros",
    name: "Barber Bros",
    category: "Kecantikan",
    description: "Barbershop modern dengan layanan premium dan barber berpengalaman. Tempat nyaman, wangi, dan pelayanan ramah.",
    address: "Jl. Ampera Raya No. 12, Jakarta Selatan",
    distance: 1.5,
    rating: 4.9,
    reviewCount: 142,
    isOpen: true,
    isVerified: true,
    image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=400&h=300&fit=crop&q=80",
    bannerImage: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=800&h=400&fit=crop&q=80",
    phone: "+62 812-9988-1122",
    responseTime: "Balas dalam 7 menit",
    openingHours: "10:00 - 22:00",
    priceRange: "Rp 30.000 - Rp 150.000",
    deliveryTime: "—",
    latitude: -6.2782,
    longitude: 106.8256,
    taste: "—",
    portion: "—",
    packaging: "—",
    isFavorite: false,
    products: [
      {
        id: "1",
        name: "Haircut Regular",
        description: "Potongan rambut standar dengan finishing rapi.",
        price: 30000,
        image: "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=300&h=300&fit=crop&q=80",
        isAvailable: true,
        category: "Servis"
      },
      {
        id: "2",
        name: "Premium Cut",
        description: "Haircut dengan konsultasi dan styling premium.",
        price: 60000,
        image: "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=300&h=300&fit=crop&q=80",
        isAvailable: true,
        category: "Servis"
      },
      {
        id: "3",
        name: "Shaving",
        description: "Cukur bersih dengan teknik profesional.",
        price: 25000,
        image: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=300&h=300&fit=crop&q=80",
        isAvailable: true,
        category: "Servis"
      },
      {
        id: "4",
        name: "Hair Coloring",
        description: "Pewarnaan rambut dengan bahan berkualitas.",
        price: 120000,
        image: "https://images.unsplash.com/photo-1562322140-8baeececf3df?w=300&h=300&fit=crop&q=80",
        isAvailable: true,
        category: "Pewarnaan"
      },
      {
        id: "5",
        name: "Creambath",
        description: "Perawatan rambut menyegarkan dan menutrisi.",
        price: 50000,
        image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=300&h=300&fit=crop&q=80",
        isAvailable: true,
        category: "Perawatan"
      }
    ],
    reviews: [
      {
        id: "1",
        userName: "Rama Putra",
        userAvatar: "https://ui-avatars.com/api/?name=Rama+Putra&background=B99470&color=fff",
        rating: 5,
        date: "3 hari yang lalu",
        comment: "Barbernya rapi banget motongnya, tempatnya juga wangi!",
        helpful: 14
      },
      {
        id: "2",
        userName: "Kevin Hartono",
        userAvatar: "https://ui-avatars.com/api/?name=Kevin+Hartono&background=3E2C23&color=fff",
        rating: 4,
        date: "1 minggu yang lalu",
        comment: "Premium cut-nya mantap, worth it banget.",
        helpful: 6
      }
    ],
    openingSchedules: [
      { day: "Senin - Minggu", hours: "10:00 - 22:00", isToday: true }
    ]
  },
  {
    id: "sweetly-bakery",
    name: "Sweetly Bakery",
    category: "Kuliner",
    description: "Toko roti rumahan dengan berbagai pilihan kue, roti, dan pastry segar setiap hari.",
    address: "Jl. Haji Nawi No. 27, Jakarta Selatan",
    distance: 0.9,
    rating: 4.8,
    reviewCount: 187,
    isOpen: true,
    isVerified: true,
    image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400&h=300&fit=crop&q=80",
    bannerImage: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=800&h=400&fit=crop&q=80",
    phone: "+62 811-5544-2200",
    responseTime: "Balas dalam 4 menit",
    openingHours: "07:00 - 20:00",
    priceRange: "Rp 10.000 - Rp 80.000",
    deliveryTime: "15-25 min",
    latitude: -6.2551,
    longitude: 106.8004,
    discount: "20%",
    taste: "500+ rating",
    portion: "300+ rating",
    packaging: "260+ rating",
    isFavorite: false,
    products: [
      {
        id: "1",
        name: "Croissant Butter",
        price: 20000,
        description: "Croissant fresh dengan butter melimpah.",
        image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=300&h=300&fit=crop&q=80",
        isAvailable: true,
        category: "Pastry"
      },
      {
        id: "2",
        name: "Chocolate Muffin",
        price: 18000,
        description: "Muffin coklat lembut dengan choco chips.",
        image: "https://images.unsplash.com/photo-1607958996333-41aef7caefaa?w=300&h=300&fit=crop&q=80",
        isAvailable: true,
        category: "Kue"
      },
      {
        id: "3",
        name: "Banana Bread",
        price: 22000,
        description: "Banana bread manis dan moist.",
        image: "https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=300&h=300&fit=crop&q=80",
        isAvailable: true,
        category: "Kue"
      },
      {
        id: "4",
        name: "Cheese Tart",
        price: 25000,
        description: "Tart keju creamy dengan crust renyah.",
        image: "https://images.unsplash.com/photo-1574085733277-851d9d856a3a?w=300&h=300&fit=crop&q=80",
        isAvailable: true,
        category: "Kue"
      },
      {
        id: "5",
        name: "Roti Sobek Coklat",
        price: 15000,
        description: "Roti sobek lembut dengan isian coklat.",
        image: "https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=300&h=300&fit=crop&q=80",
        isAvailable: true,
        category: "Roti"
      }
    ],
    reviews: [
      {
        id: "1",
        userName: "Lina Marlina",
        userAvatar: "https://ui-avatars.com/api/?name=Lina+Marlina&background=B99470&color=fff",
        rating: 5,
        date: "2 hari yang lalu",
        comment: "Croissant-nya enak banget, buttery dan flaky!",
        images: ["https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=200&h=200&fit=crop&q=80"],
        helpful: 19
      }
    ],
    openingSchedules: [
      { day: "Setiap Hari", hours: "07:00 - 20:00", isToday: true }
    ]
  },
];

export const CATEGORIES: Category[] = [
  {
    id: "kuliner",
    name: "Kuliner",
    icon: "Utensils",
    color: "from-[#B99470] to-[#3E2C23]",
  },
  {
    id: "kafe",
    name: "Kafe & Minuman",
    icon: "Coffee",
    color: "from-[#B99470] to-[#3E2C23]",
  },
  {
    id: "fashion",
    name: "Fashion",
    icon: "Shirt",
    color: "from-[#B99470] to-[#3E2C23]",
  },
  {
    id: "kerajinan",
    name: "Kerajinan",
    icon: "Palette",
    color: "from-[#B99470] to-[#3E2C23]",
  },
  {
    id: "kecantikan",
    name: "Kecantikan",
    icon: "Scissors",
    color: "from-[#B99470] to-[#3E2C23]",
  },
  {
    id: "servis",
    name: "Jasa Servis",
    icon: "Wrench",
    color: "from-[#B99470] to-[#3E2C23]",
  },
  {
    id: "olahraga",
    name: "Olahraga",
    icon: "Dumbbell",
    color: "from-[#B99470] to-[#3E2C23]",
  },
  {
    id: "belanja",
    name: "Belanja",
    icon: "ShoppingBag",
    color: "from-[#B99470] to-[#3E2C23]",
  },
];

export const QUICK_FILTERS: QuickFilter[] = [
  { id: "terdekat", label: "Terdekat", icon: "Navigation" },
  { id: "terlaris", label: "Terlaris", icon: "TrendingUp" },
  { id: "hemat", label: "Menu Hemat", icon: "Tag" },
  { id: "cepat", label: "Paling Cepat", icon: "Zap" },
  { id: "favorit", label: "Terfavorit", icon: "Heart" },
  { id: "buka", label: "Buka 24 Jam", icon: "Clock" },
];

export const CITIES = [
  "Jakarta", "Bandung", "Surabaya", "Medan", "Semarang", 
  "Makassar", "Palembang", "Tangerang", "Depok", "Bekasi", 
  "Yogyakarta", "Malang"
];