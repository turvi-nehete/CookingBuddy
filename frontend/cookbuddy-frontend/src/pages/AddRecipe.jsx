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
    <main className="page-shell">
      <section className="section">
        <div className="section-heading">
          <p className="eyebrow">Create recipe</p>
          <h1>Add a dish to your kitchen.</h1>
        </div>

        <form onSubmit={handleSubmit} className="recipe-form glass-panel">
          {error ? <p className="error-banner md:col-span-2">{error}</p> : null}

          <label className="image-upload md:row-span-2">
            <input name="image" type="file" accept="image/*" onChange={updateField} />
            <span className="text-5xl">photo</span>
            <strong>{form.image ? form.image.name : "Upload recipe image"}</strong>
            <small>PNG or JPG works beautifully</small>
          </label>

          <label className="field-label">
            Recipe title
            <input name="title" value={form.title} onChange={updateField} required className="field-input" />
          </label>
          <label className="field-label">
            Cuisine
            <input name="cuisine" value={form.cuisine} onChange={updateField} required className="field-input" />
          </label>
          <label className="field-label">
            Cooking time
            <input name="cooking_time" type="number" min="1" value={form.cooking_time} onChange={updateField} required className="field-input" />
          </label>
          <label className="field-label md:col-span-2">
            Ingredients
            <textarea name="ingredients" value={form.ingredients} onChange={updateField} required className="field-input min-h-36" placeholder="One ingredient per line" />
          </label>
          <label className="field-label md:col-span-2">
            Instructions
            <textarea name="instructions" value={form.instructions} onChange={updateField} required className="field-input min-h-44" placeholder="One step per line" />
          </label>

          <button type="submit" className="btn btn-primary btn-lg justify-center md:col-span-2" disabled={loading}>
            {loading ? "Saving recipe..." : "Submit recipe"}
          </button>
        </form>
      </section>
    </main>
  );
}

export default AddRecipe;