import style from "../src/styles/home.module.css";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import "./app.css";
import { useState } from "react";
import MainLayout from "./components/MainLayout";

function App() {
  const [selectedGroup, setSelectedGroup] = useState();
  const [mobileView, setMobileView] = useState("sidebar");
  const [search, setSearch] = useState("");

  const handleSelect = (group) => {
    setSelectedGroup(group);

    if (window.innerWidth <= 768) {
      setMobileView("cards");
    }
  };

  return (
    <div className={style.appContainer}>
      <Header />

      <div className={style.content}>
        {/* Desktop */}
        {window.innerWidth > 768 ? (
          <>
            <Sidebar
              selected={selectedGroup}
              onSelect={handleSelect}
              search={search}
              setSearch={setSearch}
              showSearch={true}
            />

            <main className={style.mainContent}>
              <MainLayout
                title={selectedGroup}
                group={selectedGroup}
                search={search}
                setSearch={setSearch}
                isMobile={false}
              />
            </main>
          </>
        ) : (
          <>
            {/* Mobile */}
            {mobileView === "sidebar" ? (
              <Sidebar
                selected={selectedGroup}
                onSelect={handleSelect}
                search={search}
                setSearch={setSearch}
                showSearch={false}
              />
            ) : (
              <main className={style.mainContent}>
                <MainLayout
                  title={selectedGroup}
                  group={selectedGroup}
                  search={search}
                  setSearch={setSearch}
                  isMobile={true}
                  onBack={() => setMobileView("sidebar")}
                />
              </main>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default App;
