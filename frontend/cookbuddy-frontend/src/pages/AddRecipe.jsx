import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createRecipe } from "../api/recipes";

function AddRecipe() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: "", cuisine: "", cooking_time: "", ingredients: "", instructions: "", image: null });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function updateField(event) {
    const { name, value, files } = event.target;
    setForm((current) => ({ ...current, [name]: files ? files[0] : value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const payload = new FormData();
      payload.append("title", form.title);
      payload.append("cuisine", form.cuisine);
      payload.append("cooking_time", form.cooking_time);
      payload.append("ingredients", form.ingredients);
      payload.append("instructions", form.instructions);

      if (form.image) {
        payload.append("image", form.image);
      }

      const recipe = await createRecipe(payload);
      navigate(`/recipes/${recipe.id}`);
    } catch (err) {
      setError(err.message || "Could not create recipe.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="page-shell bg-cream-50/30">
      <section className="section">
        <div className="section-heading font-heading">
          <span className="eyebrow">Create recipe</span>
          <h1 className="mt-2 text-cocoa-900 font-bold">Add a dish to your kitchen.</h1>
        </div>

        <form onSubmit={handleSubmit} className="recipe-form bg-white border border-sage-200/50 shadow-soft font-heading">
          {error ? <p className="error-banner md:col-span-3 text-sm">{error}</p> : null}

          <label className="image-upload md:row-span-2 border-2 border-dashed border-sage-300 bg-sage-50/40 hover:bg-sage-50 transition">
            <input name="image" type="file" accept="image/*" onChange={updateField} />
            <span className="text-4xl text-sage-500">📸</span>
            <strong className="text-cocoa-800 text-sm">{form.image ? form.image.name : "Upload recipe image"}</strong>
            <small className="text-xs text-cocoa-500">PNG or JPG works beautifully</small>
          </label>

          <label className="field-label">
            <span className="text-cocoa-800 font-semibold text-sm">Recipe title</span>
            <input name="title" value={form.title} onChange={updateField} required className="field-input font-body text-sm" placeholder="e.g. Grandma's Apple Pie" />
          </label>
          <label className="field-label">
            <span className="text-cocoa-800 font-semibold text-sm">Cuisine</span>
            <input name="cuisine" value={form.cuisine} onChange={updateField} required className="field-input font-body text-sm" placeholder="e.g. Dessert, Italian" />
          </label>
          <label className="field-label">
            <span className="text-cocoa-800 font-semibold text-sm">Cooking time (mins)</span>
            <input name="cooking_time" type="number" min="1" value={form.cooking_time} onChange={updateField} required className="field-input font-body text-sm" placeholder="e.g. 45" />
          </label>
          <label className="field-label md:col-span-2">
            <span className="text-cocoa-800 font-semibold text-sm">Ingredients</span>
            <textarea name="ingredients" value={form.ingredients} onChange={updateField} required className="field-input font-body text-sm min-h-36" placeholder="One ingredient per line (e.g. 2 cups flour)" />
          </label>
          <label className="field-label md:col-span-2">
            <span className="text-cocoa-800 font-semibold text-sm">Instructions</span>
            <textarea name="instructions" value={form.instructions} onChange={updateField} required className="field-input font-body text-sm min-h-44" placeholder="One step per line (e.g. Preheat the oven)" />
          </label>

          <button type="submit" className="btn btn-primary btn-lg justify-center md:col-span-3 text-base shadow-sm mt-4" disabled={loading}>
            {loading ? "Saving recipe..." : "Submit recipe"}
          </button>
        </form>
      </section>
    </main>
  );
}

export default AddRecipe;