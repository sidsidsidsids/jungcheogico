import Logo from "../components/common/logo";
import Announcement from "../components/home/announcement";
import Banner from "../components/home/banner";
import ButtonsContainer from "../components/home/buttons-container";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <Logo />
      <Announcement />
      <ButtonsContainer />
      <Banner />
    </main>
  );
}
