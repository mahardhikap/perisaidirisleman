import First from './first/first';
import Footer from './footer/footer';
import Header from './header/header';
import Second from './second/second';
import Third from './third/third';

export default function Home() {
  return (
    <>
      <div className="sticky top-0 bg-[#fad74f] rounded-b-3xl">
        <div className="container w-11/12 sm:w-10/12 mx-auto">
          <Header />
        </div>
      </div>
      <div>
        <div className="container w-11/12 sm:w-10/12 mx-auto">
          <First />
        </div>
      </div>
      <div className="rounded-3xl mx-auto container bg-[#0553b1] mt-0 lg:mt-[-50px] pb-14">
        <div className="mx-auto container w-11/12 sm:w-10/12">
          <Second />
        </div>
      </div>
      <div className="container mx-auto w-11/12 sm:w-10/12 py-10">
        <Third />
      </div>
      <div className="rounded-t-3xl mx-auto container bg-[#fad74f] mt-[-50px]">
        <div className="container mx-auto w-11/12 sm:w-10/12 py-10">
          <Footer />
        </div>
      </div>
    </>
  );
}
