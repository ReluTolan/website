import "./globals.css"
import Link from "next/link"

export default function Home() {
  return (
    <>
      <main>
        <div className="hero">
          <Link href={"/expozitie/artisti"}>
            <div className="hero-border"></div>
          </Link>
          <p className="hero-subtitle">Bine ati venit</p>
          <button className="hero-cta">
            <Link href={"/despre-noi"}>Despre noi</Link>
          </button>
        </div>
        <div className="section">
          <h1
            className="section-header"
            style={{ color: "white", marginBottom: "15px" }}
          >
            Despre ArtStep
          </h1>
          <p style={{ color: "white" }}>
            ArtStep este o platformă de promovare gratuită, în special a
            artiștilor plastici amatori sau profesioniști, dar și a
            deținătorilor legitimi de obiecte de artă, artizanat, anticariat,
            decor, mobilă veche, etc., care doresc să-și vândă creațiile /
            obiectele contra unei sume corect evaluate, respectiv negociate.
          </p>
          <br />
          <p style={{ color: "white" }}>
            Ca atare, indiferent din ce categorie faceți parte, artist plastic,
            colecționar, deținător legitim sau iubitor de obiecte de artă,
            artizanat, anticariat, decor, mobilă veche, etc., aici veți găsi
            ceea ce vă interesează, astfel:
          </p>
          <div className="card">
            <h3>Expoziție cu vânzare</h3>
            <p>
              În secțiunea Expoziție cu vânzare veți găsi creațiile artiștilor,
              amatori sau profesioniști, pe care îi veți putea contacta în mod
              direct (folosind datele de contact afișate) în vederea
              achiziționării creațiilor lor.
            </p>
          </div>
          <div className="card">
            <h3>Piața de vechi</h3>
            <p>
              În secțiunea Piața de vechi veți găsi obiecte de artă, artizanat,
              anticariat, decor, mobilă veche, etc., pe care le veți putea
              achiziționa, în urma unui proces de negociere directă cu
              deținătorul lor legitim.
            </p>
          </div>
          <div className="card">
            <h3>Pastila de IA (inteligență artificială)</h3>
            <p>
              În secțiunea Pastila de IA (inteligență artificială) veți găsi
              articole / tutoriale, generate de AI, cu tematică artistică.
            </p>
            <br />
            <p style={{ fontStyle: "italic" }}>
              Disclaimer: Din verificările noastre conținutul generat de IA și
              publicat de noi este preponderent corect, dar nu recomandăm
              folosirea acestui conținut sub nicio formă și pentru niciun
              obiectiv, fără o verificare suplimentară și riguros documentată
              istoric / științific.
            </p>
          </div>
          <br />
          <p style={{ color: "white" }}>
            În concluzie, arta și ”frumosul” fiind un domeniu strict subiectiv,
            fiecare creație / obiect având o frumusețe și semnificație
            intrinsecă, vă încurajăm și vă recomandăm ferm să accesați /
            achiziționați doar acele creațiile / obiecte cu care rezonați
            artistic / emoțional. Doar în acest fel, scopul platformei ArtStep
            de a uni deținătorul cu obiectul / creația artistică va fi
            desăvârșit.
          </p>
          <br />
          <p style={{ fontWeight: "bold" }}>Vă dorim ”navigare” plăcută!</p>
        </div>
      </main>

      <footer>
        <div className="footer">
          <div className="footer-links">
            <Link href="/" className="footer-link">
              Acasa
            </Link>
            <Link href="/expozitie/pictori" className="footer-link">
              Expozitie cu vanzare
            </Link>
            <Link href="/piata" className="footer-link">
              Piata de vechi
            </Link>
            <Link href="/termeni-si-conditii" className="footer-link">
              Termeni si conditii
            </Link>
            <Link href="/acord-de-prelucrare" className="footer-link">
              Acord de informare
            </Link>
            <Link href="/despre-noi" className="footer-link">
              Despre noi
            </Link>
          </div>
          <p className="footer-text">© 2024 ArtStep</p>
        </div>
      </footer>
    </>
  )
}
