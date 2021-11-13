import { useBooksQuery } from "@boocrit/controller";
import React, { useContext } from "react";
import { AuthContext } from "../Auth/AuthProvider";
import { Book } from "../ui/Book";

interface HomeControllerProps {}
export const HomeController: React.FC<HomeControllerProps> = ({}) => {
  const { me } = useContext(AuthContext);
  if (!me) return null;

  const { data: booksData, loading: booksLoading } = useBooksQuery({
    variables: { pagination: { limit: 10, skip: null } },
  });

  return (
    <div className="p-7">
      <div className="font-slab font-black text-3xl text-secondary text-center">
        Welcome back, {me.firstName}!
      </div>
      <div className="mt-4 flex flex-row space-x-6">
        {booksData?.Books.books?.map((b) => (
          <div key={`book:${b.id}`}>
            <Book book={b} />
          </div>
        ))}
      </div>
    </div>
  );
};
