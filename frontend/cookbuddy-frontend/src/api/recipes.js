const RECIPES_KEY = "cookbuddy_recipes_db";

const DEFAULT_RECIPES = [
  {
    id: "sample-1",
    title: "Sunny Veggie Noodles",
    cuisine: "Asian",
    category: "Dinner",
    cooking_time: 18,
    difficulty: "Easy",
    ingredients: "200g Ramen noodles\n1 cup mixed vegetables (carrots, broccoli, bell peppers)\n2 tbsp soy sauce\n1 tbsp sesame oil\n1 sunny-side-up egg",
    instructions: "Boil noodles according to package instructions.\nSauté vegetables in sesame oil until tender-crisp.\nToss noodles and soy sauce with the vegetables.\nTop with a freshly fried sunny-side-up egg and serve warm.",
    image: "",
    is_favorite: true,
  },
  {
    id: "sample-2",
    title: "Creamy Tomato Toast",
    cuisine: "Cafe",
    category: "Breakfast",
    cooking_time: 12,
    difficulty: "Quick",
    ingredients: "2 slices sourdough bread\n1 cup cherry tomatoes\n2 tbsp cream cheese\n1 tbsp olive oil\nSalt, pepper, and fresh basil",
    instructions: "Toast bread until golden brown.\nBlister cherry tomatoes in olive oil in a small pan.\nSpread cream cheese over toasted sourdough.\nTop with blistered tomatoes, salt, pepper, and basil leaves.",
    image: "",
    is_favorite: false,
  },
  {
    id: "sample-3",
    title: "Minty Rice Bowl",
    cuisine: "Fresh",
    category: "Healthy",
    cooking_time: 25,
    difficulty: "Calm",
    ingredients: "1 cup cooked jasmine rice\n1/2 cup cucumber (diced)\n1/2 cup chickpeas (rinsed)\nHandful of fresh mint leaves\n2 tbsp lemon-tahini dressing",
    instructions: "Warm the rice and place it in a serving bowl.\nArrange diced cucumber, chickpeas, and mint leaves on top.\nDrizzle with lemon-tahini dressing.\nMix gently before eating.",
    image: "",
    is_favorite: true,
  },
  {
    id: "sample-4",
    title: "Spiced Paneer Tikka",
    cuisine: "Indian",
    category: "Dinner",
    cooking_time: 20,
    difficulty: "Medium",
    ingredients: "200g paneer (cubed)\n1/2 cup yogurt\n1 tbsp ginger-garlic paste\n1 tsp red chili powder\n1 tsp garam masala\nBell pepper and onion chunks",
    instructions: "Whisk yogurt with spices and ginger-garlic paste to create marinade.\nToss paneer, onion, and bell pepper chunks in the marinade for 15 mins.\nThread onto skewers and cook in a hot pan or oven until charred.\nServe with mint chutney.",
    image: "",
    is_favorite: false,
  },
  {
    id: "sample-5",
    title: "Classic Margherita Pizza",
    cuisine: "Italian",
    category: "Dinner",
    cooking_time: 15,
    difficulty: "Medium",
    ingredients: "1 pre-made pizza crust\n1/2 cup tomato sauce\n1 cup fresh mozzarella cheese\nFresh basil leaves\n1 tbsp olive oil",
    instructions: "Preheat oven to 450°F (230°C).\nSpread tomato sauce evenly over pizza crust.\nArrange fresh mozzarella slices on top.\nBake for 10-12 mins until cheese is bubbly and crust is golden.\nTop with basil leaves and olive oil drizzle.",
    image: "",
    is_favorite: false,
  },
  {
    id: "sample-6",
    title: "Berry Parfait Bowl",
    cuisine: "Breakfast",
    category: "Breakfast",
    cooking_time: 8,
    difficulty: "Easy",
    ingredients: "1 cup Greek yogurt\n1/2 cup mixed fresh berries (strawberries, blueberries)\n1/4 cup granola\n1 tbsp honey",
    instructions: "Spoon half of the Greek yogurt into a bowl or jar.\nLayer with half of the berries and granola.\nAdd the remaining yogurt, followed by the rest of the berries and granola.\nDrizzle with honey and enjoy.",
    image: "",
    is_favorite: false,
  },
  {
    id: "sample-7",
    title: "Double Chocolate Cookie",
    cuisine: "Dessert",
    category: "Dessert",
    cooking_time: 12,
    difficulty: "Easy",
    ingredients: "1 cup flour\n1/2 cup cocoa powder\n1/2 cup sugar\n1/2 cup melted butter\n1/2 cup chocolate chips",
    instructions: "Preheat oven to 350°F (175°C).\nMix melted butter, sugar, flour, and cocoa powder until a dough forms.\nFold in chocolate chips.\nScoop onto baking tray and bake for 10 minutes.\nCool before serving.",
    image: "",
    is_favorite: false,
  }
];

function _getStoredRecipes() {
  const data = localStorage.getItem(RECIPES_KEY);
  if (!data) {
    localStorage.setItem(RECIPES_KEY, JSON.stringify(DEFAULT_RECIPES));
    return DEFAULT_RECIPES;
  }
  try {
    return JSON.parse(data);
  } catch {
    return DEFAULT_RECIPES;
  }
}

function _saveStoredRecipes(recipes) {
  localStorage.setItem(RECIPES_KEY, JSON.stringify(recipes));
}

export function getRecipes() {
  return Promise.resolve(_getStoredRecipes());
}

export function getRecipe(id) {
  const recipes = _getStoredRecipes();
  const recipe = recipes.find((r) => r.id === id);
  if (!recipe) {
    return Promise.reject(new Error("Recipe not found."));
  }
  return Promise.resolve(recipe);
}

export function createRecipe(payload) {
  let title, cuisine, cooking_time, ingredients, instructions, image;
  if (payload instanceof FormData) {
    title = payload.get("title");
    cuisine = payload.get("cuisine");
    cooking_time = payload.get("cooking_time");
    ingredients = payload.get("ingredients");
    instructions = payload.get("instructions");
    const imageFile = payload.get("image");
    image = imageFile && typeof imageFile === "object" ? URL.createObjectURL(imageFile) : "";
  } else {
    ({ title, cuisine, cooking_time, ingredients, instructions, image } = payload);
  }

  const newRecipe = {
    id: "recipe-" + Date.now(),
    title: title || "Untitled recipe",
    cuisine: cuisine || "Comfort",
    category: cuisine || "Comfort",
    cooking_time: Number(cooking_time) || 30,
    difficulty: "Easy",
    ingredients: ingredients || "",
    instructions: instructions || "",
    image: image || "",
    is_favorite: false,
    owner: "chef-123",
  };

  const recipes = _getStoredRecipes();
  recipes.unshift(newRecipe);
  _saveStoredRecipes(recipes);

  return Promise.resolve(newRecipe);
}

export function updateRecipe(id, payload) {
  const recipes = _getStoredRecipes();
  const index = recipes.findIndex((r) => r.id === id);
  if (index === -1) {
    return Promise.reject(new Error("Recipe not found."));
  }

  let updatedData = {};
  if (payload instanceof FormData) {
    updatedData.title = payload.get("title");
    updatedData.cuisine = payload.get("cuisine");
    updatedData.cooking_time = payload.get("cooking_time");
    updatedData.ingredients = payload.get("ingredients");
    updatedData.instructions = payload.get("instructions");
    const imageFile = payload.get("image");
    if (imageFile) {
      updatedData.image = URL.createObjectURL(imageFile);
    }
  } else {
    updatedData = { ...payload };
  }

  recipes[index] = {
    ...recipes[index],
    ...updatedData,
    cooking_time: Number(updatedData.cooking_time) || recipes[index].cooking_time,
  };

  _saveStoredRecipes(recipes);
  return Promise.resolve(recipes[index]);
}

export function deleteRecipe(id) {
  let recipes = _getStoredRecipes();
  recipes = recipes.filter((r) => r.id !== id);
  _saveStoredRecipes(recipes);
  return Promise.resolve({ success: true });
}

export function searchRecipes(query) {
  const recipes = _getStoredRecipes();
  if (!query) {
    return Promise.resolve(recipes);
  }
  const lowerQuery = query.toLowerCase();
  const filtered = recipes.filter(
    (r) =>
      r.title.toLowerCase().includes(lowerQuery) ||
      r.cuisine.toLowerCase().includes(lowerQuery) ||
      r.ingredients.toLowerCase().includes(lowerQuery)
  );
  return Promise.resolve(filtered);
}

export function getFavorites() {
  const recipes = _getStoredRecipes();
  const favorites = recipes.filter((r) => r.is_favorite || r.favorite);
  return Promise.resolve(favorites);
}

export function toggleFavorite(recipeId) {
  const recipes = _getStoredRecipes();
  const index = recipes.findIndex((r) => r.id === recipeId);
  if (index === -1) {
    return Promise.reject(new Error("Recipe not found."));
  }
  recipes[index].is_favorite = !recipes[index].is_favorite;
  _saveStoredRecipes(recipes);
  return Promise.resolve(recipes[index]);
}