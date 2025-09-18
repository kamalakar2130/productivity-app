import "./../assets/icons/fontawesome/css/all.min.css";
function Footer() {
  const socials = [
    {
      name: "LinkedIn",
      icon: "linkedin-in",
      link: "https://www.linkedin.com/",
    },
    { name: "GitHub", icon: "github", link: "https://www.github.com/" },
    { name: "YouTube", icon: "youtube", link: "https://www.youtube.com/" },
    { name: "Twitter", icon: "x-twitter", link: "https://www.twitter.com/" },
    { name: "Facebook", icon: "facebook-f", link: "https://www.facebook.com/" },
  ];
  return (
    <footer className="flex sticky z-53 justify-between h-50 bg-[#333] text-[#fff]">
      <div className="text-xl md:text-2xl w-50">
        <ul className="space-x-4 pl-4">
          {socials.map((social) => {
            return (
              <li className="" key={social.name}>
                <a
                  href={`${social.link}`}
                  target="_blank"
                  className="hover:text-[#1da1f2] text-[0
        0.6em] md:text-2xl sm:text-lg"
                >
                  <span className="hidden sm:inline">{social.name}</span>
                  <i
                    className={`fab fa-${social.icon} clove text-[0.6em] md:text-xl sm:text-lg`}
                  ></i>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="flex p-4 right-0">
        <p className="text-xl md:text-3xl">
          © 2025 ProdApp. All rights reserved.
          <span className="hover:text-[#61ff79] text-red-600">
            Designed by Kamalakar.
          </span>
        </p>
      </div>
    </footer>
  );
}
export default Footer;
