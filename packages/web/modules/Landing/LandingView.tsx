import React from "react";
import { useRouter } from "next/router";
import { Header } from "../ui/Header";
import { MyButton } from "../ui/MyButton";

export const LandingView: React.FC = ({}) => {
  const router = useRouter();
  return (
    <>
      <Header />
      <div className="w-full py-24 flex flex-col justify-center items-center space-y-16">
        {/* Welcome to Boocrit */}
        <div>
          <div
            className="text-center flex justify-center items-center"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='815' height='425' viewBox='0 0 815 425' fill='none' xmlns='http://www.w3.org/2000/svg'%0A%3E%3Cpath d='M26.3039 167.197C100.604 -20.7956 245.807 -12.7792 309.121 14.7281C303.069 12.5339 307.724 14.492 374.762 39.8777C458.56 71.6097 587.049 3.72517 638.026 1.3674C678.808 -0.518813 721.591 17.8718 737.885 27.3029C796.078 76.2921 877.548 201.621 737.885 311.021C563.307 447.772 629.646 246.576 362.891 369.966C96.1352 493.356 -66.5718 402.188 26.3039 167.197Z' fill='%239DE6CD' /%3E%3C/svg%3E")`,
              backgroundRepeat: "no-repeat",
              width: "815px",
              height: "425px",
            }}
          >
            <div>
              <h1 className="font-black font-roboto text-secondary text-5xl">
                Welcome to <span className="font-slab">Boocrit</span>!
              </h1>
              <p className="font-medium font-slab text-secondary text-xl">
                The online book community.
              </p>
              <div className="flex justify-center items-center space-x-3 pt-6">
                <MyButton onClick={() => router.push("/register")}>
                  Sign up
                </MyButton>
                <div className="text-green-dark font-bold">or</div>
                <MyButton color="green" onClick={() => router.push("/login")}>
                  Login
                </MyButton>
              </div>
            </div>
          </div>
        </div>
        {/* What is Boocrit? */}
        <SectionComponent
          title="What is Boocrit?"
          content={
            <>
              <p>
                Boocrit is an online community, that people around the world can
                have conversations about books or even review them.
              </p>
              <p>In short; it’s the place for the books lovers.</p>
            </>
          }
          align="left"
        />
        {/* Why you should use it? */}
        <SectionComponent
          title="Why you should use it?"
          content={
            <>
              <p>
                Boocrit doesn’t depend on any physical library, so you can find
                ANY book that has an ISBN and read reviews about it. You won’t
                have to worry about our library not being up to date.
              </p>
              <p>
                Moreover, we’re not trying to persuade you to buy a book, since
                we aren’t selling. So, the honesty in the reviews is another
                reason why you should use Boocrit.
              </p>
            </>
          }
          align="right"
        />
        {/* What about pricing? */}
        <SectionComponent
          title="What about pricing?"
          content="Boocrit is totally free. There’s only one plan to choose that’s
          free of charge and contains everything in unlimited quantities.
          That means that you can create and read as many reviews as you
          like."
          align="left"
        />
      </div>
    </>
  );
};

interface SectionProperties {
  title: string;
  content: string | JSX.Element;
  align: "left" | "right";
}

const SectionComponent: React.FC<SectionProperties> = (props) => (
  <div
    className={`text-secondary text-${props.align}`}
    style={{
      width: 500,
    }}
  >
    <div className="font-black font-slab text-3xl">{props.title}</div>
    <div className="font-medium font-slab text-base space-y-4">
      {props.content}
    </div>
  </div>
);
