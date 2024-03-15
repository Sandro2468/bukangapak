import Link from "next/link";
import Container from "./Container";
import { FaUserCircle, FaSearch } from "react-icons/fa";
import LogoutButton from "./LogoutButton";

function NavBar() {
  return (
    <div
      className="sticky
        top-0
        w-full
        bg-slate-200
        z-30
        shadow-sm"
    >
      <div className="py-4 border-b-[1px]">
        <Container>
          <div
            className="
          flex
          items-center
          justify-between
          gap-3
          md-gap-0"
          >
            <Link href="/">
              <div className="text-red-500 font-bold">BukaNgapak</div>
            </Link>
            <div className="form-control flex items-center">
              <FaSearch size={24} className="text-gray-500 ml-2" />
              <input
                type="text"
                placeholder="Search"
                className="input input-bordered w-24 md:w-auto"
              />
            </div>
            <div className="navbar-end">
              <LogoutButton />
            </div>
            <div className="flex items-center gap-2">
              <FaUserCircle size={24} />
              <span>Profile</span>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}

export default NavBar;
