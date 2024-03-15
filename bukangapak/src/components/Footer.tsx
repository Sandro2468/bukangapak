// import { Container } from "postcss";
import Container from "../components/Container";
import FooterList from "./FooterList";
import Link from "next/link";
import { MdFacebook } from "react-icons/md";
import { FaSquareXTwitter } from "react-icons/fa6";
import { AiFillInstagram, AiFillYoutube } from "react-icons/ai";

function Footer() {
  return (
    <footer
      className="bg-slate-700
  text-slate-200 text-sm mt-16"
    >
      <Container>
        <div
          className="flex flex-col md:flex-row
     justify-between pt-16 pb-8"
        >
          <FooterList>
            <h3 className="text-base font-bold mb-2">Barang Trending</h3>
            <Link href="#">Handpone</Link>
            <Link href="#">Laptop</Link>
            <Link href="#">Jam Tangan</Link>
            <Link href="#">Tv</Link>
          </FooterList>
          <FooterList>
            <h3 className="text-base font-bold mb-2">Pelayanan Pelanggan</h3>
            <Link href="#">Hubungi Kami</Link>
            <Link href="#">Kebijakan Pengiriman</Link>
            <Link href="#">pengembalian & penukaran</Link>
            <Link href="#">Pertanyaan Umum</Link>
          </FooterList>
          <div
            className="w-full md:w-1/3 mb-6
          md:mb-0"
          >
            <h3 className="text-base font-bold mb-2">Tentang Kami</h3>
            <p className="mb-2">
              Kami di sini untuk memudahkan belanja online Anda. Dengan produk
              berkualitas, layanan pelanggan yang ramah, dan pengiriman yang
              cepat, kami siap memberikan pengalaman belanja terbaik. Terima
              kasih telah memilih kami sebagai mitra belanja online Anda.
            </p>
            <p>&copy; {new Date().getFullYear()}</p>
            <p>bukangapak. Hak cipta dilindungi Undang-undang</p>
          </div>
          <FooterList>
            <h3 className="text-base font-bold mb-2">Follow Kami</h3>
            <div className="flex gap-2">
              <Link href="#">
                <MdFacebook size={24} />
              </Link>
              <Link href="#">
                <FaSquareXTwitter size={24} />
              </Link>
              <Link href="#">
                <AiFillInstagram size={24} />
              </Link>
              <Link href="#">
                <AiFillYoutube size={24} />
              </Link>
            </div>
          </FooterList>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
