export default function Footer() {

  return (
    <footer className="footer">

      <div className="container footer-grid">

        <div className="footer-about">

          <div className="footer-logo">
            LWS
          </div>

          <p>
            LWS is a trusted NDA, CDS, AFCAT and SSB
            coaching institute helping defence aspirants
            achieve their goals through structured
            preparation and expert mentorship.
          </p>

        </div>

        <div>
          <h3>Useful Links</h3>

          <a href="#about">About Us</a>
          <a href="#contact">Contact</a>
          <a href="#results">Results</a>
          <a href="#">Privacy Policy</a>
          <a href="#">Terms & Conditions</a>
        </div>

        <div>
          <h3>Courses</h3>

          <a href="#courses">NDA</a>
          <a href="#courses">CDS</a>
          <a href="#courses">AFCAT</a>
          <a href="#courses">SSB</a>
          <a href="#courses">NDA Foundation</a>
        </div>

        <div id="contact">

          <h3>Contact Us</h3>

          <p>
            12/6/1, Block C,
            Near Mahila Park,
            Mohit Nagar, Vikaspuri,
            New Delhi 110059
          </p>

          <a href="tel:08047137368">
            08047137368
          </a>

          <a href="mailto:learnwithsumitsir@gmail.com">
            learnwithsumitsir@gmail.com
          </a>

        </div>

      </div>

      <div className="footer-bottom">

        <p>
          © 2026 Learn With Sumit. All Rights Reserved.
        </p>

      </div>

    </footer>
  );
}