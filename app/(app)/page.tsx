import Course from "@/components/ui/course";

const Home = () => {
  return (
    <div className="flex xl:pt-10 px-2 pt-16 flex-col w-full">
      <h5 className="mb-5" data-cy="text-home-courses">
        Courses
      </h5>
      <Course banner="https://placehold.co/272x150.png" title="Introduction to Web3" link=""></Course>
    </div>
  );
};

export default Home;
