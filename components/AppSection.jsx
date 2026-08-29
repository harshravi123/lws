const centers = [
  {
    image: "/images/delhi-center.jpg",
    city: "Dwarka Mor (Delhi)",
    address:
      "2nd Floor, Opp. Metro Pillar No. 783, Main Najafgarh Road, Dwarka Metro Station, New Delhi – 110059",
  },
  {
    image: "/images/haryana-center.jpg",
    city: "Mahendragarh (Haryana)",
    address:
      "Kanina-Kapoori Road Kakrda, Chelavas, Mahendragarh, Haryana – 123027",
  },
  {
    image: "/images/pune-center.jpg",
    city: "Pune (Maharashtra)",
    address:
      "2nd Floor, Sagar Arcade, Fergusson College Road, Pune – 411004",
  },
  {
    image: "/images/lucknow-center.jpg",
    city: "Lucknow (UP)",
    address:
      "Near Heeralal Yadav Public School, Benti, Banthara, Lucknow, Uttar Pradesh",
  },
];

export default function Centers() {

  return (
    <section className="section centers">

      <div className="container">

        <div className="center-grid">

          {centers.map((center, index) => (

            <a className="center-card" href="#contact" key={index} aria-label={`View ${center.city} center`}>

              <img
                src={center.image}
                alt={center.city}
              />

            </a>

          ))}

        </div>

      </div>

    </section>
  );
}