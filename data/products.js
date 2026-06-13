const products = [
  {
    id: "beats-solo-air",
    name: "Beats Solo Air",
    category: "Wireless headphones",
    price: 99,
    currency: "USD",
    description:
      "Lightweight wireless headphones for everyday listening, commuting, and calls.",
    image: "/images/beats-solo-air.png",
    color: "#e63946",
    features: [
      "Wireless Bluetooth connection",
      "Built-in microphone",
      "Lightweight on-ear design",
      "20-hour battery life",
    ],
    useCases: ["commuting", "calls", "everyday listening"],
    batteryLifeHours: 20,
    noiseCancellation: false,
    hasMicrophone: true,
    recommendationAngle:
      "Best for everyday lightweight listening and calls at a budget-friendly price.",
    variants: [
      { color: "Black", inStock: true },
      { color: "White", inStock: true },
      { color: "Red", inStock: false },
    ],
    similarProductIds: ["wireless-studio-headphones", "cool-in-ear-headphones"],
  },
  {
    id: "wireless-studio-headphones",
    name: "Wireless Studio Headphones",
    category: "Wireless headphones",
    price: 110,
    currency: "USD",
    description:
      "Professional-grade wireless headphones with active noise cancellation, ideal for focused work and commuting.",
    image: "/images/wireless-studio-headphones.png",
    color: "#2196f3",
    features: [
      "Active noise cancellation",
      "Built-in microphone",
      "Over-ear cushioned design",
      "30-hour battery life",
    ],
    useCases: ["commuting", "calls", "focused work"],
    batteryLifeHours: 30,
    noiseCancellation: true,
    hasMicrophone: true,
    recommendationAngle:
      "Best all-around alternative for commuting and calls with noise cancellation.",
    variants: [
      { color: "Black", inStock: true },
      { color: "Blue", inStock: true },
    ],
    similarProductIds: [
      "beats-solo-air",
      "noise-canceling-travel-headphones",
    ],
  },
  {
    id: "cool-in-ear-headphones",
    name: "Cool In-ear Headphones",
    category: "Wireless earbuds",
    price: 45,
    currency: "USD",
    description:
      "Budget-friendly wireless earbuds great for calls, workouts, and everyday lightweight listening.",
    image: "/images/cool-in-ear-headphones.png",
    color: "#43a047",
    features: [
      "Wireless Bluetooth connection",
      "Built-in microphone",
      "Lightweight in-ear design",
      "15-hour battery life",
    ],
    useCases: ["calls", "workouts", "lightweight listening"],
    batteryLifeHours: 15,
    noiseCancellation: false,
    hasMicrophone: true,
    recommendationAngle:
      "Best budget option for calls and lightweight everyday listening.",
    variants: [
      { color: "Red", inStock: true },
      { color: "Black", inStock: true },
      { color: "White", inStock: true },
    ],
    similarProductIds: ["beats-solo-air", "wireless-studio-headphones"],
  },
  {
    id: "noise-canceling-travel-headphones",
    name: "Noise-Canceling Travel Headphones",
    category: "Wireless headphones",
    price: 149,
    currency: "USD",
    description:
      "Premium noise-canceling headphones designed for long-haul travel and deep focused work sessions.",
    image: "/images/noise-canceling-travel-headphones.png",
    color: "#6d4c41",
    features: [
      "Advanced active noise cancellation",
      "Built-in microphone",
      "Foldable travel design",
      "40-hour battery life",
    ],
    useCases: ["travel", "commuting", "focused work"],
    batteryLifeHours: 40,
    noiseCancellation: true,
    hasMicrophone: true,
    recommendationAngle:
      "Best for frequent travelers who need serious noise isolation and long battery life.",
    variants: [
      { color: "Black", inStock: true },
      { color: "Silver", inStock: true },
    ],
    similarProductIds: ["wireless-studio-headphones", "beats-solo-air"],
  },
  {
    id: "bassboost-gaming-headset",
    name: "BassBoost Gaming Headset",
    category: "Gaming headset",
    price: 89,
    currency: "USD",
    description:
      "High-performance gaming headset with bass-heavy sound, low-latency mic, and all-night comfort.",
    image: "/images/bassboost-gaming-headset.png",
    color: "#7b1fa2",
    features: [
      "Low-latency microphone",
      "Bass-boosted sound profile",
      "Over-ear cushioned design",
      "25-hour battery life",
    ],
    useCases: ["gaming", "voice chat", "streaming"],
    batteryLifeHours: 25,
    noiseCancellation: false,
    hasMicrophone: true,
    recommendationAngle:
      "Best for gamers who want immersive bass and clear voice chat performance.",
    variants: [
      { color: "Black", inStock: true },
      { color: "Green", inStock: true },
    ],
    similarProductIds: ["wireless-studio-headphones", "beats-solo-air"],
  },
];

module.exports = products;
