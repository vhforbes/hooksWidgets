import Accordion from "./components/Accordion";
import Search from "./components/Search";

import items from "./data/items";

function App() {
  return (
    <div className="App">
      <Accordion items={items} />
      <Search />
    </div>
  );
}

export default App;
