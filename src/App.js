import "assets/css/stylesheet.scss";
import Editor from "views";
import GoogleFonts from "enums/google-fonts.json";
import { useEffect } from "react";
import { loadCustomFontsAsync } from "utils";
import { store } from "store";
import { Provider } from "react-redux";
import customizeFabric from "fabric-overrides";
import ErrorBoundary from "components/error-boundry";
function App() {
  const query = new URLSearchParams(window.location.search);
  const type = query.get("type");
  const designId = query.get("designId");
  const user = query.get("user");
  const params = { type, designId, user };
  useEffect(() => {
    GoogleFonts.items.map(async (font) => {
      font.variants.map(async (item) => {
        await loadCustomFontsAsync(
          { title: font.family + "-" + item, value: font.files[item] },
          false
        );
      });
    });
    customizeFabric(params);
  }, []);
  return (
    <>
      <ErrorBoundary>
        <Provider store={store}>
          <Editor />
        </Provider>
      </ErrorBoundary>
    </>
  );
}

export default App;
