import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

function Layout({ children }) {
  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        width: "100%",
      }}
    >
      <Sidebar />

      <div
        style={{
          flex: 1,
          background: "#f5f7fa",
          minHeight: "100vh",
          width: "100%",
          overflowX: "auto",
        }}
      >
        <Navbar />

        <div
          style={{
            padding: "20px",
            width: "100%",
            boxSizing: "border-box",
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

export default Layout;