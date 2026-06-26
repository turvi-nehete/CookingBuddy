import { Link } from "react-router-dom";
import EmptyState from "../components/EmptyState";

function NotFound() {
  return (
    <main className="page-shell">
      <section className="section">
        <EmptyState
          title="This page wandered off"
          message="The route you opened does not exist in CookBuddy AI."
          action={<Link to="/" className="btn btn-primary">Go home</Link>}
        />
      </section>
    </main>
  );
}

export default NotFound;