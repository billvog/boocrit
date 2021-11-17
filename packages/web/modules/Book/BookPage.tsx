import { useBookQuery } from "@boocrit/controller";
import React from "react";
import { useGetStringId } from "../../shared-hooks/useGetStringId";
import { WaitAuth } from "../Auth/WaitAuth";
import { HeaderController } from "../HeaderController";
import { MainLayout } from "../ui/MainLayout";
import { BookController } from "./BookController";

interface BookPageProps {}
export const BookPage: React.FC<BookPageProps> = ({}) => {
  const { data: BookData, loading: BookLoading } = useBookQuery({
    variables: { options: { isbn: useGetStringId("bookId") } },
  });
  return (
    <>
      <HeaderController
        title={`"${BookData?.Book?.title}" (${BookData?.Book?.avgRate}/5) on Boocrit`}
      />
      <WaitAuth RequireLoggedIn>
        <MainLayout showLoading={BookLoading}>
          <BookController book={BookData?.Book} />
        </MainLayout>
      </WaitAuth>
    </>
  );
};
