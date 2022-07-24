const Teal = (props) => {


    return (
        <div className="preview">
            <h3 style={{ color: "#007655" }}>Sveiki, (<span className="italic">vaiko vardas</span>) tėveliai,</h3>
            <p>Siunčiu Jums sąskaitą ir prašau apmokėti už (<span className="italic">mėnesis</span>) mėn. būrelį (<span className="italic">būrelio pavadinimas</span>). Dėkoju, kad suteikiate savo vaikui galimybę lankyti (<span className="italic">būrelio pavadinimas</span>)</p>
            <p>Bankas: (<span className="italic">banko pavadinimas</span>)</p>
            <p>Gavėjas: (<span className="italic">gavėjo vardas</span>)</p>
            <p>Sąskaitos nr.: (<span className="italic">sąskaitos nr.</span>)</p>
            <p>Kaina: (<span className="italic">kaina</span>)</p>
            <p>Mokėjimo paskirtyje nurodykite vaiko vardą ir už kurį mėnesį mokate.</p>
            <p>Pagarbiai,</p>
            <p>(<span className="italic">būrelio pavadinimas</span>) vadovas (<span className="italic">vadovo vardas</span>)</p>
            <p>Telefono nr.: (<span className="italic">tel. nr.</span>)</p>
        </div>
    );
}

export default Teal;