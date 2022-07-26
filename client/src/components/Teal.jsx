const Teal = (props) => {

    return (
        
        <div className="preview">
            <h3 style={{ color: "#007655" }}>Sveiki, tėveliai,</h3>
            <p>Siunčiu Jums sąskaitą ir prašau apmokėti už (<span className="italic">mėnesis</span>) mėn. būrelį (<span className="italic">{props.data[0].activity_name}</span>). Dėkoju, kad suteikiate savo vaikui galimybę lankyti (<span className="italic">{props.data[0].activity_name}</span>).</p>
            <p>Bankas: (<span className="italic">{props.data[0].bank}</span>)</p>
            <p>Gavėjas: (<span className="italic">{props.data[0].recipient_name}</span>)</p>
            <p>Sąskaitos nr.: (<span className="italic">{props.data[0].account_no}</span>)</p>
            <p>Kaina: (<span className="italic">{props.data[0].price} Eur</span>)</p>
            <p>Mokėjimo paskirtyje nurodykite vaiko vardą ir už kurį mėnesį mokate.</p>
            <p>Pagarbiai,</p>
            <p>(<span className="italic">{props.data[0].activity_name}</span>) vadovas (<span className="italic">{props.data[0].teacher_name}</span>)</p>
            <p>Telefono nr.: (<span className="italic">{props.data[0].phone}</span>)</p>
        </div>
    );
}

export default Teal;