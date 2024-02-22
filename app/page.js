import "./globals.css"
import Link from "next/link"

export default function Home() {
  return (
    <>
      <main>
        <div className="hero">
          <h1 className="hero-title">Titlul website-ului</h1>
          <p className="hero-subtitle">Bine ati venit</p>
          <button className="hero-cta">Despre noi</button>
        </div>
        <div className="section">
          <h2 className="section-header" style={{ color: "white" }}>
            Despre aplicatie
          </h2>
          <div className="card">
            <h1>Ce puteti vedea aici</h1>
            <p>
              Aici puteți vedea o varietate de informații interesante și utile
              despre locul nostru minunat. Cu ajutorul nostru, veți descoperi
              frumusețea naturii, cultura locală bogată și opțiunile nelimitate
              de divertisment. <br /> <br />
              Indiferent dacă sunteți în căutarea aventurilor în aer liber sau
              doriți să explorați atracțiile culturale, suntem aici pentru a vă
              oferi informațiile de care aveți nevoie pentru a vă bucura la
              maxim de călătoria dumneavoastră. <br />
              <br />
              Indiferent dacă sunteți pasionat de natură sau de artă, aici veți
              găsi ceva care să vă fascineze. Puteți explora frumusețea
              peisajelor naturale sau vă puteți pierde în lumea artei cu
              colecția noastră impresionantă. În plus, avem numeroase evenimente
              și activități planificate pentru a vă oferi o experiență
              memorabilă. Haideți să începem călătoria împreună și să facem din
              fiecare moment o aventură de neuitat!
            </p>

            <br />

            <h1>Tipuri de picturi</h1>
            <p>
              În lumea artei, există o varietate de tipuri de picturi, fiecare
              având propria sa frumusețe și semnificație. De la picturile
              abstracte care vă invită să vă lăsați imaginația să zboare, până
              la cele realiste care surprind fiecare detaliu cu precizie
              uluitoare, există ceva pentru fiecare gust artistic. <br />
              <br /> Descoperiți lumile vibrante și expresive create de artiști
              talentați din întreaga lume. Fie că sunteți un iubitor al
              impresionismului, al artei contemporane sau al picturilor clasice,
              există multe de explorat și de apreciat în lumea picturilor.
              Haideți să vă aventurați în această călătorie artistică și să vă
              bucurați de diversitatea tipurilor de picturi care vă vor încânta
              ochii și sufletul!
            </p>
          </div>
        </div>
      </main>

      <footer>
        <div className="footer">
          <div className="footer-links">
            <Link href="/" className="footer-link">
              Acasa
            </Link>
            <Link href="/expozitie/Aurelia" className="footer-link">
              Expozitie cu vanzare
            </Link>
            <Link href="/constignatie" className="footer-link">
              Piata de vechi
            </Link>
            <Link href="/istoria-artei" className="footer-link">
              Intrebari frecvente
            </Link>
            <Link href="/noutati" className="footer-link">
              Termeni si conditii
            </Link>
            <Link href="/noutati" className="footer-link">
              Contact
            </Link>
            <Link href="/noutati" className="footer-link">
              Despre noi
            </Link>
          </div>
          <p className="footer-text">© 2024 Relu Tolan</p>
        </div>
      </footer>
    </>
  )
}
