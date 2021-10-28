import type { NextPage } from "next";
import { MyHead } from "../modules/MyHead";
import { Header } from "../modules/ui/Header";
import { MyButton } from "../modules/ui/MyButton";

const Home: NextPage = () => {
  return (
    <div>
      <MyHead title="Welcome to Boocrit – The online book community" />
      <Header />
      <div className="w-full py-24 flex flex-col justify-center items-center space-y-16">
        {/* Welcome to Boocrit */}
        <div>
          <div
            className="text-center flex justify-center items-center"
            style={{
              backgroundImage: "url(assets/landing_welcome_vector.svg)",
              backgroundRepeat: "no-repeat",
              width: "815px",
              height: "425px",
            }}
          >
            <div>
              <h1 className="font-black font-slab text-secondary text-4xl">
                Welcome to Boocrit!
              </h1>
              <p className="font-medium font-slab text-secondary text-xl">
                The online book community.
              </p>
              <div className="flex justify-center items-center space-x-3 pt-6">
                <MyButton>Sign up</MyButton>
                <div className="text-green-dark font-bold">or</div>
                <MyButton color="green">Login</MyButton>
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
    </div>
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

export default Home;
