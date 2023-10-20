import Link from "next/link";

function Footer() {
  const LinksArray = [
    {
      h3: "COMPANY",
      link: ["SHOP", "ABOUT", "PROJECT", "CONTACT"],
      hrefs: ["/shop", "/about", "/project", "/contact"],
    },
    {
      h3: "GENERAL",
      link: ["TERMS AND CONDITION", "PRIVACYPOLICY", "RETURNS AND REFUNDS"],
      hrefs: ["termsandcondition", "privacypolicy", "returnsandrefunds"],
    },
    {
      h3: "SOCIALS",
      link: ["INSTAGRAM", "FACEBOOK", "TWITTER"],
      hrefs: ["instagram.com", "facebook.com", "twitter.com"],
    },
  ];
  return (
    <section className="FooterSection">
      {LinksArray.map((elems, i) => (
        <div key={i}>
          <h3>{elems.h3}</h3>
          {elems.link.map((elem, j) => (
            <Link href={elems.hrefs[j]} key={j} className="hover:text-Secondary">
              {elem}
            </Link>
          ))}
        </div>
      ))}
      <p>Shop No - 03, C-23,Poonam Sagar Complex,Mira Road(E), Dist-ThaneMaharastra, Pin - 401107</p>
      <span>ASHOK INTERIORS. ALL RIGHTS RESERVED © 2023</span>
    </section>
  );
}

export default Footer;