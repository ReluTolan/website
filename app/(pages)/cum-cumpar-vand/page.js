import "@/app/(pages)/page-styles.css"
import Link from "next/link"

export default function CumCumparVand() {
  return (
    <div style={{ marginTop: "90px", padding: "0px 20px" }} className="cum">
      <h1 className="cum-title">Cum cumpăr?</h1>
      <p className="cum-subtitle">Nimic mai simplu!</p>

      <ol className="cum-list">
        <li>Găsește obiectul pe care dorești să-l achiziționezi</li>
        <li>
          Folosind datele de contact din descrierea anunțului, contactează
          direct artistul / proprietarul obiectului dorit.
        </li>
        <li>Negociază prețul afișat pe site.</li>
        <li>
          Stabilește cu proprietarul asupra metodei de livrare, respectiv plată.
        </li>
        <li>Recepționează livrarea și bucură-te de achiziție.</li>
      </ol>

      <div className="cum-important">
        <p>
          <strong>Foarte important:</strong>
        </p>
        <p>
          ArtStep fiind o platformă de promovare gratuită, în special a
          artiștilor plastici din România, nu are posibilitatea verificării
          veridicității informațiilor publicate de către terți / vânzători în
          secțiunile "Expoziție cu vânzare" și "Piața de vechi", ca atare nu ne
          asumăm responsabilitatea în ceea ce privește autenticitatea
          informațiilor publicate de către vânzători / terți.
        </p>
      </div>

      <div className="cum-recommendation">
        <p>
          <strong>Recomandarea noastră fermă:</strong>
        </p>
        <p>
          ArtStep vă recomandă insistent să folosiți doar plata prin ramburs și,
          chiar mai mult, să alegeți livrarea prin firme de curierat care permit
          verificarea coletului înainte de plata valorii ramburs.
        </p>
      </div>

      <h1 className="cum-title">Cum vând?</h1>
      <p className="cum-subtitle">Nimic mai simplu!</p>

      <h2 className="cum-section-title">
        <Link href={"/expozitie/artisti"}>
          SECȚIUNEA "EXPOZIȚIE CU VÂNZARE"
        </Link>
      </h2>
      <p style={{ marginBottom: "20px" }}>
        Dacă ești artist plastic, ArtStep îți oferă posibilitatea să-ți
        promovezi gratuit lucrările (de ex.: tablouri, sculpturi, modelaje,
        basoreliefuri, gravuri, etc) în secțiunea "Expoziție cu vânzare"
        (ATENȚIE: această secțiune este dedicată exclusiv artiștilor).
      </p>

      <ol className="cum-list">
        <li>
          Intră în secțiunea "Expoziție cu vânzare" făcând clic pe butonul
          Expoziție cu vânzare
        </li>
        <li>Clic pe butonul "Adăugare tablouri"</li>
        <li>
          Completează integral informațiile solicitate în formularul afișat
        </li>
        <li>Clic pe butonul "Trimite"</li>
      </ol>

      <p className="cum-recommendation">
        Și... gata. Așteaptă să te contacteze cumpărătorii dornici să negocieze.
        Îți dorim succes și negocieri cu folos!
      </p>

      <h2 className="cum-section-title">
        <Link href={"/piata"}>SECȚIUNEA "PIAȚA DE VECHI"</Link>
      </h2>
      <p style={{ marginBottom: "20px" }}>
        Dacă ești posesorul legitim al unui obiect de artă plastică, artizanat,
        anticariat, decorațiuni, obiecte vechi recondiționate sau
        nerecondiționate, etc. (de ex: tablouri, sculpturi, modelaje, cărți,
        mobilă veche, obiecte de cult, etc.), ArtStep îți oferă posibilitatea
        să-ți promovezi gratuit respectivele obiecte în vederea vânzării.
      </p>

      <ol className="cum-list">
        <li>
          Intră în secțiunea "Piața de vechi" făcând clic pe butonul Piața de
          vechi
        </li>
        <li>Clic pe butonul "Adăugare"</li>
        <li>
          Completează integral informațiile solicitate în formularul afișat
        </li>
        <li>Clic pe butonul "Trimite"</li>
      </ol>

      <p className="cum-recommendation">
        Și... gata. Așteaptă să te contacteze cumpărătorii dornici să negocieze.
        Îți dorim succes și negocieri cu folos!
      </p>
    </div>
  )
}
