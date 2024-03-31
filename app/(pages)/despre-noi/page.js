import "@/app/(pages)/page-styles.css"
import Link from "next/link"

const DespreNoi = () => {
  return (
    <div className="despre-noi" style={{ marginTop: "100px" }}>
      <h1>DESPRE NOI</h1>
      <div>
        <p>
          ArtStep este un proiect privat generat de către personalitatea
          creatoare a artistei autodidacte Aurelia Stepan. Ca atare, bazându-ne
          pe apetitul de necontestat al artistei septuagenare Aurelia Stepan de
          a îmbina beneficiul „noului” al tehnologiei (online) cu „frumosul” în
          cazul acesta evidențiat de artele plastice, am dezvoltat acest proiect
          de promovare îndeosebi a artelor plastice.
        </p>
        <p>
          Chiar mai mult, secțiunea{" "}
          <Link href={"/pastila-de-ia"} className="underline-blue">
            „Pastila de IA”
          </Link>{" "}
          (pastila de inteligență artificială) își dorește să sublinieze
          apetitul și deschiderea artistei Aurelia Stepan către îmbinarea
          „noului” cu „frumosul”, apetit pe care-l considerăm o bună sursă de
          inspirație corectă pentru toți vizitatorii (tineri și mai puțini
          tineri) platformei ArtStep.
        </p>
        <p>
          Astfel, ArtStep este o platformă de promovare în special a artiștilor
          plastici amatori sau profesioniști, dar și a deținătorilor legitimi de
          obiecte de artă, artizanat, anticariat, decor, mobilă veche etc., care
          doresc să-și vândă creațiile / obiectele contra unei sume corect
          evaluate, respectiv negociate.
        </p>
        <p>
          Mai exact, ArtStep își asumă strict scopul de promovare descrisă mai
          sus, declinându-și total competența și responsabilitatea asupra
          tranzacțiilor ce rezultă din îndeplinirea scopului nostru, respectiv
          din promovarea artiștilor / lucrărilor / bunurilor postate pe
          platforma noastră.
        </p>
        <p>
          Precizăm că noi, echipa ArtStep, nu avem nici competența, nici
          intenția de a ne erija într-o entitate de evaluare critică a
          lucrărilor / bunurilor promovate, dar ne rezervăm dreptul de a refuza
          spre promovare acele lucrări / artiști / bunuri asupra cărora planează
          o suspiciune rezonabilă de lipsă a corectitudine / impostură. În acest
          sens, suntem în permanență deschiși și atenți tuturor sugestiilor
          venite din partea dvs.
        </p>
      </div>
      <h1 style={{ textAlign: "center" }}>Foarte important:</h1>
      <div>
        <p>
          ArtStep fiind o platformă de promovare gratuită în special a
          artiștilor plastici din România, nu are posibilitatea verificării
          veridicității informațiilor publicate de către terți / vânzători în
          secțiunile{" "}
          <Link href={"/expozitie/artisti"} className="underline-blue">
            „Expoziție cu vânzare”
          </Link>{" "}
          și{" "}
          <Link href={"/piata"} className="underline-blue">
            „Piața de vechi”
          </Link>{" "}
          , ca atare nu ne asumăm responsabilitatea în ceea ce privește
          autenticitatea informațiilor publicate de către vânzători / terți.
        </p>
        <p>
          <strong>Recomandarea noastră fermă:</strong> ArtStep vă recomandă
          insistent să folosiți doar plata prin ramburs și chiar mai mult, să
          alegeți livrarea prin firme de curierat care permit verificarea
          coletului înainte de plata valorii ramburs.
        </p>
        <p>
          Așteptăm sugestiile și recomandările dvs. la <b> telefon:</b>{" "}
          0774.686.879 sau prin <b>e-mail: </b>office@artstep.ro
        </p>
      </div>
    </div>
  )
}

export default DespreNoi
