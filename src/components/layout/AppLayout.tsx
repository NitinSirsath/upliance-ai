import styles from "./AppLayout.module.css";
import { ReactNode } from "react";
import { useAuthStore } from "../../services/store/auth/authStore";
import ResponsiveAppBar from "./header/ResponsiveAppBar";
// import Header from "../components/header/Header";

interface IProps {
  children: ReactNode;
}

const AppLayout = ({ children }: IProps) => {
  const { isLoggedIn } = useAuthStore();

  return (
    <div className={styles.appLayout}>
      {isLoggedIn && (
        <div className={styles.headerContainer}>
          {/* <Header /> */}
          <ResponsiveAppBar />
        </div>
      )}
      <main
        style={{ margin: isLoggedIn ? "20px" : "0px" }}
        className={styles.mainContent}
      >
        {children}
      </main>
    </div>
  );
};

export default AppLayout;
