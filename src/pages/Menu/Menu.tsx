import { useInfiniteQuery } from "@tanstack/react-query";

import { useContext } from "react";
import React from "react";
import { AuthContext, AuthContextType } from "../../context/AuthContext";
import { getAllMeals } from "../../services/firebase";
import styles from "./Menu.module.css";
import Loader from "../../components/Loader/Loader";
import Card from "../../components/Card/Card";
import Button from "../../components/Button/Button";
import { useTranslation } from "react-i18next";

const Menu = () => {
  const { token } = useContext(AuthContext) as AuthContextType;
  const { t } = useTranslation();
  const { data, error, fetchNextPage, hasNextPage, isFetchingNextPage, status } = useInfiniteQuery({
    queryKey: ["meals"],
    queryFn: ({ pageParam }) => getAllMeals(token as string, pageParam),
    initialPageParam: "",
    getNextPageParam: (lastPage) => {
      if (lastPage === null) {
        return null;
      }
      return Object.keys(lastPage).pop();
    },
  });
  return (
    <div className={styles.container}>
      {status === "pending" ? (
        <Loader />
      ) : status === "error" ? (
        <p>{error.message}</p>
      ) : (
        <ul className={styles.grid}>
          {data?.pages.map((group, i) => {
            return (
              <React.Fragment key={i}>
                {group !== null &&
                  Object.keys(group).map((id) => {
                    return (
                      <li key={id}>
                        <Card
                          item={{
                            id,
                            ...group[id],
                          }}
                        />
                      </li>
                    );
                  })}
              </React.Fragment>
            );
          })}
        </ul>
      )}

      {status === "success" && (
        <div
          style={{
            textAlign: "center",
            margin: "2rem 0",
          }}
        >
          {hasNextPage && (
            <Button variant="outline" onClick={() => fetchNextPage()} disabled={!hasNextPage || isFetchingNextPage}>
              {isFetchingNextPage ? t("Loading.key") : t("LoadMore.key")}
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default Menu;
