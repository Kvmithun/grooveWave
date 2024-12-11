import Header from "@/components/Header";
import ListItem from "@/components/ListItems";
import getSongs from "@/actions/getSongs";
import { DiVim } from "react-icons/di";
import PageContent from "./components/PageContent";
import Player from "@/components/Player"; // Import Player component
import { Song } from "@/types"; // Import Song interface

export const revalidate = 0;

export default async function Home() {
  const songs = await getSongs();
  const song: Song = songs[0]; // Example: use the first song from the list for the player

  return (
    <div
      className="
        bg-neutral-900
        rounded-lg
        h-full
        w-full
        overflow-hidden
        overflow-y-auto
      "
    >
      <Header>
        <div className="mb-2">
          <h1 className="text-3xl font-semibold flex items-center font-sans">
            GROOVE-WAVE
            <img className="ml-6" src="/images/Music.png" alt="logo" width="100" height="100" />
          </h1>

          <div
            className="grid
              grid-cols-1
              sm:grid-cols-2
              xl:grid-cols-3
              2xl:grid-cols-4
              gap-3
              mt-4
            "
          >
            <ListItem
              image="/images/liked.png"
              name="Liked Songs"
              href="liked"
            />
          </div>
        </div>
      </Header>
      <div className="mt-2 mb-7 px-6">
        <div className="flex justify-between items-center">
          <h1 className="text-white text-2xl font-semibold">Newest Songs</h1>
        </div>
        <div>
          <PageContent songs={songs} />
        </div>
      </div>

      {/* Player Section */}
      <Player song={song} /> {/* Pass the song to the Player component */}

      {/* Footer Section */}
      <footer className="bg-neutral-900 text-gray-400 py-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-white font-semibold">Company</h3>
              <ul>
                <li>About</li>
                <li>Jobs</li>
                <li>For the Record</li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold">Communities</h3>
              <ul>
                <li>For Artists</li>
                <li>Developers</li>
                <li>Advertising</li>
                <li>Investors</li>
                <li>Vendors</li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold">Useful Links</h3>
              <ul>
                <li>Support</li>
                <li>Free Mobile App</li>
                <li>Spotify Plans</li>
                <li>Premium Individual</li>
                <li>Premium Duo</li>
                <li>Premium Family</li>
                <li>Premium Student</li>
                <li>Spotify Free</li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold">Legal</h3>
              <ul>
                <li>Safety & Privacy Center</li>
                <li>Privacy Policy</li>
                <li>Cookies</li>
                <li>About Ads</li>
                <li>Accessibility</li>
              </ul>
            </div>
          </div>
          <div className="text-center text-gray-500">
            <p>© 2024 Groove Wave AB.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
